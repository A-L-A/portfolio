import React from "react";
import { BsFillMoonStarsFill, BsHouseFill } from "react-icons/bs";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="flex items-center">
            <BsHouseFill className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </a>
          <ul className="flex items-center space-x-4 sm:space-x-6">
            <li>
              <BsFillMoonStarsFill
                onClick={toggleDarkMode}
                className="cursor-pointer text-xl text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              />
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition duration-300">
                Services
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition duration-300">
                Portfolio
              </a>
            </li>
            <li>
              <a
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition duration-300"
                href="https://drive.google.com/file/d/1aPlTI27POK5Ex_UrsMZaK0PAe0oyoA1e/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
