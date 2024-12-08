import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaGlobe, FaFilter } from 'react-icons/fa'; // React Icons for design
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllVisas = () => {
  const visas = useLoaderData();
  const navigate = useNavigate();
  const [filteredVisas, setFilteredVisas] = useState(visas);
  const [selectedVisaType, setSelectedVisaType] = useState('All');

  // Initialize AOS animations
  useEffect(() => {
    AOS.init();
  }, []);

  // Handle change in selected visa type
  const handleVisaTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedVisaType(selectedType);

    // Filter visas based on the selected visa type
    if (selectedType === 'All') {
      setFilteredVisas(visas);
    } else {
      setFilteredVisas(visas.filter((visa) => visa.visaType === selectedType));
    }
  };

  // Get unique visa types for the dropdown options
  const visaTypes = ['All', ...new Set(visas.map((visa) => visa.visaType))];

  return (
    <div className="container mx-auto p-6">
      <h2 
        className="text-3xl font-bold text-center mb-8" 
        data-aos="fade-down"
      >
        <FaGlobe className="inline-block text-blue-500 mr-2" /> Explore All Visas
      </h2>

      {/* Filter Section */}
      <div 
        className="mb-6 flex flex-col sm:flex-row justify-between items-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <label htmlFor="visa-type" className="text-lg font-semibold mb-2 sm:mb-0 sm:mr-4">
          <FaFilter className="inline-block text-gray-600 mr-2" />
          Filter by Visa Type:
        </label>
        <select
          id="visa-type"
          value={selectedVisaType}
          onChange={handleVisaTypeChange}
          className="px-4 py-2 border rounded w-full sm:w-auto"
        >
          {visaTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Display Filtered Visas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVisas.map((visa) => (
          <div
            key={visa._id}
            className="p-4 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-32 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold text-center">{visa.countryName}</h3>
            <p className="text-center text-gray-600">Visa Type: {visa.visaType}</p>
            <p className="text-center text-gray-600">Fee: ${visa.fee}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate(`/visa/${visa._id}`)}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                data-aos="flip-up"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message for no filtered results */}
      {filteredVisas.length === 0 && (
        <div 
          className="text-center mt-8 text-gray-500"
          data-aos="fade-up"
        >
          <p>No visas found for the selected type.</p>
        </div>
      )}
    </div>
  );
};

export default AllVisas;
