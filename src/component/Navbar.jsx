import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function BeautifulNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Services', to: '/services' },
    { name: 'Portfolio', to: '/portfolio' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Contact', to: '/contact' },
   { name: 'Ecommerce', to: '/ecommerce' }

  ];

  return (
    <nav className="relative w-full bg-white/90 backdrop-blur-lg border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to={"/"} >
          
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="" className='h-20 w-20'/>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
           
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300">
              Contact
            </Link>
            <Link to="/pricing" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <svg
              className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-6 space-y-4 border-t border-gray-100/50 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-100/50">
              <Link to="/admin-login" className="w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2 mr-4 transition-colors duration-300">
                Admin Login
              </Link>
              <Link to="/contact" className="w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2 mr-4 transition-colors duration-300">
                Contact
              </Link>
              <Link to="/pricing" className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
    </nav>
  );
}