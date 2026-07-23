import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

const JobPost = () => {
  useGetAllAdminJobs(); // fetch jobs on mount
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((state) => state.job);
   const user = useSelector((state) => state.auth.user);

   allAdminJobs.forEach((job)=>{
    console.log(job.recruiter);
   })

   

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen mt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Job Postings
        </h1>
        <Link
          to="/admin/jobs/new"
          className="mt-4 md:mt-0 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Post a Job / Internship
        </Link>
      </div>

      {/* Job List */}
      {allAdminJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAdminJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-xl transition"
            >
              {/* Job Title & Company */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-500 mt-1">
                  {job.company?.name || "Unknown Company"} | {job.opportunityType}
                </p>
              </div>

              {/* Job Details */}
              <div className="mt-4 space-y-2 text-gray-600 text-sm">
                <p>
                  <strong>Location:</strong> {job.location.join(", ")}
                </p>
                <p>
                  <strong>Employment:</strong> {job.employmentType}
                </p>
                <p>
                  <strong>Salary:</strong> ₹{job.salary.min} - ₹{job.salary.max} / yr
                </p>
                <p>
                  <strong>Applicants:</strong> {job.applicantsCount || 0}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between">
                <Link
                  to={`/admin/jobs/edit/${job._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>

                <button
                  onClick={() => navigate(`/admin/job/applications/${job._id}`)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition text-sm"
                >
                  View Applicants 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPost;
