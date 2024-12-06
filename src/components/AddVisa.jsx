import React, { useState } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';


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

    fetch('http://localhost:4000/visa',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(formValues)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  };

  return (
    <div
      className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Add Visa Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country Image */}
        <div>
          <label htmlFor="countryImage" className="block font-semibold">
            Country Image URL
          </label>
          <input
            type="url"
            id="countryImage"
            name="countryImage"
            value={formValues.countryImage}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Country Name */}
        <div>
          <label htmlFor="countryName" className="block font-semibold">
            Country Name
          </label>
          <input
            type="text"
            id="countryName"
            name="countryName"
            value={formValues.countryName}
            onChange={handleInputChange}
            placeholder="Enter country name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Visa Type */}
        <div>
          <label htmlFor="visaType" className="block font-semibold">
            Visa Type
          </label>
          <select
            id="visaType"
            name="visaType"
            value={formValues.visaType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Visa Type
            </option>
            <option value="Tourist visa">Tourist Visa</option>
            <option value="Student visa">Student Visa</option>
            <option value="Official visa">Official Visa</option>
          </select>
        </div>

        {/* Processing Time */}
        <div>
          <label htmlFor="processingTime" className="block font-semibold">
            Processing Time
          </label>
          <input
            type="text"
            id="processingTime"
            name="processingTime"
            value={formValues.processingTime}
            onChange={handleInputChange}
            placeholder="e.g., 7-14 days"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Required Documents */}
        <div>
          <label className="block font-semibold mb-2">Required Documents</label>
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
              <label htmlFor={doc} className="text-gray-700">
                {doc}
              </label>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Add a brief description..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Age Restriction */}
        <div>
          <label htmlFor="ageRestriction" className="block font-semibold">
            Age Restriction
          </label>
          <input
            type="number"
            id="ageRestriction"
            name="ageRestriction"
            value={formValues.ageRestriction}
            onChange={handleInputChange}
            placeholder="Enter age restriction"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Fee */}
        <div>
          <label htmlFor="fee" className="block font-semibold">
            Fee (in USD)
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={formValues.fee}
            onChange={handleInputChange}
            placeholder="Enter visa fee"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Validity */}
        <div>
          <label htmlFor="validity" className="block font-semibold">
            Validity
          </label>
          <input
            type="text"
            id="validity"
            name="validity"
            value={formValues.validity}
            onChange={handleInputChange}
            placeholder="e.g., 6 months"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Application Method */}
        <div>
          <label htmlFor="applicationMethod" className="block font-semibold">
            Application Method
          </label>
          <input
            type="text"
            id="applicationMethod"
            name="applicationMethod"
            value={formValues.applicationMethod}
            onChange={handleInputChange}
            placeholder="e.g., Online/Offline"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
      <div className='flex justify-center'> <button className='btn'>Add Visa</button></div>
      </form>
    </div>
  );
};

export default AddVisa;
