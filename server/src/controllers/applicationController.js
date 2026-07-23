import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

export const applyJob = async (req, res) => {
  const { id } = req.body; // Job ID from form
  const applicantId = req.user?._id; // from auth middleware

  // 1️⃣ Check if the job exists
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  // 2️⃣ Check if the applicant already applied
  const alreadyApplied = await Application.findOne({
    job: id,
    applicant: applicantId,
  });

  if (alreadyApplied) {
    return res.status(400).json({
      success: false,
      message: "You have already applied for this job.",
    });
  }
   
  // 3️⃣ Get uploaded resume file from Cloudinary
  const resumeUrl = req.file?.path;
  if (!resumeUrl) {
    return res.status(400).json({
      success: false,
      message: "Resume file is required.",
    });
  }

  // 4️⃣ Create a new application
  const application = await Application.create({
    job: id,
    applicant: applicantId,
    resumeAtApply: resumeUrl, // Cloudinary URL
  });

   const totalApplicants = await Application.countDocuments({ job: id });

  // 5️⃣ Update Job document → push application & increment applicant count
  job.applications.push(application._id);
  job.applicantsCount = totalApplicants;
  await job.save();

  // 6️⃣ Send response
  res.status(201).json({
    success: true,
    message: "Job applied successfully.",
    application,
  });
};

export const getAppliedJobs = async (req, res) => {
  const applicantId = req.user?._id // from auth middleware

  const applications = await Application.find({ applicant: applicantId })
    .populate("job")
    .sort({ createdAt: -1 });

  if (!applications || applications.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No applications found",
    });
  }

  res.status(200).json({
    success: true,
    total: applications.length,
    applications,
  });
};

// for recruiters

// export const getApplicantsForJob = async (req, res) => {
//   const { jobId } = req.params;

//   // Check if job exists
//   const job = await Job.findById(jobId);
//   if (!job) {
//     return res.status(404).json({ success: false, message: "Job not found" });
//   }

//   // Get all applications for this job
//   const applications = await Application.find({ job: jobId })
//     .populate({
//       path: "applicant",
//       model: "User",
//       select: "name email phone profilePic",
//     })
//     .sort({ createdAt: -1 });

//   if (!applications.length) {
//     return res.status(404).json({ success: false, message: "No applicants found" });
//   }

//   res.status(200).json({
//     success: true,
//     total: applications.length,
//     applications,
//   });
// };

export const getApplicantsForJob = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Check if job exists
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // 2️⃣ Fetch applications and populate applicant details
    const applications = await Application.find({ job: id })
      .populate({
        path: "applicant",        // must match field name in your Application model
        select: "username email phone profile", // select only needed fields
        model: "User",            // specify model name as string (not variable)
      })
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "No applicants found for this job",
      });
    }

    // 3️⃣ Return the data
    res.status(200).json({
      success: true,
      total: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  // Only allow valid statuses
  const validStatuses = ["applied", "interview", "offered", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  const application = await Application.findById(applicationId);
  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  application.status = status;
  await application.save();

  res.status(200).json({
    success: true,
    message: `Application status updated to '${status}'`,
    application,
  });
};

export const getAllApplicants = async (req, res) => {
  const recruiterId = req.user?._id || "652f1a9c8a1b2e0012345678"; // from auth middleware

  // Find all jobs created by this recruiter
  const jobs = await Job.find({ recruiter: recruiterId }).select("_id");

  if (!jobs.length) {
    return res.status(404).json({ success: false, message: "No jobs posted by this recruiter" });
  }

  const jobIds = jobs.map(job => job._id);

  // Find all applications for those jobs
  const applications = await Application.find({ job: { $in: jobIds } })
    .populate({
      path: "applicant",
      model: User,
      select: "name email phone",
    })
    .populate({
      path: "job",
      model: Job,
      select: "title company location",
    })
    .sort({ createdAt: -1 });

  if (!applications.length) {
    return res.status(404).json({ success: false, message: "No applicants found" });
  }

  res.status(200).json({
    success: true,
    total: applications.length,
    applications,
  });
};

export const getDeleteApplication = async(req,res) =>{
  
}
   