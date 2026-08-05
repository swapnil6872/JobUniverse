import React, { useState } from 'react'

const initialFilters = {
  search: "",
  opportunityType: "",
  employmentType: "",
  locationType: "",
  location: "",
  minSalary: "",
  maxSalary: "",
  skills: "",
  startDateFrom: "",
  startDateTo: "",
}

function Filter({ onApply, onReset }) {
  const [filters, setFilters] = useState(initialFilters)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    // Build clean query params object, dropping empty values
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    )
    onApply?.(params)
  }

  const handleReset = () => {
    setFilters(initialFilters)
    onReset?.()
  }

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="block font-medium">Job Title</label>
        <input
          name="search"
          value={filters.search}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="e.g. Frontend Developer"
        />
      </div>

      <div>
        <label className="block font-medium mt-2">Opportunity Type</label>
        <select
          name="opportunityType"
          value={filters.opportunityType}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">All</option>
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mt-2">Employment Type</label>
        <select
          name="employmentType"
          value={filters.employmentType}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mt-2">Location Type</label>
        <select
          name="locationType"
          value={filters.locationType}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="In-office">In-office</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mt-2">Location</label>
        <input
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="e.g. Mumbai, Ahmedabad"
        />
      </div>

      <div>
        <label className="block font-medium mt-2">Salary Range (in LPA)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minSalary"
            value={filters.minSalary}
            onChange={handleChange}
            className="border rounded p-2 w-1/2"
            placeholder="Min"
          />
          <span>–</span>
          <input
            type="number"
            name="maxSalary"
            value={filters.maxSalary}
            onChange={handleChange}
            className="border rounded p-2 w-1/2"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mt-2">Skills</label>
        <input
          name="skills"
          value={filters.skills}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="e.g. React, Node.js"
        />
      </div>

      <div>
        <label className="block font-medium mt-2">Start Date</label>
        <input
          type="date"
          name="startDateFrom"
          value={filters.startDateFrom}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium mt-2">End Date</label>
        <input
          type="date"
          name="startDateTo"
          value={filters.startDateTo}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-3 py-2 rounded w-full font-medium hover:bg-blue-600"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded w-full font-medium hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Filter