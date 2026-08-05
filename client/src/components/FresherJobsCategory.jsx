import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOBS_API_END_POINT } from "../utils/Host";

const categories = [
  { label: "Big brands", params: {} },
  { label: "Work from home", params: { locationType: "work-from-home" } },
  { label: "Part-time", params: { opportunityType: "part-time" } },
  // { label: "MBA", params: { search: "MBA" } },
  // { label: "Engineering", params: { search: "Engineering" } },
  { label: "Internship", params: { search: "internship" } },
  { label: "Design", params: { skills: "Design" } },
  { label: "Data Science", params: { skills: "Data Science" } },
];

const FresherJobsCategory = () => {
  const [activeCategory, setActiveCategory] = useState("Big brands");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  // Fetch jobs based on selected filter pill
  const fetchJobs = async (categoryParams) => {
    setLoading(true);
    try {
      // Calls your filterJobs backend endpoint
      const res = await axios.get(`${JOBS_API_END_POINT}/filter`, {
        params: categoryParams,
      });
      setJobs(res.data.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      // Fallback: fetch all jobs if filter returns error
      try {
        const fallbackRes = await axios.get(`${JOBS_API_END_POINT}`);
        setJobs(fallbackRes.data.jobs || []);
      } catch (err) {
        console.error("Fallback error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs({});
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.label);
    fetchJobs(category.params);
  };

  // Carousel Scroll Handling
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const totalScroll = scrollWidth - clientWidth;
      const progress = totalScroll > 0 ? (scrollLeft / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#eff6ff] py-12 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Headings */}
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            What are you looking for today?
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 pt-2">
            Fresher Jobs
          </h3>
        </div>

        {/* Filter Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.label
                  ? "bg-[#008bdc] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel / Cards List */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-5 overflow-x-hidden py-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-[280px] sm:w-[300px] h-[220px] bg-white rounded-2xl p-5 shrink-0 animate-pulse border border-gray-100"
                >
                  <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-6"></div>
                  <div className="h-4 bg-gray-100 rounded-md w-2/3"></div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-gray-500 text-sm">
              No jobs found for this category. Try selecting another filter!
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto scrollbar-none py-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
            >
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="w-[280px] sm:w-[300px] bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between shrink-0"
                >
                  <div>
                    {/* Actively Hiring Badge */}
                    <div className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-100 text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-3">
                      <svg className="w-3 h-3 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Actively hiring
                    </div>

                    {/* Title & Company Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-base leading-snug truncate">
                          {job.title}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                          {job.company?.name || "Company Confidential"}
                        </p>
                      </div>

                      {/* Company Logo */}
                      {job.company?.logo ? (
                        <img
                          src={job.company.logo}
                          alt={job.company?.name}
                          className="w-8 h-8 object-contain rounded-md border border-gray-100 shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {job.title?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Location & Salary Info */}
                    <div className="mt-4 space-y-1.5 text-xs text-gray-600">
                      <p className="flex items-center gap-1.5 truncate">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">
                          {Array.isArray(job.location)
                            ? job.location.join(", ")
                            : job.location || "Work from home"}
                        </span>
                      </p>

                      <p className="flex items-center gap-1.5 font-medium text-gray-700">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          ₹{job.salary?.min ? job.salary.min.toLocaleString() : "3,50,000"} -{" "}
                          {job.salary?.max ? job.salary.max.toLocaleString() : "6,00,000"} /year
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / Action Button */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md capitalize">
                      {job.opportunityType || "Job"}
                    </span>

                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-xs font-semibold text-[#008bdc] hover:text-[#0070b8] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      View details
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Carousel Controls & Progress Track */}
        <div className="flex items-center gap-3 pt-2 w-fit">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Progress Indicator Track */}
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#008bdc] rounded-full transition-all duration-150"
              style={{ width: `${Math.max(scrollProgress, 25)}%` }}
            />
          </div>

          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FresherJobsCategory;