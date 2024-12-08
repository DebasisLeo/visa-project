import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './Providers/Authprovider';
import Swal from 'sweetalert2';

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);  // Get the user from context
  const [loadedData, setLoadedData] = useState([]);  // State to hold visa data
  const [showModal, setShowModal] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);  // Store the selected visa for updating

  // Fetch data for the logged-in user
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

  // Delete visa
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
        fetch(`http://localhost:4000/visa/${id}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
  
          // After successful deletion, update the state to remove the deleted visa
          setLoadedData(prevData => prevData.filter(visa => visa._id !== id));
  
          Swal.fire({
            title: "Deleted!",
            text: "Visa has been deleted successfully.",
            icon: "success"
          });
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the visa.",
            icon: "error"
          });
        });
      }
    });
  };

  // Update visa
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedVisa = Object.fromEntries(formData.entries());
  
    // Convert fee to a number before sending the update request
    updatedVisa.fee = Number(updatedVisa.fee);
  
    try {
      const response = await fetch(`http://localhost:4000/visa/${selectedVisa._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVisa),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: "Updated!",
          text: "Visa has been updated successfully.",
          icon: "success"
        });
  
        // Update the state with the returned updated visa data
        setLoadedData(prevData => 
          prevData.map(visa => 
            visa._id === selectedVisa._id ? data : visa // Replace the old visa with the updated one
          )
        );
  
        // Close the modal
        setShowModal(false);
      } else {
        Swal.fire({
          title: "Failed to Update!",
          text: "There was an issue updating the visa.",
          icon: "error"
        });
      }
    } catch (error) {
      console.error('Error updating visa:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the visa.",
        icon: "error"
      });
    }
  };
  
  
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Added Visas</h2>

      {loadedData && loadedData.length > 0 ? (
        loadedData.map((visa) => (
          <div key={visa._id} className="p-4 border rounded shadow-lg mb-6">
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg">{visa.countryName}</h3>
            <p><strong>Visa Type:</strong> {visa.visaType}</p>
            <p><strong>Processing Time:</strong> {visa.processingTime}</p>
            <p><strong>Fee:</strong> ${visa.fee}</p>
            <p><strong>Validity:</strong> {visa.validity}</p>
            <p><strong>Application Method:</strong> {visa.applicationMethod}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setSelectedVisa(visa); // Set the selected visa for the modal
                  setShowModal(true);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(visa._id)} // Pass the specific visa ID for deletion
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No visas found</p>
      )}

      {/* Update Modal */}
      {showModal && selectedVisa && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
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
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Update
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

export default MyAddedVisas;