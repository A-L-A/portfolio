import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.linkedin.com/in/lyseaneze/"
            className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            target="_blank"
            rel="noopener noreferrer">
            <AiFillLinkedin size={24} />
          </a>
          <a
            href="https://github.com/A-L-A"
            className="text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            target="_blank"
            rel="noopener noreferrer">
            <AiFillGithub size={24} />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          © 2024 Lyse Arlette Aneze. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
