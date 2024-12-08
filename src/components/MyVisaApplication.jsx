import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './Providers/Authprovider';
import { FaTimesCircle } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2'; 

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      fetch(`https://sunflower-server.vercel.app/applications?email=${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch applications.');
          return res.json();
        })
        .then((data) => {
          setApplications(data);
          setFilteredApplications(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
    AOS.init();
  }, [user]);

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((app) =>
          app.visaDetails?.countryName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://sunflower-server.vercel.app/applications/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setApplications((prev) => prev.filter((app) => app._id !== id));
          setFilteredApplications((prev) => prev.filter((app) => app._id !== id));
          Swal.fire('Canceled!', 'Your application has been canceled.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to cancel application. Please try again.', 'error');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Error canceling your application. Please try again.', 'error');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-8 text-center">My Visa Applications</h2>

      {/* Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by country name"
          className="border border-gray-300 p-2 rounded-l-md w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredApplications.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-600">
            No applications found.
          </div>
        ) : (
          filteredApplications.map((app) => (
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
              <p><strong>Applicant:</strong> {app.firstName || 'N/A'} {app.lastName || 'N/A'}</p>
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
