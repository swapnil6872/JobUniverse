import React, { useState } from 'react';

const IndustrySelector = () => {
  const [selectedIndustries, setSelectedIndustries] = useState([
    'E-commerce',
    'Animation',
    'Other',
  ]);

  const allIndustries = [
    'E-commerce',
    'Animation',
    'Other',
    'Education',
    'Healthcare',
    'Finance',
    'Gaming',
  ];

  const handleAddIndustry = (e) => {
    const value = e.target.value;
    if (value && !selectedIndustries.includes(value)) {
      setSelectedIndustries([...selectedIndustries, value]);
    }
    e.target.value = '';
  };

  const handleRemoveIndustry = (industry) => {
    setSelectedIndustries(selectedIndustries.filter((item) => item !== industry));
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Industry</label>

      {/* Selected Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {selectedIndustries.map((industry) => (
          <div
            key={industry}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{industry}</span>
            <button
              onClick={() => handleRemoveIndustry(industry)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      <select
        onChange={handleAddIndustry}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      >
        <option value="">Select industry</option>
        {allIndustries.map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IndustrySelector;