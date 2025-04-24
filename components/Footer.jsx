import React from "react";
import { useTheme } from "../ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();
  
  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-beige dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 relative ">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-brown dark:text-brown-light p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Scroll to top"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="16 12 12 8 8 12"></polyline>
          <line x1="12" y1="16" x2="12" y2="8"></line>
        </svg>
      </button>
      
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-3 items-center">
          {/* Copyright - left aligned */}
          <div className="text-left">
            <p className="text-sm font-medium">
              &copy; {currentYear} All rights reserved
            </p>
          </div>
          
          {/* Designed with care message - centered */}
          <div className="flex justify-center items-center">
            <p className="text-sm font-medium">
              Designed with Care 
              <span className="inline-block mx-2 text-brown dark:text-brown-light filter drop-shadow-lg blur-[0.2px] animate-pulse" role="img" aria-label="love">
                ❤️
              </span>
            </p>
          </div>
          
          {/* Social links - right aligned */}
          <div className="flex justify-end ml-10 space-x-5 pr-12">
            <a
              href="https://linkedin.com/in/lyseaneze/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-brown dark:hover:text-brown-light transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://github.com/A-L-A/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-brown dark:hover:text-brown-light transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;