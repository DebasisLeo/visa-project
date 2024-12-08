import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { FaSun, FaMoon } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bg from '../assets/bg.png';
import bg1 from '../assets/bg1.png';
import bg2 from '../assets/bg2.png';

AOS.init();

const Home = () => {
  const visas = useLoaderData();
  const navigate = useNavigate();

  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
  //  console.log(document.html)
  document.body.setAttribute('data-theme',theme)
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

      {/* "Why Choose Us?" Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-center mb-6" data-aos="fade-up">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-lg font-bold mb-4">Expert Guidance</h3>
            <p>Our team of visa experts ensures a smooth and hassle-free process tailored to your needs.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-bold mb-4">Affordable Pricing</h3>
            <p>Get the best visa deals at competitive prices with no hidden charges.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-lg font-bold mb-4">24/7 Support</h3>
            <p>We are available round the clock to assist you with all your queries and concerns.</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <h2 className="text-2xl font-bold mb-6 text-center">Latest Visas</h2>
      <div className="carousel w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={bg2} className="w-full h-full object-cover" alt="Background Image 1" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={bg1} className="w-full h-full object-cover" alt="Background Image 2" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={bg} className="w-full h-full object-cover" alt="Background Image 3" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      {/* Visa Grid Section */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-center">Explore Visa Options</h2>
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

      {/* Testimonials Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-center mb-6" data-aos="fade-up">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <p>"The best visa service I've ever used! Highly recommend to everyone."</p>
            <h4 className="mt-4 font-bold">- John Doe</h4>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <p>"Excellent customer support and very affordable pricing."</p>
            <h4 className="mt-4 font-bold">- Jane Smith</h4>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <p>"Got my visa in no time. A hassle-free and smooth process."</p>
            <h4 className="mt-4 font-bold">- Alex Wilson</h4>
          </div>
        </div>
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
