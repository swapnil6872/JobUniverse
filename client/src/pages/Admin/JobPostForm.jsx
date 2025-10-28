import React, { useState } from "react";

const JobPostForm = () => {
  const allOpportunityTypes = ["Job", "Internship"];
  const allEmploymentTypes = ["Full-time", "Part-time"];
  const allLocationTypes = ["Remote", "In-office", "Hybrid"];

  const [formData, setFormData] = useState({
    title: "",
    opportunityType: "",
    openings: "",
    about: "",
    requirements: "",
    whoApply: "",
    skills: [],
    salaryMin: "",
    salaryMax: "",
    variableMin: "",
    variableMax: "",
    perks: [],
    startDate: "",
    endDate: "",
    location: [],
    locationType: "",
    employmentType: "",
  });

  const allSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "MongoDB",
    "AWS",
    "UI/UX",
    "DevOps",
  ];

  const allPerks = [
    "Certificate",
    "Letter of Recommendation",
    "Flexible Hours",
    "Performance Bonus",
    "Paid Leave",
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // ---------- Handlers ----------
  const handleAddSkill = (e) => {
    const value = e.target.value;
    if (value && !selectedSkills.includes(value)) {
      setSelectedSkills([...selectedSkills, value]);
    }
    e.target.value = "";
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== skill));
  };

  const handleAddPerk = (e) => {
    const value = e.target.value;
    if (value && !selectedPerks.includes(value)) {
      setSelectedPerks([...selectedPerks, value]);
    }
    e.target.value = "";
  };

  const handleRemovePerk = (perk) => {
    setSelectedPerks(selectedPerks.filter((item) => item !== perk));
  };

  const handleAddLocation = (e) => {
    const value = e.target.value.trim();
    if (value && !selectedLocations.includes(value)) {
      setSelectedLocations([...selectedLocations, value]);
    }
    e.target.value = "";
  };

  const handleRemoveLocation = (loc) => {
    setSelectedLocations(selectedLocations.filter((l) => l !== loc));
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      skills: selectedSkills,
      perks: selectedPerks,
      location: selectedLocations,
    });
    alert("Job form submitted (console logged) ✅");
  };

  // ---------- UI ----------
  return (
    <>
      <h1 className="text-center font-semibold my-4 text-lg sm:text-xl">
        Job Posting Form
      </h1>

      <div className="max-w-3xl w-full mx-auto border border-gray-300 rounded-md p-5 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Opportunity Type */}
          <div>
            <label className="text-sm font-medium">Opportunity Type</label>
            <select
              name="opportunityType"
              value={formData.opportunityType}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {allOpportunityTypes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Openings */}
          <div>
            <label className="text-sm font-medium">Number of Openings</label>
            <input
              type="number"
              name="openings"
              value={formData.openings}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description Section */}
          <div>
            <label className="text-sm font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleOnChange}
              className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleOnChange}
              className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Who Can Apply</label>
            <textarea
              name="whoApply"
              value={formData.whoApply}
              onChange={handleOnChange}
              className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium">Skills Required</label>

            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-white font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <select
              onChange={handleAddSkill}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select skill</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Min Salary (₹)</label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleOnChange}
                className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Salary (₹)</label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleOnChange}
                className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
              />
            </div>
          </div>

          {/* Variable Pay */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Variable Min (%)</label>
              <input
                type="number"
                name="variableMin"
                value={formData.variableMin}
                onChange={handleOnChange}
                className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Variable Max (%)</label>
              <input
                type="number"
                name="variableMax"
                value={formData.variableMax}
                onChange={handleOnChange}
                className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
              />
            </div>
          </div>

          {/* Perks */}
          <div>
            <label className="text-sm font-medium">Perks</label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {selectedPerks.map((perk) => (
                <div
                  key={perk}
                  className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs"
                >
                  <span>{perk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePerk(perk)}
                    className="text-white font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <select
              onChange={handleAddPerk}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select perk</option>
              {allPerks.map((perk) => (
                <option key={perk} value={perk}>
                  {perk}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleOnChange}
                className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleOnChange}
                className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium">Location</label>

            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {selectedLocations.map((loc) => (
                <div
                  key={loc}
                  className="bg-purple-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs"
                >
                  <span>{loc}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    className="text-white font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Add location and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddLocation(e);
                }
              }}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1"
            />
          </div>

          {/* Location Type */}
          <div>
            <label className="text-sm font-medium">Location Type</label>
            <select
              name="locationType"
              value={formData.locationType}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {allLocationTypes.map((lt) => (
                <option key={lt} value={lt}>
                  {lt}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="text-sm font-medium">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {allEmploymentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full sm:w-1/2 rounded-md border border-blue-500 bg-blue-500 text-white py-2 font-medium hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobPostForm;
