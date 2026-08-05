import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

import { cloudinary } from "../config/cloudConfig.js";
import  {getPublicIdFromUrl} from "../utils/getPublicIdFromUrl.js";
import Job from "./jobModel.js";
import User from "./userModel.js";
import Application from "./applicationModel.js";


const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/03/17/17/36/database-4941302_1280.png',
    },
    website: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    industry:{
        type: [String],
        required: true
    },
    about:{
        type: String,
        required: true
    },
    noOfEmployees:{
        type: Number,
        required: true
    },
    established: {
        type: String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

//  Mongoose Post-Delete Hook for Company
CompanySchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  try {
    // 1. Delete Company Logo from Cloudinary (Ignore default image)
    const defaultLogo = 'https://cdn.pixabay.com/photo/2020/03/17/17/36/database-4941302_1280.png';
    if (doc.logo && doc.logo !== defaultLogo) {
      const logoPublicId = getPublicIdFromUrl(doc.logo);
      if (logoPublicId) {
        await cloudinary.uploader.destroy(logoPublicId);
        console.log(`🗑️ Cloudinary logo deleted: ${logoPublicId}`);
      }
    }

    // 2. Find all Jobs belonging to this Company
    const companyJobs = await Job.find({ company: doc._id });
    const jobIds = companyJobs.map((job) => job._id);

    if (jobIds.length > 0) {
        // =======================================================
// CHANGE #1: Fetch all applications first
// =======================================================
const applications = await Application.find({
  job: { $in: jobIds }
});

// =======================================================
// CHANGE #2: Delete resume from Cloudinary
// =======================================================
for (const application of applications) {
  if (application.resumeAtApply) {
    const resumePublicId = getPublicIdFromUrl(application.resumeAtApply);

    if (resumePublicId) {
      await cloudinary.uploader.destroy(resumePublicId);
      console.log(`🗑️ Resume deleted from Cloudinary: ${resumePublicId}`);
    }
  }
}
      // 3. Delete all Applications associated with these Jobs
      const deletedApps = await Application.deleteMany({ job: { $in: jobIds } });
      console.log(`🗑️ Deleted ${deletedApps.deletedCount} applications linked to company jobs.`);

      // 4. Delete all Jobs belonging to this Company
      const deletedJobs = await Job.deleteMany({ company: doc._id });
      console.log(`🗑️ Deleted ${deletedJobs.deletedCount} jobs linked to company.`);
    }
    await User.updateOne(
  { _id: doc.userId },
  {
    $pull: {
      "profile.company": doc._id,
    },
  }
);
  } catch (error) {
    console.error("Error in company post-delete hook:", error);
  }
});

const Company = mongoose.model("Company", CompanySchema);

export default Company;
