     <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm ">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#00A5EC]" /> Posted Openings
            </h2>
            {/* <Link to="/admin/jobs" className="text-xs font-semibold text-[#00A5EC] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link> */}
          </div>

          <div className="divide-y divide-gray-100 overflow-x-auto">
            {recentJobs.length > 0 ? (
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
                    <tr key={job._id} className="hover:bg-gray-50/60 transition">
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-xs text-gray-500">{job.company?.name || "Company"} • {job.locationType}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          job.opportunityType === 'Job' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                        }`}>
                          {job.opportunityType}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-700">
                        {job.applicantsCount || 0}
                      </td>
                      <td className="group relative px-5 py-4 text-right">
                        <Link 
                          to={`/admin/job/applications/${job._id}/`}
                          className=" text-[#00A5EC] hover:text-[#0080b8] font-medium text-xs border border-[#00A5EC] px-3 py-1 rounded-md  "
                        >
                          View Applicants
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No active jobs posted yet. Click "Post New Job" above to begin!
              </div>
            )}
          </div>
        </div>