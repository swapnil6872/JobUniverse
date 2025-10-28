import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { COMPANY_API_END_POINT } from '../../utils/Host';
import axios from 'axios';

const Companies = () => {
  useGetAllCompanies();
  const { companies } = useSelector((state) => state.company);

 // Handler for delete 
  const handleDelete = async (companyId) => {
    console.log('Delete company with ID:', companyId);
    // Call your backend API here
     if (!companyId) {
    console.error("❌ No company ID provided");
    return;
  }

  // optional confirmation popup
  const confirmDelete = window.confirm("Are you sure you want to delete this company?");
  if (!confirmDelete) return;

  try {
    console.log("🗑️ Deleting company with ID:", companyId);
    
    const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
      withCredentials: true, // if using cookies/auth
    });

    if (res.data?.success) {
      alert("✅ Company deleted successfully");
      // optional: refresh page or update state
      window.location.reload(); 
      // or navigate("/admin/companies") if using react-router
    } else {
      alert(res.data?.message || "Failed to delete company");
    }
  } catch (error) {
    console.error("❌ Error deleting company:", error);
    alert(error.response?.data?.message || "Server error while deleting company");
  }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white px-4 py-8 mt-11">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">All Companies</h1>
          <Link to="/admin/company/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all duration-200">
              + Create Company
            </button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies && companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company._id}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 bg-white flex flex-col justify-between"
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={company.logo || '/default-logo.png'}
                      alt={company.name}
                      className="w-12 h-12 object-contain rounded-md bg-gray-100 p-1"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-900">{company.name}</h2>
                      <p className="text-sm text-gray-500">{company.location}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">Industry:</span>{' '}
                      {Array.isArray(company.industry)
                        ? company.industry.join(', ')
                        : company.industry || '—'}
                    </p>
                    <p>
                      <span className="font-medium">Employees:</span> {company.noOfEmployees || '—'}
                    </p>
                    <p>
                      <span className="font-medium">Year:</span> {company.established || '—'}
                    </p>
                  </div>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 text-blue-600 hover:underline text-sm font-medium"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>

                {/* Buttons aligned left-right */}
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/admin/company/edit/${company._id}`}>
                    <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-medium px-4 py-1.5 rounded-md transition-all duration-200">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm font-medium px-4 py-1.5 rounded-md transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-10">No companies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
