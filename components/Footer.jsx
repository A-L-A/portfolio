import React from "react";
import { BsGithub, BsLinkedin, BsArrowUpCircle } from "react-icons/bs";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 relative">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-brown dark:text-brown-light p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Scroll to top"
      >
        <BsArrowUpCircle className="text-2xl" />
      </button>
      
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-row justify-between items-center">
          {/* Copyright */}
          <div>
            <p className="text-sm">
              &copy; {currentYear} Lyse A. Aneze. All rights reserved.
            </p>
          </div>
          
          {/* Designed with love message */}
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium">
              Designed with Care 
              <span className="inline-block mx-2 text-brown dark:text-brown-light filter drop-shadow-lg blur-[0.2px] animate-pulse" role="img" aria-label="love">
                ❤️
              </span>
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/lyseaneze/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-brown dark:hover:text-brown-light transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://github.com/A-L-A/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-brown dark:hover:text-brown-light transition-colors duration-300"
              aria-label="GitHub"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;