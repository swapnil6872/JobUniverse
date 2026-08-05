import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { COMPANY_API_END_POINT } from '../../utils/Host';
import { setCompanies } from '../../features/company/companySlice';
import axios from 'axios';
import { toast } from "react-hot-toast";

const Companies = () => {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const { companies = [] } = useSelector((state) => state.company || {});

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Modal & Loading State for Delete Confirmation
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Open delete modal
  const confirmDelete = (company) => {
    setSelectedCompany(company);
  };

  // Close delete modal
  const cancelDelete = () => {
    setSelectedCompany(null);
  };

  // Handle Delete API request
  const handleDelete = async () => {
    if (!selectedCompany?._id) return;

    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${selectedCompany._id}`,
        { withCredentials: true }
      );

      if (res.data?.success) {
        // Update Redux state directly so no window reload is required
        const updatedList = companies.filter(
          (c) => c._id !== selectedCompany._id
        );
        dispatch(setCompanies(updatedList));
        setSelectedCompany(null);
        toast.success(res.data?.message || 'Company deleted successfully');
      } else {
        toast.error(res.data?.message || 'Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error(
        error.response?.data?.message || 'Server error while deleting company'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter Companies by search query
  const filteredCompanies = companies.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Company Directory
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage existing company profiles or add new organizations to your portal.
            </p>
          </div>
          <Link
            to="/admin/company/new"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-xs hover:bg-indigo-700 active:bg-indigo-800 transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Company
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search companies by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Grid List */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-1-4h.01M9 16h.01M9 12h.01M13 16h.01M13 12h.01M14 8h-4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No companies found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try searching for another keyword." : "Get started by creating a new company profile."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <div
                key={company._id}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Company Info */}
                  <div className="flex items-start gap-4">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-14 h-14 object-contain rounded-xl border border-gray-100 bg-gray-50 p-2 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">
                        {company.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h2 className="font-bold text-gray-900 text-lg leading-snug truncate">
                        {company.name}
                      </h2>
                      <p className="text-xs font-medium text-gray-500 mt-0.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{company.location || "Location not specified"}</span>
                      </p>
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Industry</span>
                      <span className="font-medium text-gray-800 truncate max-w-[150px]">
                        {/* {Array.isArray(company.industry)
                          ? company.industry.join(', ')
                          : company.industry || '—'} */}
                        {(() => {
                          let industries = company.industry;

                          if (typeof industries === "string") {
                            try {
                              industries = JSON.parse(industries);
                            } catch {
                              // leave as string
                            }
                          }

                          return Array.isArray(industries)
                            ? industries.join(", ")
                            : industries || "—";
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Employees</span>
                      <span className="font-medium text-gray-800">{company.noOfEmployees || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Established</span>
                      <span className="font-medium text-gray-800">{company.established || '—'}</span>
                    </div>
                  </div>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                      Visit Website
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <Link
                    to={`/admin/company/edit/${company._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50/50 border border-gray-200 px-3.5 py-2 rounded-xl transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={() => confirmDelete(company)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50/50 hover:bg-rose-100/60 border border-rose-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4 mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-center text-gray-900">Delete Company</h3>
            <p className="text-sm text-center text-gray-500 mt-2">
              Are you sure you want to delete <strong className="text-gray-900">{selectedCompany.name}</strong>? This action cannot be undone and may affect associated job listings.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;