import React, { useState } from "react";
import { ADMIN_API_END_POINT } from "../../utils/Host";
import axios from "axios";

const allIndustries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Agriculture/Dairy",
  "Animation",
  "Logistics",
  "Entertainment",
];

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    location: "",
    industry: [],
    about: "",
    noOfEmployees: "",
    established: "",
  });

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  console.log(selectedIndustries);

  const handleAddIndustry = (e) => {
    const value = e.target.value;
    if (value && !selectedIndustries.includes(value)) {
      setSelectedIndustries([...selectedIndustries, value]);
    }
    e.target.value = "";
  };

  const handleRemoveIndustry = (industry) => {
    setSelectedIndustries(selectedIndustries.filter((item) => item !== industry));
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("logo", formData.logo);
      submissionData.append("website", formData.website);
      submissionData.append("location", formData.location);
      submissionData.append("about", formData.about);
      submissionData.append("noOfEmployees", formData.noOfEmployees);
      submissionData.append("established", formData.established);
      // submissionData.append("industry", JSON.stringify(selectedIndustries));
      submissionData.append("industry", selectedIndustries);
      const res = await axios.post(`${ADMIN_API_END_POINT}/company/register`, submissionData, { withCredentials: true,
        headers: { "Content-Type": "multipart/form-data"  },
      });

      console.log("✅ Response:", res.data);
      alert("Company registered successfully!");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert(`${error.response?.data?.message}` || "Something went wrong!");
    }
  };

  return (
    <>
      <h1 className="text-center font-semibold my-4 text-lg sm:text-xl">
        Organization Details
      </h1>

      <div className="max-w-2xl w-full mx-auto border border-gray-300 rounded-md p-5 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Company Name
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="text-sm font-medium" htmlFor="logo">
              Logo URL
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              type="file"
              id="logo"
              name="logo"
              onChange={changeFileHandler}
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium" htmlFor="website">
              Website
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleOnChange}
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium" htmlFor="location">
              Location
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleOnChange}
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-sm font-medium">Industry</label>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {selectedIndustries.map((industry) => (
                <div
                  key={industry}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs"
                >
                  <span>{industry}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIndustry(industry)}
                    className="text-white text-sm font-bold leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Dropdown */}
            <select
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleAddIndustry}
            >
              <option value="">Select industry</option>
              {allIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* About */}
          <div>
            <label className="text-sm font-medium" htmlFor="about">
              About
            </label>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              id="about"
              name="about"
              value={formData.about}
              onChange={handleOnChange}
            />
          </div>

          {/* Number of Employees */}
          <div>
            <label className="text-sm font-medium" htmlFor="noOfEmployees">
              Number of Employees
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              type="number"
              id="noOfEmployees"
              name="noOfEmployees"
              value={formData.noOfEmployees}
              onChange={handleOnChange}
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="text-sm font-medium" htmlFor="established">
              Established Year
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
              type="number"
              id="established"
              name="established"
              value={formData.established}
              onChange={handleOnChange}
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
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

export default CompanyForm;
