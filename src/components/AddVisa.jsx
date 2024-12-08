import React, { useState } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import { FaPaperPlane } from 'react-icons/fa'; // Import an icon from react-icons
import { FaRegFileAlt, FaRegClock, FaRegEdit, FaRegListAlt } from 'react-icons/fa';
import { Slide } from 'react-awesome-reveal'; // Import Slide effect from React Awesome Reveal
import Swal from 'sweetalert2';
AOS.init();

const AddVisa = () => {
  const [formValues, setFormValues] = useState({
    countryImage: '',
    countryName: '',
    visaType: '',
    processingTime: '',
    requiredDocuments: [],
    description: '',
    ageRestriction: '',
    fee: '',
    validity: '',
    applicationMethod: '',
  });

  const documentOptions = [
    'Valid passport',
    'Visa application form',
    'Recent passport-sized photograph',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues((prev) => ({
        ...prev,
        requiredDocuments: checked
          ? [...prev.requiredDocuments, value]
          : prev.requiredDocuments.filter((doc) => doc !== value),
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Form Submitted:', formValues);
  
    fetch('http://localhost:4000/visa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to submit visa details');
        }
      })
      .then((data) => {
        console.log(data);
  
        // Show SweetAlert2 success message
        Swal.fire({
          title: 'Success!',
          text: 'Visa added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // Auto-close after 3 seconds
        });
  
        // Reset form values
        setFormValues({
          countryImage: '',
          countryName: '',
          visaType: '',
          processingTime: '',
          requiredDocuments: [],
          description: '',
          ageRestriction: '',
          fee: '',
          validity: '',
          applicationMethod: '',
        });
      })
      .catch((error) => {
        console.error(error);
  
        // Show SweetAlert2 error message
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add visa. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };
  

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-xl" data-aos="fade-up" data-aos-duration="1000">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Visa Details</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Country Image */}
        <div data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
          <label htmlFor="countryImage" className="block font-semibold text-gray-700 mb-2">
            Country Image URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="countryImage"
              name="countryImage"
              value={formValues.countryImage}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <FaRegFileAlt className="absolute top-3 right-3 text-gray-500" />
          </div>
        </div>

        {/* Country Name */}
        <Slide left delay={200}>
          <div>
            <label htmlFor="countryName" className="block font-semibold text-gray-700 mb-2">
              Country Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="countryName"
                name="countryName"
                value={formValues.countryName}
                onChange={handleInputChange}
                placeholder="Enter country name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaRegEdit className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>
        </Slide>

        {/* Visa Type */}
        <Slide left delay={300}>
          <div>
            <label htmlFor="visaType" className="block font-semibold text-gray-700 mb-2">
              Visa Type
            </label>
            <div className="relative">
              <select
                id="visaType"
                name="visaType"
                value={formValues.visaType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Visa Type
                </option>
                <option value="Tourist visa">Tourist Visa</option>
                <option value="Student visa">Student Visa</option>
                <option value="Official visa">Official Visa</option>
              </select>
              <FaRegListAlt className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>
        </Slide>

        {/* Processing Time */}
        <Slide left delay={400}>
          <div>
            <label htmlFor="processingTime" className="block font-semibold text-gray-700 mb-2">
              Processing Time
            </label>
            <div className="relative">
              <input
                type="text"
                id="processingTime"
                name="processingTime"
                value={formValues.processingTime}
                onChange={handleInputChange}
                placeholder="e.g., 7-14 days"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaRegClock className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>
        </Slide>

        {/* Required Documents */}
        <Slide left delay={500}>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Required Documents</label>
            {documentOptions.map((doc) => (
              <div key={doc} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={doc}
                  name="requiredDocuments"
                  value={doc}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={doc} className="text-gray-700">{doc}</label>
              </div>
            ))}
          </div>
        </Slide>

        {/* Description */}
        <Slide left delay={600}>
          <div>
            <label htmlFor="description" className="block font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              placeholder="Add a brief description..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
        </Slide>

        {/* Age Restriction */}
        <Slide left delay={700}>
          <div>
            <label htmlFor="ageRestriction" className="block font-semibold text-gray-700 mb-2">
              Age Restriction
            </label>
            <input
              type="number"
              id="ageRestriction"
              name="ageRestriction"
              value={formValues.ageRestriction}
              onChange={handleInputChange}
              placeholder="Enter age restriction"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </Slide>

        {/* Fee */}
        <Slide left delay={800}>
          <div>
            <label htmlFor="fee" className="block font-semibold text-gray-700 mb-2">
              Fee (in USD)
            </label>
            <input
              type="number"
              id="fee"
              name="fee"
              value={formValues.fee}
              onChange={handleInputChange}
              placeholder="Enter visa fee"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </Slide>

        {/* Validity */}
        <Slide left delay={900}>
          <div>
            <label htmlFor="validity" className="block font-semibold text-gray-700 mb-2">
              Validity
            </label>
            <input
              type="text"
              id="validity"
              name="validity"
              value={formValues.validity}
              onChange={handleInputChange}
              placeholder="e.g., 6 months"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </Slide>

        {/* Application Method */}
        <Slide left delay={1000}>
          <div>
            <label htmlFor="applicationMethod" className="block font-semibold text-gray-700 mb-2">
              Application Method
            </label>
            <input
              type="text"
              id="applicationMethod"
              name="applicationMethod"
              value={formValues.applicationMethod}
              onChange={handleInputChange}
              placeholder="e.g., Online/Offline"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </Slide>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-all"
          >
            <FaPaperPlane />
            <span>Add Visa</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisa;
