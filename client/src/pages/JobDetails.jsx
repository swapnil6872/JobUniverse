import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { JOBS_API_END_POINT } from "../utils/Host";
import { APPLICANTS_API_END_POINT } from "../utils/Host";
const JobDescription = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/${id}`);
        setJob(res.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    if (id) fetchJob();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-medium">Loading job details...</p>
      </div>
    );
  }

  const {
    company = {},
    description = {},
    salary = {},
    location = [],
    employmentType,
    openings,
    applications = [],
  } = job;

  // Match current user ID (supports MongoDB _id and populated objects)
  const currentUserId = user?._id || user?.id;
  const userApplication = applications.find((app) => {
    if (!app || !currentUserId) return false;
    const applicantId =
      typeof app.applicant === "object"
        ? app.applicant?._id || app.applicant?.id
        : app.applicant;
    return String(applicantId) === String(currentUserId);
  });

  // Handle Resume Upload and Application
  const onApplyHandler = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume file before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("resume", resumeFile);

    try {
      setIsApplying(true);
      const res = await axios.post(
        `${APPLICANTS_API_END_POINT}/apply`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data.message || "Job applied successfully!");
      setShowUploadPopup(false);
      setResumeFile(null);

      // Instant UI Update (Optimistic update so button changes immediately)
      const newApplication = res.data.application || {
        _id: Date.now().toString(),
        applicant: currentUserId,
        status: "applied",
      };

      setJob((prevJob) => ({
        ...prevJob,
        applications: [...(prevJob?.applications || []), newApplication],
      }));
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response?.data?.message || "Failed to apply for this job.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200">

        {/* Header */}
        <div className="border-b border-gray-100 pb-5 mb-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <div className="flex items-center gap-3">
            {company.logo && (
              <img
                src={company.logo}
                alt={company.name || "Company Logo"}
                className="w-12 h-12 rounded-md object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-gray-700">{company.name}</p>
              <p className="text-sm text-gray-500">{company.location}</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-600">Location:</p>
            <p>{Array.isArray(location) ? location.join(", ") : location}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Salary:</p>
            <p>
              ₹{salary.min?.toLocaleString() || "0"} - ₹{salary.max?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Type:</p>
            <p>{employmentType}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Openings:</p>
            <p>{openings}</p>
          </div>
        </div>

        {/* Apply Button Section */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            disabled={Boolean(userApplication)}
            onClick={() => {
              if (userApplication) {
                alert(`You have already applied for this job. Status: ${userApplication.status}`);
              } else if (user) {
                setShowUploadPopup(true);
              } else {
                alert("Please log in to apply for this job.");
                navigate("/login");
              }
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition text-white ${userApplication
                ? "bg-emerald-600 cursor-not-allowed uppercase text-xs tracking-wider"
                : user
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-blue-600 opacity-60 cursor-not-allowed"
              }`}
          >
            {userApplication ? userApplication.status : "Apply Now"}
          </button>
        </div>

        {/* Job Description Sections */}
        <div className="space-y-6">
          {description.about && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">About the job</h2>
              <p className="text-gray-700 leading-relaxed">{description.about}</p>
            </section>
          )}

          {description.requirements && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h2>
              <p className="text-gray-700">{description.requirements}</p>
            </section>
          )}

          {description.whoApply && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Who can apply</h2>
              <p className="text-gray-700">{description.whoApply}</p>
            </section>
          )}

          {/* Skills */}
          {job.skills?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Perks */}
          {job.perks?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Perks</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {job.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Company Info */}
          {company.name && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                About {company.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">{company.about}</p>
              <p className="text-sm text-gray-500 mt-2">
                Established: {company.established || "N/A"} | Employees:{" "}
                {company.noOfEmployees || "N/A"}
              </p>
              {company.website && (
                <a
                  href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                >
                  Visit Website
                </a>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Resume Upload Modal */}
      {showUploadPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-50 transition">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Upload Your Resume
            </h2>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="border border-gray-300 p-2 w-full rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUploadPopup(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onApplyHandler}
                disabled={isApplying}
                className={`px-4 py-2 rounded-lg text-white font-semibold text-sm shadow ${isApplying
                    ? "bg-gray-400 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700 transition"
                  }`}
              >
                {isApplying ? "Applying..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;