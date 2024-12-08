import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './Providers/Authprovider';
import { FaSignOutAlt, FaHome, FaUser, FaPlus, FaList, FaBars, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log('Signed out successfully'))
      .catch((error) => console.error('Error during sign-out:', error));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  AOS.init();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold hover:text-yellow-300 transition-all duration-300"
          data-aos="fade-down"
        >
          Visa Portal
        </Link>
 
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white"
        >
          {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>

        {/* Navigation Links */}
        <ul className={`lg:flex space-x-6 ${isMobileMenuOpen ? 'flex flex-col items-center absolute top-20 left-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-600 lg:static lg:flex-row lg:space-x-6 lg:bg-transparent lg:items-center' : 'hidden'}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-400 font-bold transition duration-200'
                  : 'hover:text-yellow-300 transition duration-200'
              }
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <FaHome className="inline mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-visa"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-400 font-bold transition duration-200'
                  : 'hover:text-yellow-300 transition duration-200'
              }
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <FaList className="inline mr-2" />
              All Visa
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  to="/add-visa"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-400 font-bold transition duration-200'
                      : 'hover:text-yellow-300 transition duration-200'
                  }
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <FaPlus className="inline mr-2" />
                  Add Visa
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-visas"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-400 font-bold transition duration-200'
                      : 'hover:text-yellow-300 transition duration-200'
                  }
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  My Added Visas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-applications"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-400 font-bold transition duration-200'
                      : 'hover:text-yellow-300 transition duration-200'
                  }
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  My Visa Applications
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition duration-200"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-200"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative flex items-center space-x-4">
              {/* User Image with Tooltip */}
              <div className="relative group">
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:scale-110 transition duration-200"
                />
                <div className="absolute top-6 z-10 -left-28 w-max bg-gray-800 text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.displayName || 'User'}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-200 flex items-center"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
