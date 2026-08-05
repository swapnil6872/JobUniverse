import User from "../models/userModel.js";
import passport from "passport";
import { cloudinary } from "../config/cloudConfig.js";
import { getPublicIdFromUrl } from "../utils/getPublicIdFromUrl.js";

export const registerUser= async (req, res, next) => {
  try {
    const { username, email, password ,role} = req.body;
    // console.log(username,email,password,role);

    if (!username || !email || !password || !role) {
      return res.status(400).json({success:false, message: "All fields are required" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" ,success: false});
    }

    // create new user
    const newUser = new User({ username, email , role });
    console.log(newUser,"before hash");
    // register with passport-local-mongoose
    User.register(newUser, password, (err, registeredUser) => {
      if (err) {
        return next(err); // handled by wrapAsync / error middleware
      }
      
      

      // log in immediately
      req.login(registeredUser, (err) => {
        if (err) return next(err);

        return res.status(201).json({
          success: true,
          message: "User registered successfully",
          user: {
            id: registeredUser._id,
            username: registeredUser.username,
            email: registeredUser.email,
            role: registeredUser.role,
          },
        });
      });
    });
    
  } catch (error) {
    next(error);
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: info?.message || "Invalid email or password",
      });
    }

    // ✅ Role check
    if (req.body.role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with this role",
      });
    }

    // ✅ Login session
    req.login(user, (err) => {
      if (err) return next(err);
        console.log("✅ Logged in User Session:", req.session);
                    console.log("✅ Saved User:", req.user);
      return res.status(200).json({
        success: true,
        message: `Welcome back ${user.username}`,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
  })(req, res, next); 
};

export const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  });
};

export const getUserProfile = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { username, bio, skill, designation } = req.body;

  const newProfilePic = req.files?.profilePicture?.[0]?.path;
  const newResume = req.files?.resume?.[0]?.path;

  // Update profile picture
  if (newProfilePic) {
    if (
      user.profile.profilePicture &&
      !user.profile.profilePicture.includes("gravatar.com")
    ) {
      const publicId = user.profile.profilePicture
        .split("/upload/")[1]
        ?.replace(/^v\d+\//, "")
        ?.replace(/\.[^/.]+$/, "");

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    user.profile.profilePicture = newProfilePic;
  }

  // Update resume (stored as image)
  if (newResume) {
    if (user.profile.resume) {
      const publicId = user.profile.resume
        .split("/upload/")[1]
        ?.replace(/^v\d+\//, "")
        ?.replace(/\.[^/.]+$/, "");

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    user.profile.resume = newResume;
  }

  // Update text fields
  if (username !== undefined) user.username = username;
  if (bio !== undefined) user.profile.bio = bio;
  if (designation !== undefined) user.profile.designation = designation;

  if (skill !== undefined) {
    user.profile.skill = Array.isArray(skill)
      ? skill
      : skill.split(",").map((item) => item.trim()).filter(Boolean);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

export const deleteUser = async (req, res) => {
  console.log("🔴 Delete User called for user ID:", req.user._id);
  const user = await User.findByIdAndDelete(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    });
  });
};


export const changePassword = async (req, res) => {
  console.log("🔑 Change Password called:");
  const { currentPassword, newPassword, confirmPassword } = req.body;
  console.log("Current Password:", currentPassword);
  

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match.",
    });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: "New password cannot be the same as the current password.",
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  try {
    await user.changePassword(currentPassword, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect.",
    });
  }
};

export const updateEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  // Check if email is already in use
  const existingUser = await User.findOne({ email });

  if (
    existingUser &&
    existingUser._id.toString() !== req.user._id.toString()
  ) {
    return res.status(409).json({
      success: false,
      message: "Email already exists.",
    });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  user.email = email;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Email updated successfully.",
    user,
  });
};