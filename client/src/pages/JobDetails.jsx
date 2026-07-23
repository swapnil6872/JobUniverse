import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobDescription = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/jobs/${id}`);
        setJob(res.data.job);
        console.log("Fetched job:", res.data.job.applications);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  const { company, description, salary, location, employmentType, openings, applications } = job;

  // 🧩 Handle Resume File Upload & Apply
  const onApplyHandler = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume file before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id); // backend expects "id"
    formData.append("resume", resumeFile); // multer expects "resume"

    try {
      setIsApplying(true);
      const res = await axios.post(
        "http://localhost:8000/api/application/apply",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(res.data.message || "Job applied successfully!");
      setShowUploadPopup(false);
      setResumeFile(null);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.response?.data?.message || "Failed to apply for this job.");
    } finally {
      setIsApplying(false);
    }
  };
   const userApplication = job.applications.find(
   (app) => app.applicant.toString() === user?.id
   );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="border-b pb-5 mb-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <div className="flex items-center gap-3">
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 rounded-md object-cover"
            />
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
            <p>{location.join(", ")}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Salary:</p>
            <p>
              ₹{salary.min.toLocaleString()} - ₹{salary.max.toLocaleString()}
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

        {/* Apply Button */}

        <div className="flex justify-end mb-6 ">
          <button
            onClick={() => {
               
              if (userApplication) {
                alert(`You have already applied for this job. Status: ${userApplication.status}`);
                setShowUploadPopup(false);
              }
              else if (user ) {
                setShowUploadPopup(true);
                console.log(user.applications + "hellp ");
              }
               else {
                // navigate("/Login");
                alert("Please login to apply for this job.");
              }
            }}
            // className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition ${ user ? '' : 'opacity-50 cursor-not-allowed'}"
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition ${
              user ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {userApplication ? (
              <p>{userApplication.status}</p>
            ) : (
              <button>Apply Now</button>
            )}
            {/* Apply Now */}
          </button>
        </div>

        {/* Job Description Sections */}
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About the job
            </h2>
            <p className="text-gray-700 leading-relaxed">{description.about}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Requirements
            </h2>
            <p className="text-gray-700">{description.requirements}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Who can apply
            </h2>
            <p className="text-gray-700">{description.whoApply}</p>
          </section>

          {/* Skills */}
          {job.skills?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Skills Required
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 border text-gray-700 px-3 py-1 rounded-full text-sm"
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
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Perks
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Company Info */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About {company.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">{company.about}</p>
            <p className="text-sm text-gray-500 mt-2">
              Established: {company.established} | Employees:{" "}
              {company.noOfEmployees}
            </p>
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              Visit Website
            </a>
          </section>
        </div>
      </div>

      {/* 📂 Resume Upload Popup */}
      {showUploadPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 transition">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-96 border border-gray-200 transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Upload Your Resume
            </h2>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUploadPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={onApplyHandler}
                disabled={isApplying}
                className={`px-4 py-2 rounded-lg text-white font-semibold shadow ${
                  isApplying
                    ? "bg-gray-400"
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
