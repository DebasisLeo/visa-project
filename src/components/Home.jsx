import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'; // Import Typewriter
import { FaSun, FaMoon } from 'react-icons/fa'; // Import React Icons for theme toggle
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // AOS styles

AOS.init();

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
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const handleSeeDetails = (id) => {
    navigate(`/visa/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Typewriter Text */}
      <div className="mb-6 text-2xl font-bold text-center" data-aos="fade-up">
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

      {/* Theme Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-500 text-white rounded-full flex items-center space-x-2"
        >
          {theme === 'light' ? (
            <>
              <FaMoon className="text-xl" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <FaSun className="text-xl" />
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Latest Visas</h2>

      {/* Visa Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visas.slice(0, 6).map((visa) => (
          <div
            key={visa._id}
            className="p-4 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-32 object-cover mb-4 rounded-lg"
            />
            <h3 className="font-bold text-lg text-center">{visa.countryName}</h3>
            <p className="text-center">Visa Type: {visa.visaType}</p>
            <p className="text-center">Processing Time: {visa.processingTime}</p>
            <p className="text-center">Fee: ${visa.fee}</p>
            <p className="text-center">Validity: {visa.validity}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleSeeDetails(visa._id)}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See All Visas Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/all-visa')}
          className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          See All Visas
        </button>
      </div>
    </div>
  );
};

export default Home;
