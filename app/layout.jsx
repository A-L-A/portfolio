"use client";
import React from "react";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={inter.className}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { darkMode, setDarkMode })
        )}
      </body>
    </html>
  );
}