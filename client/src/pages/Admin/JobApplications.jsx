import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApplication from "../../hooks/useApplicantion";
import { toast } from "react-hot-toast";

function JobApplication() {
  const { id } = useParams();
  const {
    applicantsForJob = [],
    getApplicantsForJob,
    updateApplicationStatus,
    deleteApplication,
  } = useApplication();

  const [loadingStatusId, setLoadingStatusId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (id) {
      getApplicantsForJob(id);
    }
  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {
      setLoadingStatusId(applicationId);
      await updateApplicationStatus(applicationId, status);
    } catch (err) {
      // alert(err.response?.data?.message || "Something went wrong updating status");
      toast.error(err.response?.data?.message || "Something went wrong updating status");
    } finally {
      setLoadingStatusId(null);
    }
  };

  const handleDelete = async (applicationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application? This action cannot be undone."
    );

    if (!confirmDelete) return;
    
    try {
      setDeletingId(applicationId);
      await deleteApplication(applicationId); // Redux updates UI instantly now!
      toast.success("Application deleted successfully!");
    } catch (err) {
      // alert(err.response?.data?.message || "Failed to delete application");
      toast.error(err.response?.data?.message || "Failed to delete application");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "interview":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "offered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Job Applicants
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and update the candidate pipeline for this position.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
          Total Candidates: {applicantsForJob.length}
        </div>
      </div>

      {applicantsForJob.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No applicants yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later when candidates start applying.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicantsForJob.map((app) => (
            <div
              key={app._id}
              className={`bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                deletingId === app._id ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div>
                {/* Top Profile Info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {app?.applicant?.profile?.profilePicture ? (
                      <img
                        src={app.applicant.profile.profilePicture}
                        alt={app.applicant.username}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg ring-2 ring-indigo-50/50">
                        {app?.applicant?.username?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h2 className="font-semibold text-gray-900 leading-snug">
                        {app?.applicant?.username}
                      </h2>
                      <p className="text-xs text-gray-500 truncate max-w-[180px]">
                        {app?.applicant?.email}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(app._id)}
                    disabled={deletingId === app._id}
                    title="Delete Application"
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Applied Date */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Applied on</span>
                  <span className="font-medium text-gray-700">
                    {new Date(app.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Status Changer Section */}
                <div className="mt-4 flex items-center justify-between bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </span>

                  <div className="relative">
                    <select
                      value={app.status}
                      disabled={
                        loadingStatusId === app._id || deletingId === app._id
                      }
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border appearance-none pr-8 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors ${getStatusBadgeStyle(
                        app.status
                      )} ${
                        loadingStatusId === app._id ? "opacity-50 cursor-wait" : ""
                      }`}
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-60">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer / Resume link */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                {app.resumeAtApply ? (
                  <a
                    href={app.resumeAtApply}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Resume
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No resume attached
                  </span>
                )}

                {loadingStatusId === app._id && (
                  <span className="text-xs text-indigo-600 animate-pulse">
                    Updating status...
                  </span>
                )}
                {deletingId === app._id && (
                  <span className="text-xs text-rose-600 animate-pulse">
                    Deleting...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplication;