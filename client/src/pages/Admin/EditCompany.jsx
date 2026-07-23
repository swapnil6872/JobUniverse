import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById"; // adjust path
import axios from "axios";
import { ADMIN_API_END_POINT } from "../../utils/Host";

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

const EditCompany = () => {
  const { id } = useParams();
  const { company, loading, error } = useGetCompanyById(id);

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
  const [previewLogo, setPreviewLogo] = useState("");

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      if (formData.logo) submissionData.append("logo", formData.logo);
      submissionData.append("website", formData.website);
      submissionData.append("location", formData.location);
      submissionData.append("about", formData.about);
      submissionData.append("noOfEmployees", formData.noOfEmployees);
      submissionData.append("established", formData.established);
      // submissionData.append("industry", JSON.stringify(selectedIndustries));
      submissionData.append("industry", selectedIndustries);
    
      const res = await axios.put(`${ADMIN_API_END_POINT}/company/update/${id}`, submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Updated:", res.data);
      alert("Company updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading company data...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <h1 className="text-center font-semibold my-4 text-lg sm:text-xl">Edit Organization Details</h1>

      <div className="max-w-2xl w-full mx-auto border border-gray-300 rounded-md p-5 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="text-sm font-medium" htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="text-sm font-medium" htmlFor="logo">Logo URL</label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={changeFileHandler}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
            />
            {previewLogo && (
              <img src={previewLogo} alt="Logo" className="w-20 h-20 mt-2 border rounded" />
            )}
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium" htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
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
                  <button type="button" onClick={() => handleRemoveIndustry(industry)} className="text-white text-sm font-bold leading-none">×</button>
                </div>
              ))}
            </div>
            <select
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleAddIndustry}
            >
              <option value="">Select industry</option>
              {allIndustries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* About */}
          <div>
            <label className="text-sm font-medium" htmlFor="about">About</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleOnChange}
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
            />
          </div>

          {/* Number of Employees */}
          <div>
            <label className="text-sm font-medium" htmlFor="noOfEmployees">Number of Employees</label>
            <input
              type="number"
              id="noOfEmployees"
              name="noOfEmployees"
              value={formData.noOfEmployees}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="text-sm font-medium" htmlFor="established">Established Year</label>
            <input
              type="number"
              id="established"
              name="established"
              value={formData.established}
              onChange={handleOnChange}
              className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 rounded-md border border-blue-500 bg-blue-500 text-white py-2 font-medium hover:bg-blue-600 transition-all"
            >
              Update Company
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCompany;
