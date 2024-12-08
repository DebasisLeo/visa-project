import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Home = () => {
  const visas = useLoaderData();
  const navigate = useNavigate();

  const handleSeeDetails = (id) => {
    navigate(`/visa/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Visas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {visas.slice(0, 6).map((visa) => (
  <div key={visa._id} className="p-4 border rounded shadow">
    <img src={visa.countryImage} alt={visa.countryName} className="w-full h-32 object-cover mb-2" />
    <h3 className="font-bold text-lg">{visa.countryName}</h3>
    <p>Visa Type: {visa.visaType}</p>
    <p>Processing Time: {visa.processingTime}</p>
    <p>Fee: ${visa.fee}</p>
    <p>Validity: {visa.validity}</p>
    <button
      onClick={() => handleSeeDetails(visa._id)} // Use _id instead of id
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      See Details
    </button>
  </div>
))}

      </div>
      <button
        onClick={() => navigate('/all-visa')}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        See All Visas
      </button>
    </div>
  );
};

export default Home;