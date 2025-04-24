import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Link from "next/link";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-8 py-2 flex justify-between items-center backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-lg bg-white/90 dark:bg-gray-900/90" : "bg-transparent"
      }`}
    >
      {/* Logo with Cursive Font */}
      <Link href="/" passHref>
        <h1 className="text-2xl md:text-3xl font-cursive text-brown dark:text-brown-light cursor-pointer transition-all duration-300 hover:scale-105">
          L.A.A
        </h1>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 text-sm md:text-base font-medium">
        {["home", "services", "portfolio", "contact"].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className="relative group py-2 px-1"
            >
              <span className="relative z-10 hover:text-brown dark:hover:text-brown-light transition-colors duration-300 capitalize">
                {section}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brown dark:bg-brown-light group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
        ))}

        {/* Dark Mode Toggle */}
        <li>
          <button
            onClick={toggleDarkMode}
            className="ml-2 p-3 rounded-full text-xl bg-gray-100/50 dark:bg-gray-800/50 text-brown dark:text-brown-light hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
