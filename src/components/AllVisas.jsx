import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const AllVisas = () => {
  const visas = useLoaderData();
  const navigate = useNavigate();
  const [filteredVisas, setFilteredVisas] = useState(visas);
  const [selectedVisaType, setSelectedVisaType] = useState('All');

  // Handle change in selected visa type
  const handleVisaTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedVisaType(selectedType);

    // Filter visas based on the selected visa type
    if (selectedType === 'All') {
      setFilteredVisas(visas); // Show all visas
    } else {
      setFilteredVisas(visas.filter((visa) => visa.visaType === selectedType)); // Filter by type
    }
  };

  // Get unique visa types for the dropdown options
  const visaTypes = ['All', ...new Set(visas.map((visa) => visa.visaType))];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Visas</h2>

      {/* Dropdown menu for selecting visa type */}
      <div className="mb-4">
        <label htmlFor="visa-type" className="mr-2">Filter by Visa Type:</label>
        <select
          id="visa-type"
          value={selectedVisaType}
          onChange={handleVisaTypeChange}
          className="px-4 py-2 border rounded"
        >
          {visaTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Display filtered visas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredVisas.map((visa) => (
          <div key={visa.id} className="p-4 border rounded shadow">
            <h3 className="font-bold text-lg">{visa.countryName}</h3>
            <p>Visa Type: {visa.visaType}</p>
            <p>Fee: ${visa.fee}</p>
            <button
              onClick={() => navigate(`/visa/${visa._id}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVisas;
