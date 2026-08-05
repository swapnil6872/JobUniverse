import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../../utils/Host";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Users, 
  Clock, 
  CheckCircle, 
  Plus, 
  Building, 
  ExternalLink,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import axios from "axios";



function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  // State management for metrics and records
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    pendingReviews: 0,
    interviewsScheduled: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COMPANY_API_END_POINT}/dashbord`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setStats(response.data.stats);
          setRecentJobs(response.data.jobs);
          setRecentApplications(response.data.applications);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A5EC]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-[#00A5EC]">{user?.username || "Recruiter"}</span> 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here is what's happening across your job postings today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/company"
            className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm"
          >
            <Building className="w-4 h-4 text-gray-500" />
            Companies
          </Link>
          <Link
            to="/admin/job"
            className="flex items-center gap-2 bg-[#00A5EC] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0090d4] transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Jobs</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeJobs}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-[#00A5EC]">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Applicants</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalApplicants}</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Reviews</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingReviews}</h3>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">In Interview Stage</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.interviewsScheduled}</h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Main Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Jobs Posted (2/3 width on desktop) */}
   
    
      {/* new  */}

      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
  <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center">
    <h2 className="font-semibold text-gray-900 text-base sm:text-lg flex items-center gap-2">
      <Briefcase className="w-5 h-5 text-[#00A5EC]" />
      Posted Openings
    </h2>
  </div>

  {recentJobs.length > 0 ? (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-5 py-3">Role & Company</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Applicants</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {recentJobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">
                    {job.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {job.company?.name || "Company"} • {job.locationType}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      job.opportunityType === "Job"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-purple-50 text-purple-700"
                    }`}
                  >
                    {job.opportunityType}
                  </span>
                </td>

                <td className="px-5 py-4 font-semibold text-gray-700">
                  {job.applicantsCount || 0}
                </td>

                <td className="px-5 py-4 text-right">
                  <Link
                    to={`/admin/job/applications/${job._id}`}
                    className="inline-flex items-center text-[#00A5EC] hover:text-[#0080b8] text-xs font-medium border border-[#00A5EC] px-3 py-1 rounded-md"
                  >
                    View Applicants
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {recentJobs.map((job) => (
          <div key={job._id} className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                {job.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {job.company?.name || "Company"} • {job.locationType}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  job.opportunityType === "Job"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-purple-50 text-purple-700"
                }`}
              >
                {job.opportunityType}
              </span>

              <span className="text-sm font-semibold text-gray-700">
                {job.applicantsCount || 0} Applicants
              </span>
            </div>

            <Link
              to={`/admin/job/applications/${job._id}`}
              className="block w-full text-center bg-[#00A5EC] text-white text-sm font-medium py-2 rounded-lg hover:bg-[#0080b8] transition"
            >
              View Applicants
            </Link>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="p-6 sm:p-8 text-center text-sm text-gray-500">
      No active jobs posted yet. Click "Post New Job" above to begin!
    </div>
  )}
</div>

      {/* new */}
        

        {/* Right Column: Recent Applications (1/3 width on desktop) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" /> Recent Applicants
            </h2>
          </div>

          <div className="p-4 space-y-4">
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <div key={app._id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{app.applicant?.username || "Candidate"}</h4>
                      <p className="text-xs text-gray-500">{app.job?.title}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize ${
                      app.status === 'applied' ? 'bg-amber-100 text-amber-800' :
                      app.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'offered' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                    {app.resumeAtApply && (
                      <a 
                        href={app.resumeAtApply} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs text-[#00A5EC] hover:underline flex items-center gap-1 font-medium"
                      >
                        Resume <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">
                No new applications received yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;