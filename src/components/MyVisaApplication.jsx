import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Providers/Authprovider';
import { FaTimesCircle } from 'react-icons/fa'; // Cancel icon
import AOS from 'aos'; // Import AOS for scroll animations
import 'aos/dist/aos.css'; // AOS styles

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/applications?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch applications.');
          }
          return res.json();
        })
        .then((data) => {
          setApplications(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }

    // Initialize AOS for animations
    AOS.init();
  }, [user]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this application?');
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:4000/applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the application from the state
        setApplications((prev) => prev.filter((app) => app._id !== id));
        alert('Application canceled successfully.');
      } else {
        alert('Failed to cancel application. Please try again.');
      }
    } catch (error) {
      console.error('Error canceling application:', error);
      alert('Error canceling application. Please try again.');
    }
  };

  // Show loading or error messages
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-8 text-center">My Visa Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {applications.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-600">No applications found.</div>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="visa-card bg-white shadow-lg rounded-lg p-6"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img
                src={app.visaDetails?.countryImage || 'https://via.placeholder.com/150'}
                alt={app.visaDetails?.countryName || 'Country'}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {app.visaDetails?.countryName ? `${app.visaDetails.countryName} Visa` : 'Visa Details'}
              </h3>
              <p><strong>Visa Type:</strong> {app.visaDetails?.visaType || 'N/A'}</p>
              <p><strong>Fee:</strong> ${app.visaDetails?.fee || 'N/A'}</p>
              <p><strong>Processing Time:</strong> {app.visaDetails?.processingTime || 'N/A'}</p>
              <p><strong>Validity:</strong> {app.visaDetails?.validity || 'N/A'}</p>
              <p><strong>Application Method:</strong> {app.visaDetails?.applicationMethod || 'N/A'}</p>
              <p><strong>Applied On:</strong> {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}</p>
              <p>
                <strong>Applicant:</strong> {app.firstName || 'N/A'} {app.lastName || 'N/A'}
              </p>
              <p><strong>Email:</strong> {app.email || 'N/A'}</p>
              <button
                onClick={() => handleCancel(app._id)}
                className="cancel-btn mt-4 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
              >
                <FaTimesCircle className="mr-2" /> Cancel Application
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;
