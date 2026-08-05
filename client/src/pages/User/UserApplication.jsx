import React, { useEffect } from "react";
import useApplication from "../../hooks/useApplicantion";
import {
  MapPin,
  Briefcase,
  Laptop,
  IndianRupee,
  Users,
  Calendar,
  FileText,
  ClipboardList,
} from "lucide-react";

function UserApplication() {
  const { appliedJobs, getAppliedJobs } = useApplication();

  useEffect(() => {
    getAppliedJobs();
  }, []);

  const badgeColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700";

      case "interview":
        return "bg-yellow-100 text-yellow-700";

      case "offered":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
        My Applications
      </h1>

      {appliedJobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 sm:p-10 text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center">
            <ClipboardList className="w-7 h-7 text-[#00A5EC]" />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            No Applications Yet
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Start applying to jobs to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {appliedJobs.map((application) => {
            const job = application.job;

            return (
              <div
                key={application._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-6"
              >
                {/* Title + status badge: stacks on small screens, side by side on larger ones */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">

                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {job.opportunityType}
                    </p>
                  </div>

                  <span
                    className={`self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${badgeColor(
                      application.status
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {application.status}
                  </span>
                </div>

                <div className="border-t border-gray-100 my-4 sm:my-5" />

                {/* Job details: 1 column on mobile, 2 columns from small screens up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                  <div className="flex items-start gap-2.5">
                    <Briefcase className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Employment</p>
                      <p className="font-medium text-sm sm:text-base break-words">
                        {job.employmentType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium text-sm sm:text-base break-words">
                        {job.location.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Work Mode</p>
                      <p className="font-medium text-sm sm:text-base">
                        {job.locationType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <IndianRupee className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Salary</p>
                      <p className="font-medium text-sm sm:text-base break-words">
                        ₹{job.salary.min.toLocaleString()} - ₹
                        {job.salary.max.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Openings</p>
                      <p className="font-medium text-sm sm:text-base">
                        {job.openings}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Applied On</p>
                      <p className="font-medium text-sm sm:text-base">
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs text-gray-500 mb-2">
                    Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {application.resumeAtApply && (
                  <div className="mt-6">
                    <a
                      href={application.resumeAtApply}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center bg-[#00A5EC] hover:bg-[#0089c6] text-white px-5 py-2 rounded-lg transition font-medium text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      View Submitted Resume
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserApplication;

