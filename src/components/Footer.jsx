import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Left Section: Website Name and Copyright */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">VisaWorld</h3>
          <p className="text-sm mt-2">&copy; 2024 VisaWorld. All rights reserved.</p>
        </div>

        {/* Middle Section: Contact Information */}
        <div className="hidden md:block">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <p className="text-sm">Email: support@visaworld.com</p>
          <p className="text-sm">Phone: +1 800 123 4567</p>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram.png" alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Footer Bottom Section for additional links */}
      <div className="mt-4 text-center">
        <a href="/terms" className="text-sm mx-4">Terms of Service</a>
        <a href="/privacy" className="text-sm mx-4">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
