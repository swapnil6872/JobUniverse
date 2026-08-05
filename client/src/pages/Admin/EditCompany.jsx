import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import axios from "axios";
import { ADMIN_API_END_POINT } from "../../utils/Host";
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

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { company, loading, error } = useGetCompanyById(id);

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
  const [previewLogo, setPreviewLogo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Prefill form when company is fetched
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        website: company.website || "",
        location: company.location || "",
        about: company.about || "",
        noOfEmployees: company.noOfEmployees || "",
        established: company.established || "",
        logo: null,
      });

      const industries = Array.isArray(company.industry)
        ? company.industry
        : company.industry
        ? [company.industry]
        : [];
      setSelectedIndustries(industries);

      setPreviewLogo(company.logo || "");
    }
  }, [company]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleAddIndustry = (e) => {
    const value = e.target.value;
    if (value && !selectedIndustries.includes(value)) {
      setSelectedIndustries((prev) => [...prev, value]);
    }
    e.target.value = "";
  };

  const handleRemoveIndustry = (industryToRemove) => {
    setSelectedIndustries((prev) =>
      prev.filter((industry) => industry !== industryToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

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
      
      // Sending array safely as a stringified JSON array
      // submissionData.append("industry", JSON.stringify(selectedIndustries));
      selectedIndustries.forEach((item) => {
  submissionData.append("industry", item);
});

      const res = await axios.put(
        `${ADMIN_API_END_POINT}/company/update/${id}`,
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Updated:", res.data);
      toast.success("Company updated successfully!");
      navigate("/admin/company");
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 my-8">Loading company data...</p>;
  if (error)
    return <p className="text-red-500 text-center my-8">{error}</p>;

  return (
    <>
      <h1 className="text-center font-semibold my-4 text-lg sm:text-xl">
        Edit Organization Details
      </h1>

      <div className="max-w-2xl w-full mx-auto border border-gray-300 rounded-md p-5 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Company Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              disabled={submitting}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Logo */}
          <div>
            <label className="text-sm font-medium" htmlFor="logo">
              Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={changeFileHandler}
              disabled={submitting}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {previewLogo && (
              <img
                src={previewLogo}
                alt="Logo Preview"
                className="w-20 h-20 mt-2 border rounded object-cover"
              />
            )}
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleOnChange}
              disabled={submitting}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleOnChange}
              disabled={submitting}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-sm font-medium">Industry</label>
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
                    disabled={submitting}
                    className="text-white text-sm font-bold leading-none hover:text-gray-200 disabled:opacity-50"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <select
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              onChange={handleAddIndustry}
              disabled={submitting}
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
              id="about"
              name="about"
              value={formData.about}
              onChange={handleOnChange}
              disabled={submitting}
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Number of Employees */}
          <div>
            <label className="text-sm font-medium" htmlFor="noOfEmployees">
              Number of Employees
            </label>
            <input
              type="number"
              id="noOfEmployees"
              name="noOfEmployees"
              value={formData.noOfEmployees}
              onChange={handleOnChange}
              disabled={submitting}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="text-sm font-medium" htmlFor="established">
              Established Year
            </label>
            <input
              type="number"
              id="established"
              name="established"
              value={formData.established}
              onChange={handleOnChange}
              disabled={submitting}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-1/2 rounded-md border border-blue-500 bg-blue-500 text-white py-2 font-medium hover:bg-blue-600 transition-all disabled:bg-blue-300 disabled:border-blue-300 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {submitting ? (
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
                  Updating...
                </span>
              ) : (
                "Update Company"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCompany;