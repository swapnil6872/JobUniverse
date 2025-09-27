import User from "../models/userModel.js";
import passport from "passport";

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
