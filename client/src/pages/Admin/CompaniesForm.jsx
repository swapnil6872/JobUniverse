import React, { useState } from "react";
import { ADMIN_API_END_POINT } from "../../utils/Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ALL_INDUSTRIES = [
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
    logo: null,
    website: "",
    location: "",
    about: "",
    noOfEmployees: "",
    established: "",
  });

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAddIndustry = (e) => {
    const value = e.target.value;
    if (value && !selectedIndustries.includes(value)) {
      setSelectedIndustries((prev) => [...prev, value]);
    }
    e.target.value = "";
  };

  const handleRemoveIndustry = (industryToRemove) => {
    setSelectedIndustries((prev) =>
      prev.filter((item) => item !== industryToRemove)
    );
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [e.target.name]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      if (formData.logo) {
        submissionData.append("logo", formData.logo);
      }
      submissionData.append("website", formData.website);
      submissionData.append("location", formData.location);
      submissionData.append("about", formData.about);
      submissionData.append("noOfEmployees", formData.noOfEmployees);
      submissionData.append("established", formData.established);
      
      // Send array formatted properly for backend parsers (e.g., Multer)
      submissionData.append("industry", JSON.stringify(selectedIndustries));

      const res = await axios.post(
        `${ADMIN_API_END_POINT}/company/register`,
        submissionData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response:", res.data);
      toast.success("Company registered successfully!");
      navigate("/admin/company");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-center font-semibold my-4 text-lg sm:text-xl">
        Organization Details
      </h1>

      <div className="max-w-2xl w-full mx-auto border border-gray-300 rounded-md p-5 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Company Name
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Logo */}
          <div>
            <label className="text-sm font-medium" htmlFor="logo">
              Company Logo
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={changeFileHandler}
              disabled={isSubmitting}
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium" htmlFor="website">
              Website
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleOnChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium" htmlFor="location">
              Location
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleOnChange}
              disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    className="text-white text-sm font-bold leading-none hover:text-gray-200 disabled:opacity-50"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Dropdown */}
            <select
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              onChange={handleAddIndustry}
              disabled={isSubmitting}
              defaultValue=""
            >
              <option value="" disabled>
                Select industry
              </option>
              {ALL_INDUSTRIES.filter(
                (ind) => !selectedIndustries.includes(ind)
              ).map((industry) => (
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
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              id="about"
              name="about"
              value={formData.about}
              onChange={handleOnChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Number of Employees */}
          <div>
            <label className="text-sm font-medium" htmlFor="noOfEmployees">
              Number of Employees
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="number"
              id="noOfEmployees"
              name="noOfEmployees"
              value={formData.noOfEmployees}
              onChange={handleOnChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="text-sm font-medium" htmlFor="established">
              Established Year
            </label>
            <input
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="number"
              id="established"
              name="established"
              value={formData.established}
              onChange={handleOnChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-1/2 rounded-md border border-blue-500 bg-blue-500 text-white py-2 font-medium hover:bg-blue-600 transition-all disabled:bg-blue-300 disabled:border-blue-300 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyForm;