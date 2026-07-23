import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApplication from "../../hooks/useApplicantion";

function JobApplication() {
  // useParams() // ✅ jobId from URL like /recruiter/job/:jobId/applications
  const { id } = useParams();
  console.log("Job ID from URL:", id);
  const { applicantsForJob, getApplicantsForJob } = useApplication();

  useEffect(() => {
    if (id) getApplicantsForJob(id);
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Applicants for Job</h1>

      {!applicantsForJob.length ? (
        <p className="text-gray-500">No applicants found for this job.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applicantsForJob.map((app) => (
            <div
              key={app._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                {app?.applicant?.profile?.profilePicture ? (
                  <img
                    src={app.applicant.profile.profilePicture}
                    alt={app.applicant.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                    {app?.applicant?.username
                      ? app.applicant.username[0].toUpperCase()
                      : "?"}
                  </div>
                )}

                <div>
                  <h2 className="font-semibold">{app.applicant.username}</h2>
                  <p className="text-sm text-gray-500">{app.applicant.email}</p>
                </div>
              </div>

              {/* <p className="text-sm mb-1">
                📞 <span className="font-medium">{app.applicant.phone}</span>
              </p> */}
              <p className="text-sm mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize">{app.status}</span>
              </p>
              <p className="text-xs text-gray-400">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplication;
