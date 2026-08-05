import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose'
import Company from "./companyModel.js";
import Application from "./applicationModel.js";
import { cloudinary } from "../config/cloudConfig.js";
import { getPublicIdFromUrl } from "../utils/getPublicIdFromUrl.js";


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "recruiter"],
        required: true
    },
    profile:{
        bio:{
            type: String,
        },
        skill:[{
            type: String,
        }],
        resume:{
            type: String,
        },
        profilePicture:{
            type: String,
            default: "https://www.gravatar.com/avatar/"
        },
        designation:{
            type: String,
        },
        company:[{
            type: Schema.Types.ObjectId,
            ref: "Company",
        }]
    }
},{timestamps:true});


userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const user = await this.model.findOne(this.getFilter());

    if (!user) return next();

    // ----------------------------------------------------
    // Delete Profile Picture
    // ----------------------------------------------------
    const defaultProfile =
      "https://www.gravatar.com/avatar/";

    if (
      user.profile?.profilePicture &&
      user.profile.profilePicture !== defaultProfile
    ) {
      const publicId = getPublicIdFromUrl(user.profile.profilePicture);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }
    }

    // ----------------------------------------------------
    // Delete Resume (if uploaded)
    // ----------------------------------------------------
    if (user.profile?.resume) {
      const publicId = getPublicIdFromUrl(user.profile.resume);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });

        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
      }
    }

    // ----------------------------------------------------
    // Normal User
    // ----------------------------------------------------
    if (user.role === "user") {
      const applications = await Application.find({
        applicant: user._id,
      });

      for (const application of applications) {
        await Application.findByIdAndDelete(application._id);
      }
    }

    // ----------------------------------------------------
    // Recruiter
    // ----------------------------------------------------
    if (user.role === "recruiter") {
      const companies = await Company.find({
        userId: user._id,
      });

      for (const company of companies) {
        await Company.findByIdAndDelete(company._id);
      }
    }

    next();
  } catch (err) {
    next(err);
  }
});

userSchema.plugin(passportLocalMongoose,{ usernameField: "email" });

const User = mongoose.model("User", userSchema);

export default User;
