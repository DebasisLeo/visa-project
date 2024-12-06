import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const AllVisas = () => {
  const visas = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Visas</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {visas.map((visa) => (
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
