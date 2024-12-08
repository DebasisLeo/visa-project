import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'; // Import Typewriter

const Home = () => {
  const visas = useLoaderData();
  const navigate = useNavigate();

  // Get the stored theme from localStorage or default to light
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save to localStorage for persistence
  };

  // Apply the theme to the body element when the theme state changes
  useEffect(() => {
    // Remove both theme classes first
    document.body.classList.remove('light', 'dark');
    // Add the new theme class
    document.body.classList.add(theme);
  }, [theme]);

  const handleSeeDetails = (id) => {
    navigate(`/visa/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Typewriter Text */}
      <div className="mb-6 text-2xl font-bold">
        <Typewriter
          words={['Welcome to Visa Services', 'Find the Best Visa Deals', 'Explore Our Visa Options']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </div>

      <button
        onClick={toggleTheme}
        className="mb-6 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <h2 className="text-2xl font-bold mb-6">Latest Visas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visas.slice(0, 6).map((visa) => (
          <div key={visa._id} className="p-4 border rounded shadow">
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-32 object-cover mb-2"
            />
            <h3 className="font-bold text-lg">{visa.countryName}</h3>
            <p>Visa Type: {visa.visaType}</p>
            <p>Processing Time: {visa.processingTime}</p>
            <p>Fee: ${visa.fee}</p>
            <p>Validity: {visa.validity}</p>
            <button
              onClick={() => handleSeeDetails(visa._id)}
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
