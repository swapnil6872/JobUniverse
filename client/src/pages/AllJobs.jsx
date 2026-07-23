import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [selectedAccordion, setSelectedAccordion] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    "How to search for part time jobs in Ahmedabad?",
    "What are the best part time job vacancies in Ahmedabad?",
    "What type of jobs are available in Ahmedabad?",
    "How much salary can I expect in part time jobs in Ahmedabad?",
    "How can I apply for part time job openings in Ahmedabad?",
    "Can I get a placement course in Ahmedabad?",
    "How can I improve my skill set in Ahmedabad?",
  ];

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
      title: "Top Companies",
      content: ["TCS", "Infosys", "Wipro", "Zomato", "OYO"],
    },
  ];

  const toggleFAQ = (index) => setSelectedFAQ(selectedFAQ === index ? null : index);
  const toggleAccordion = (index) => setSelectedAccordion(selectedAccordion === index ? null : index);

  // 🔹 Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/jobs");
        // If response structure is like { success, jobs: [...] }
        const jobData = res.data.jobs || [];
        setJobs(jobData.slice(0, 14)); // only first 14 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8">
      {/* Main Content */}
      <div className="flex w-11/12 max-w-7xl gap-6">
        {/* Filters */}
        <div className="w-1/4 bg-white p-5 rounded-lg shadow-md sticky top-20 h-fit">
          <h2 className="font-semibold text-lg mb-3">Filters</h2>
          <div className="space-y-4 text-sm">
            {/* Same filter inputs (kept for now, will link later) */}
            <div>
              <label className="block font-medium">Job Title</label>
              <input className="border rounded p-2 w-full" placeholder="e.g. Frontend Developer" />
            </div>
            <div>
              <label className="block font-medium mt-2">Opportunity Type</label>
              <select className="border rounded p-2 w-full">
                <option value="">All</option>
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mt-2">Employment Type</label>
              <select className="border rounded p-2 w-full">
                <option value="">All</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mt-2">Location Type</label>
              <select className="border rounded p-2 w-full">
                <option value="">All</option>
                <option value="Remote">Remote</option>
                <option value="In-office">In-office</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mt-2">Location</label>
              <input className="border rounded p-2 w-full" placeholder="e.g. Mumbai, Ahmedabad" />
            </div>
            <div>
              <label className="block font-medium mt-2">Salary Range (in LPA)</label>
              <div className="flex items-center gap-2">
                <input type="number" className="border rounded p-2 w-1/2" placeholder="Min" />
                <span>–</span>
                <input type="number" className="border rounded p-2 w-1/2" placeholder="Max" />
              </div>
            </div>
            <div>
              <label className="block font-medium mt-2">Skills</label>
              <input className="border rounded p-2 w-full" placeholder="e.g. React, Node.js" />
            </div>
            <div>
              <label className="block font-medium mt-2">Start Date</label>
              <input type="date" className="border rounded p-2 w-full" />
            </div>
            <div>
              <label className="block font-medium mt-2">End Date</label>
              <input type="date" className="border rounded p-2 w-full" />
            </div>
            <button className="bg-blue-500 text-white px-3 py-2 rounded w-full font-medium hover:bg-blue-600">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Job List */}
        <div className="flex-1">
          <h2 className="text-center text-2xl font-semibold mb-4">
            {jobs.length} Jobs in Ahmedabad
          </h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center" onClick={() => navigate(`/jobs/${job._id}`)} >
                  <div  onClick={() => navigate(`/jobs/${job._id}`)} className="cursor-pointer">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600">{job.company?.name || "Company Name"}</p>
                    <p className="text-sm text-gray-500">
                      {job.location?.join(", ") || "Location"} • ₹
                      {job.salary?.min}–{job.salary?.max} LPA • {job.employmentType}
                    </p>
                  </div>
                  <button className="text-blue-600 font-medium">Apply Now →</button>
                </div>
              </div>
            ))}
          </div>

          {/* After Last Job Section */}
          <div className="mt-10 bg-blue-50 p-4 rounded-lg text-center shadow-sm border border-blue-200">
            <p className="text-gray-700 font-medium">
              That's all in <span className="font-semibold">Ahmedabad</span> for now!
            </p>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">
              Apply to {jobs.length} Part Time Jobs in Ahmedabad
            </h2>

            {accordionData.map((item, index) => (
              <div key={index} className="border-b py-3">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between w-full text-left text-gray-800 font-medium"
                >
                  {item.title}
                  <span>{selectedAccordion === index ? "−" : "+"}</span>
                </button>
                {selectedAccordion === index && (
                  <ul className="mt-2 pl-3 text-sm text-gray-600 space-y-1 list-disc">
                    {item.content.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-11/12 max-w-4xl mt-12 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
        </div>
        {faqs.map((question, index) => (
          <div key={index} className="border-b py-3">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between w-full text-left text-gray-700 font-medium"
            >
              {`Q. ${question}`}
              <span>{selectedFAQ === index ? "−" : "+"}</span>
            </button>
            {selectedFAQ === index && (
              <p className="text-sm text-gray-600 mt-2">
                This is a placeholder answer. You can replace it later with actual FAQ content.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;
