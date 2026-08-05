import mongoose, { Types } from "mongoose";
import Job from "./jobModel.js"; 
const Schema = mongoose.Schema;
import { cloudinary } from "../config/cloudConfig.js";
import { getPublicIdFromUrl } from "../utils/getPublicIdFromUrl.js";


const applicationSchema = new Schema({
   job: {
       type: Schema.Types.ObjectId,
       ref: "Job",
       required: true
   },
   applicant: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
   },
    resumeAtApply: { 
        type: String, 
        required: true
     },
   status: {
       type: String,
       enum: ["applied", "interview", "offered", "rejected"],
       default: "applied"
   }
},{timestamps:true});

// Delete resume + remove application reference from Job
applicationSchema.pre("findOneAndDelete", async function (next) {
  try {
    const application = await this.model.findOne(this.getFilter());

    if (!application) return next();

    // Delete resume from Cloudinary
    if (application.resumeAtApply) {
      const publicId = getPublicIdFromUrl(application.resumeAtApply);

      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
          });

          await cloudinary.uploader.destroy(publicId, {
            resource_type: "raw",
          });
        } catch (err) {
          console.error("Cloudinary delete error:", err.message);
        }
      }
    }

    // Remove application from Job
    await Job.findByIdAndUpdate(application.job, {
      $pull: { applications: application._id },
      $inc: { applicantsCount: -1 },
    });

    next();
  } catch (err) {
    next(err);
  }
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
