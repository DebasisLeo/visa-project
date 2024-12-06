import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './Providers/Authprovider';
import { useNavigate } from 'react-router-dom';

const MyVisaApplication = () => {
  const { user } = useContext(AuthContext); // Logged-in user from AuthContext
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's applications
    const fetchApplications = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:4000/applications?email=${user.email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch applications');
          }
          const data = await response.json();
          setApplications(data);
        } catch (error) {
          console.error('Error fetching applications:', error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login'); // Redirect to login if no user is logged in
      }
    };

    fetchApplications();
  }, [user, navigate]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this application?');
    if (confirmCancel) {
      try {
        const response = await fetch(`http://localhost:4000/applications/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Application cancelled successfully!');
          setApplications(applications.filter((application) => application._id !== id));
        } else {
          alert('Failed to cancel application. Please try again.');
        }
      } catch (error) {
        console.error('Error cancelling application:', error);
        alert('Error cancelling application. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Visa Applications</h2>

      {loading ? (
        <p>Loading your applications...</p>
      ) : applications.length === 0 ? (
        <p>No visa applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((application) => (
            <div key={application._id} className="p-4 border rounded shadow-lg">
              {application.countryImage ? (
                <img
                  src={application.countryImage}
                  alt={application.countryName || 'Country'}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded mb-4">
                  No Image Available
                </div>
              )}
              <h3 className="font-bold text-lg">{application.countryName || 'Unknown Country'}</h3>
              <p>
                <strong>Visa Type:</strong> {application.visaType || 'Not specified'}
              </p>
              <p>
                <strong>Processing Time:</strong> {application.processingTime || 'Not specified'}
              </p>
              <p>
                <strong>Fee:</strong> ${application.fee || 'N/A'}
              </p>
              <p>
                <strong>Validity:</strong> {application.validity || 'Not specified'}
              </p>
              <p>
                <strong>Application Method:</strong> {application.applicationMethod || 'Not specified'}
              </p>
              <p>
                <strong>Applied Date:</strong> {application.appliedDate || 'N/A'}
              </p>
              <p>
                <strong>Applicant's Name:</strong>{' '}
                {`${application.firstName || 'N/A'} ${application.lastName || ''}`}
              </p>
              <p>
                <strong>Applicant's Email:</strong> {application.email || 'N/A'}
              </p>

              <button
                onClick={() => handleCancel(application._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel Application
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVisaApplication;
