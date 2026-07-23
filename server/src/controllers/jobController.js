import Job from "../models/jobModel.js";

export const getAllJobs = async (req, res) => {

    let jobs = await Job.find({}).populate("company");

    console.log(jobs);
    return res.status(200).json({
        message: "Jobs retrieved successfully.",
        jobs,
        success: true
    });
};

export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id).populate("company").populate("applications");

    if (!job) {
        return res.status(404).json({
            message: "Job not found.",
            success: false
        });
    }
    return res.status(200).json({
        message: "Job retrieved successfully.",
         job,
        success: true
    });
};

export const createJob = async (req, res) => {
  const {
    title,
    opportunityType,
    openings,
    about,
    requirements,
    whoApply,
    skills,
    salaryMin,
    salaryMax,
    variableMin,
    variableMax,
    perks,
    startDate,
    endDate,
    location,
    locationType,
    employmentType,
    company,
    recruiter,
    applications,
  } = req.body;

  const job = await Job.create({
    title,
    opportunityType,
    openings,
    description: {
      about,
      requirements,
      whoApply,
    },
    skills,
    salary: {
      min: salaryMin,
      max: salaryMax,
    },
    variables: {
      min: variableMin,
      max: variableMax,
    },
    perks,
    startDate,
    endDate,
    location,
    locationType,
    employmentType,
    company,
    recruiter,
    applications
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully ✅",
    job,
  });
};


export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found ❌",
    });
  }

  const {
    title,
    opportunityType,
    openings,
    about,
    requirements,
    whoApply,
    skills,
    salaryMin,
    salaryMax,
    variableMin,
    variableMax,
    perks,
    startDate,
    endDate,
    location,
    locationType,
    employmentType,
    company,
    recruiter,
  } = req.body;

  job.title = title || job.title;
  job.opportunityType = opportunityType || job.opportunityType;
  job.openings = openings || job.openings;
  job.description = {
    about: about || job.description.about,
    requirements: requirements || job.description.requirements,
    whoApply: whoApply || job.description.whoApply,
  };
  job.skills = skills || job.skills;
  job.salary = {
    min: salaryMin || job.salary.min,
    max: salaryMax || job.salary.max,
  };
  job.variables = {
    min: variableMin || job.variables.min,
    max: variableMax || job.variables.max,
  };
  job.perks = perks || job.perks;
  job.startDate = startDate || job.startDate;
  job.endDate = endDate || job.endDate;
  job.location = location || job.location;
  job.locationType = locationType || job.locationType;
  job.employmentType = employmentType || job.employmentType;
  job.company = company || job.company;
  job.recruiter = recruiter || job.recruiter;

  await job.save();

  res.status(200).json({
    success: true,
    message: "Job updated successfully ✅",
    job,
  });
};


export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found ❌",
    });
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully 🗑️",
  });
};

export const getAdminJobs = async (req, res) => {
  console.log('hi')
  const adminId = req.id ;
  // || "652f1a9c8a1b2e0012345678"; // assuming set via auth middleware
  console.log(adminId)
  const jobs = await Job.find({ recruiter: adminId })
    .populate("company")
    .sort({ createdAt: -1 }).populate("user");

  if (!jobs || jobs.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No jobs found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Admins jobs retrieved successfully",
    jobs,
  });
};
