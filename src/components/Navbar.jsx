import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './Providers/Authprovider';
import { FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // Handle sign-out function
  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log('Signed out successfully'))
      .catch((error) => console.error('Error during sign-out:', error));
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold hover:text-blue-300">
          Visa Portal
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-bold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              <FaHome className="inline mr-1" />
              Home
            </NavLink>
          
    
          </li>
          <li>
            <NavLink
              to="/all-visa"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-bold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              <FaHome className="inline mr-1" />
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
                      ? 'text-blue-400 font-bold'
                      : 'hover:text-blue-300 transition duration-200'
                  }
                >
                  Add Visa
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-visas"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-400 font-bold'
                      : 'hover:text-blue-300 transition duration-200'
                  }
                >
                  My Added Visas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-applications"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue-400 font-bold'
                      : 'hover:text-blue-300 transition duration-200'
                  }
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
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
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:scale-105 transition duration-200"
                  title={user.displayName}
                />
                <div className="absolute bottom-12 left-0 w-max bg-gray-700 text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition duration-200">
                  {user.displayName || 'User'}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200 flex items-center"
              >
                <FaSignOutAlt className="inline mr-1" />
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
