// ThemeContext.js
"use client"; 

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context object
const ThemeContext = createContext();

// ThemeProvider wraps around all components in RootLayout
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access ThemeContext
export const useTheme = () => useContext(ThemeContext);
