import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from './Providers/Authprovider';

const VisaDetails = () => {
  const visa = useLoaderData(); // Fetch visa data
  const { user } = useContext(AuthContext); // Get logged-in user info
  const navigate = useNavigate(); // For navigation
  const [showModal, setShowModal] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const applicationData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:4000/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        navigate('/my-applications'); // Redirect to "My Applications"
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }

    setShowModal(false); // Close the modal
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{visa.countryName} Visa Details</h2>
      <p><strong>Visa Type:</strong> {visa.visaType}</p>
      <p><strong>Processing Time:</strong> {visa.processingTime}</p>
      <p><strong>Fee:</strong> ${visa.fee}</p>
      <p><strong>Validity:</strong> {visa.validity}</p>
      <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
      <p><strong>Description:</strong> {visa.description}</p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply for the Visa
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Apply for the Visa</h3>
            <form onSubmit={handleApply}>
              {/* Pre-filled fields */}
              <input
                type="email"
                name="email"
                value={user?.email || ''}
                readOnly
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="appliedDate"
                value={new Date().toISOString().split('T')[0]}
                readOnly
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="number"
                name="fee"
                value={visa.fee}
                readOnly
                className="block mb-2 p-2 border rounded w-full"
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
