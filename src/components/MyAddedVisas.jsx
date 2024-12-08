import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './Providers/Authprovider';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'; // React Icons
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [loadedData, setLoadedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/visa?user=${user?.email}`);
        const data = await response.json();
        setLoadedData(data);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch your visas.",
          icon: "error"
        });
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/visa/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => {
            setLoadedData(prevData => prevData.filter(visa => visa._id !== id));
            Swal.fire("Deleted!", "Visa has been deleted successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "There was an issue deleting the visa.", "error");
          });
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedVisa = Object.fromEntries(formData.entries());
    updatedVisa.fee = Number(updatedVisa.fee);

    try {
      const response = await fetch(`http://localhost:4000/visa/${selectedVisa._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVisa),
      });

      const data = await response.json();

      if (response.ok) {
        setLoadedData(prevData =>
          prevData.map(visa =>
            visa._id === selectedVisa._id ? data : visa
          )
        );
        Swal.fire("Updated!", "Visa has been updated successfully.", "success");
        setShowModal(false);
      } else {
        Swal.fire("Failed to Update!", "There was an issue updating the visa.", "error");
      }
    } catch {
      Swal.fire("Error!", "There was an error updating the visa.", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center" data-aos="fade-down">My Added Visas</h2>

      {loadedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadedData.map((visa) => (
            <div
              key={visa._id}
              className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105"
              data-aos="fade-up"
            >
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg text-center mb-2">{visa.countryName}</h3>
              <p><strong>Visa Type:</strong> {visa.visaType}</p>
              <p><strong>Processing Time:</strong> {visa.processingTime}</p>
              <p><strong>Fee:</strong> ${visa.fee}</p>
              <p><strong>Validity:</strong> {visa.validity}</p>
              <p><strong>Application Method:</strong> {visa.applicationMethod}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setSelectedVisa(visa);
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Update</span>
                </button>
                <button
                  onClick={() => handleDelete(visa._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center space-x-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500" data-aos="fade-in">No visas found</p>
      )}

      {showModal && selectedVisa && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full" data-aos="zoom-in">
            <h3 className="text-lg font-bold mb-4">Update Visa</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="countryName"
                defaultValue={selectedVisa?.countryName}
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="url"
                name="countryImage"
                defaultValue={selectedVisa?.countryImage}
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="visaType"
                defaultValue={selectedVisa?.visaType}
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="processingTime"
                defaultValue={selectedVisa?.processingTime}
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="number"
                name="fee"
                defaultValue={selectedVisa?.fee}
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="validity"
                defaultValue={selectedVisa?.validity}
                required
                className="block mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="applicationMethod"
                defaultValue={selectedVisa?.applicationMethod}
                required
                className="block mb-2 p-2 border rounded w-full"
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-2"
                >
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-2"
                >
                  <FaWindowClose />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedVisas;
