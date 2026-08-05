import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import TestimonialSection from "../components/TestimonialSection";
import faqs from "../utils/faq";
import { JOBS_API_END_POINT } from "../utils/Host";

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [selectedAccordion, setSelectedAccordion] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);


  const accordionData = [
    {
      title: "Part Time Jobs by Profile",
      content: ["Graphic Design Jobs", "Sales Jobs", "Marketing Jobs", "Content Writing Jobs"],
    },
    {
      title: "Part Time Jobs by Location",
      content: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    },
    {
      title: "Top Hiring Companies",
      content: ["TCS", "Infosys", "Wipro", "Zomato", "OYO"],
    },
  ];

  const toggleFAQ = (index) => setSelectedFAQ(selectedFAQ === index ? null : index);
  const toggleAccordion = (index) => setSelectedAccordion(selectedAccordion === index ? null : index);

  // Fetch initial jobs on mount
  const fetchInitialJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${JOBS_API_END_POINT}`);
      const jobData = res.data.jobs || [];
      // setJobs(jobData.slice(0, 14));
      setJobs(jobData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialJobs();
  }, []);

  // Apply filters via API
  const handleApply = async (params) => {
    setLoading(true);
    try {
      const res = await axios.get(`${JOBS_API_END_POINT}/filter`, { params });
      setJobs(res.data.data || []);
    } catch (error) {
      console.error("Error filtering jobs:", error);
    } finally {
      setLoading(false);
      setShowMobileFilters(false);
    }
  };

  // Reset back to initial state
  const handleReset = () => {
    fetchInitialJobs();
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Mobile Filter Toggle Banner */}
        <div className="lg:hidden flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Filter Listings</h3>
            <p className="text-xs text-gray-500">Narrow down by salary, role, or location</p>
          </div>
          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Filters Sidebar */}
          <div
            className={`${showMobileFilters ? "block" : "hidden"
              } lg:block w-full lg:w-80 shrink-0 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs lg:sticky lg:top-6`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Search Filters
              </h2>
            </div>
            <Filter onApply={handleApply} onReset={handleReset} />
          </div>

          {/* Job Listings Column */}
          <div className="flex-1 min-w-0 w-full space-y-6">

            {/* Header / Counter */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Available Job Openings
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Showing active openings matching your target requirements.
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 self-start sm:self-auto shrink-0">
                {jobs.length} Results Found
              </span>
            </div>

            {/* Skeleton Loaders */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white border border-gray-200/80 rounded-2xl p-6 animate-pulse space-y-4">
                    <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
                    <div className="h-4 bg-gray-100 rounded-md w-1/4"></div>
                    <div className="h-4 bg-gray-100 rounded-md w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No matching jobs</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filter settings or resetting search parameters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="group bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                  >
                    <div className="space-y-2.5 min-w-0 flex-1">
                      {/* Job Title & Company */}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 mt-0.5">
                          {job.company?.name || "Company Confidential"}
                        </p>
                      </div>

                      {/* Badges / Metadata Stack */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-1">
                        <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md text-gray-700 font-medium">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {Array.isArray(job.location) ? job.location.join(", ") : job.location || "Remote"}
                        </span>

                        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md text-emerald-700 font-semibold">
                          ₹{job.salary?.min ? job.salary.min : "0"} - {job.salary?.max ? job.salary.max : "N/A"} LPA
                        </span>

                        <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md text-indigo-700 font-medium capitalize">
                          {job.employmentType || "Full-time"}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="shrink-0 pt-2 sm:pt-0">
                      <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 group-hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition-colors shadow-xs">
                        View Details
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* End of results indicator */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 text-center">
              <p className="text-xs sm:text-sm font-medium text-indigo-900">
                You've reached the end of the current listings. Check back daily for new openings!
              </p>
            </div>

            {/* Categorized Directory Accordion */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Explore Jobs by Category
              </h2>

              <div className="divide-y divide-gray-100">
                {accordionData.map((item, index) => (
                  <div key={index} className="py-3.5">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex justify-between items-center w-full text-left font-semibold text-sm text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${selectedAccordion === index ? "rotate-180" : ""
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {selectedAccordion === index && (
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {item.content.map((c, i) => (
                          <span
                            key={i}
                            className="text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-100 transition-colors truncate"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8">
          <div className="pb-4 mb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Find answers to common questions about finding and applying for roles.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-start w-full text-left font-semibold text-sm sm:text-base text-gray-800 hover:text-indigo-600 transition-colors gap-4 cursor-pointer"
                >
                  <span className="flex-1">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${selectedFAQ === index ? "rotate-180 text-indigo-600" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {selectedFAQ === index && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed bg-gray-50/60 p-3.5 rounded-xl border border-gray-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* section2 */}
        <section className="bg-[#f8f9fa] py-10 px-4 sm:px-6 lg:px-8 w-full flex justify-center">
          <div className="max-w-4xl w-full text-center">

            {/* Main Banner Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Discover <span className="text-[#337ab7]">75K+ Latest Jobs</span> for{" "}
              <span className="text-[#337ab7]">250+ Profiles & Locations</span>
            </h1>

            {/* Content Box */}
            <div className="mt-8 text-left space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                Find the Latest Jobs (नौकरी) in India
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Employment helps to enhance our lifestyle. Finding employment enables an
                individual to lead the life they desire. However, getting the right
                opportunity may seem challenging. From looking for job vacancies to
                applying, to getting a call for an interview, and then finally clearing all job
                interview rounds, requires a great deal of preparation. This journey can be a
                highly rewarding experience when an individual successfully finds a job.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                India is booming with opportunities for individuals who are just starting out
                in their careers, as well as seasoned professionals and students. Each job
                vacancy presents a unique opportunity to work in a dynamic environment and
                enhance your skill set. You can explore perfect or new job opportunities that
                offer the flexibility to work from home, work part-time, or work full-time,
                based on your preference and comfort level.
              </p>

              {/* Expandable Content */}
              <div
                className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-12 opacity-60"
                  }`}
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2">
                  Scope of Jobs in India
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  As per recent labor studies, India's employment rate is steadily increasing
                  across various sectors. Job seekers can expect to find opportunities in IT,
                  Finance, Marketing, Healthcare, E-commerce, and Education sectors.
                  Whether you are looking for entry-level positions or executive roles,
                  there is a continuous demand for skilled talent across top metropolitan
                  cities as well as emerging Tier-2 hubs.
                </p>

                {/* Gradient Overlay for Fade Out Effect when collapsed */}
                {!isExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#f8f9fa] to-transparent pointer-events-none" />
                )}
              </div>

              {/* See More Toggle Button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A5EC] hover:text-[#008cc8] transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? "See Less" : "See More"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                      }`}
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
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* TestimonialSection */}
        <TestimonialSection />
      </div>
    </div>
  );
};

export default JobListingPage;