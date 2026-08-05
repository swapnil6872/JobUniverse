import Job from "../models/jobModel.js";

import Application from "../models/applicationModel.js";
import { cloudinary } from "../config/cloudConfig.js";
import { getPublicIdFromUrl } from "../utils/getPublicIdFromUrl.js";


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
    // recruiter,
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
    recruiter:req.user._id,
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

  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
};

export const getAdminJobs = async (req, res) => {
  const adminId = req.user._id;

  const jobs = await Job.find({ recruiter: adminId })
    .populate("company")
    .populate("recruiter", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: jobs.length ? "Admin jobs retrieved successfully" : "No jobs found",
    jobs,
  });
};

// filterjob 
export const filterJobs = async (req, res) => {
  try {
    const {
      search,
      opportunityType,
      employmentType,
      locationType,
      location,
      skills,
      company,
      recruiter,
      minSalary,
      maxSalary,
      minOpenings,
      startDateFrom,
      startDateTo,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Text search on title (case-insensitive)
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // Enum filters — support comma-separated multi-values
    if (opportunityType) {
      filter.opportunityType = { $in: opportunityType.split(",") };
    }

    if (employmentType) {
      filter.employmentType = { $in: employmentType.split(",") };
    }

    if (locationType) {
      filter.locationType = { $in: locationType.split(",") };
    }

    // location is an array field, match any overlap
    if (location) {
      const locations = location.split(",").map((l) => l.trim());
      filter.location = { $in: locations };
    }

    // skills is an array field, match any overlap (case-insensitive)
    if (skills) {
      const skillList = skills.split(",").map((s) => s.trim());
      filter.skills = {
        $in: skillList.map((s) => new RegExp(`^${s}$`, "i")),
      };
    }

    // ObjectId filters
    if (company && mongoose.Types.ObjectId.isValid(company)) {
      filter.company = company;
    }

    if (recruiter && mongoose.Types.ObjectId.isValid(recruiter)) {
      filter.recruiter = recruiter;
    }

    // Salary range overlap logic:
    // job matches if job.salary.max >= minSalary AND job.salary.min <= maxSalary
    if (minSalary) {
      filter["salary.max"] = { ...filter["salary.max"], $gte: Number(minSalary) };
    }
    if (maxSalary) {
      filter["salary.min"] = { ...filter["salary.min"], $lte: Number(maxSalary) };
    }

    // Minimum openings
    if (minOpenings) {
      filter.openings = { $gte: Number(minOpenings) };
    }

    // Date range on startDate (Mixed type — assumes stored as valid dates/strings)
    if (startDateFrom || startDateTo) {
      filter.startDate = {};
      if (startDateFrom) filter.startDate.$gte = new Date(startDateFrom);
      if (startDateTo) filter.startDate.$lte = new Date(startDateTo);
    }

    // Pagination
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.max(Number(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const [jobs, totalCount] = await Promise.all([
      Job.find(filter)
        .populate("company", "name logo") // adjust fields as needed
        .populate("recruiter", "name email")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
      Job.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      data: jobs,
    });
  } catch (error) {
    console.error("Error filtering jobs:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while filtering jobs.",
      error: error.message,
    });
  }
};

