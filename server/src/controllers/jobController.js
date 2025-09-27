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
    const job = await Job.findById(id).populate("company");

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
