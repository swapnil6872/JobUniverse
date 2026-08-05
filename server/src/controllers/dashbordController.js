import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";
import Company from "../models/companyModel.js";

export const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    // 1. Fetch companies
    const companies = await Company.find({ userId: recruiterId }).select("name");

    // 2. Fetch jobs
    const jobs = await Job.find({ recruiter: recruiterId })
      .populate("company", "name logo")
      .sort({ createdAt: -1 });

    const jobIds = jobs.map((job) => job._id);

    // 3. Fetch applications
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "username email profile")
      .populate("job", "title locationType opportunityType")
      .sort({ createdAt: -1 });

    // 4. Calculate metrics
    const stats = {
      activeJobs: jobs.length,
      totalApplicants: applications.length,
      pendingReviews: applications.filter((app) => app.status === "applied").length,
      interviewsScheduled: applications.filter((app) => app.status === "interview").length,
    };

    res.status(200).json({
      success: true,
      stats,
      jobs: jobs.slice(0, 5),
      applications: applications.slice(0, 5),
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};