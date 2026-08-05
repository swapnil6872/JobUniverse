import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;
import Application from "./applicationModel.js"; // <-- Import Application model
import {cloudinary} from "../config/cloudConfig.js"; // <-- Import Cloudinary config
import { getPublicIdFromUrl } from "../utils/getPublicIdFromUrl.js";

const JobSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    opportunityType: {
      type: String,
      enum: ["Job", "Internship"],
      required: true,
    },
    openings:{
        type: Number,
        required: true
    },
    description:{
        about: {
            type: String,
            required: true
        },
        requirements: {
            type: String,
            required: true
        },
        whoApply:{
            type: String,
            required: true
        }
    },
    skills: [{
        type: String,
        required: true
    }],
    salary:{
        min:{
            type: Number,
            required: true
        },
        max:{
            type: Number,
            required: true
        }
    },
     variables: {
      min: { type: Number }, 
      max: { type: Number }
    },
    perks: [{
        type: String,
        required: true
    }],
    // Meta
    startDate:{
        type: Schema.Types.Mixed,
        required: true
    },
    endDate:{
        type: Schema.Types.Mixed,
        required: true
    },
    location:[{
        type: String,
        required: true
    }],
    locationType: {
      type: String,
      enum: ["Remote", "In-office", "Hybrid"],
      required: true,
    },
    applicantsCount: { 
        type: Number, 
        default: 0 
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time"],
      required: true,
    },
    company:{
       type: Schema.Types.ObjectId,
       ref: "Company",
       required: true
    },
     recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    applications: [
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });

JobSchema.pre("findOneAndDelete", async function (next) {
  try {
    // Get the job being deleted
    const job = await this.model.findOne(this.getFilter());

    if (!job) return next();

    // Get all applications for this job
    const applications = await Application.find({ job: job._id });

    // Delete resumes from Cloudinary
    // for (const application of applications) {
    //   if (application.resumeAtApply) {
    //     try {
    //       const publicId = getPublicIdFromUrl(application.resumeAtApply);

    //       if (publicId) {
    //         await cloudinary.uploader.destroy(publicId, {
    //           resource_type: "raw", // PDFs/DOCX/
    //         });
    //       }
    //     } catch (err) {
    //       console.error(
    //         `Failed to delete resume for application ${application._id}:`,
    //         err.message
    //       );
    //     }
    //   }
    // }
    // Delete resumes from Cloudinary
for (const application of applications) {
  if (application.resumeAtApply) {
    try {
      const publicId = getPublicIdFromUrl(application.resumeAtApply);

      if (publicId) {
        // Try deleting as an image (jpg, png, webp, gif, etc.)
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });

        // Try deleting as a raw file (pdf, doc, docx, zip, etc.)
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
      }
    } catch (err) {
      console.error(
        `Failed to delete resume for application ${application._id}:`,
        err.message
      );
    }
  }
}

    // Delete all applications
    await Application.deleteMany({ job: job._id });

    next();
  } catch (err) {
    next(err);
  }
});

const Job = mongoose.model("Job", JobSchema);

export default Job;
