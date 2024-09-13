"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

export default function Home({ darkMode, setDarkMode }) {
  return (
    <main className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Services />
      <Portfolio />
      <Footer />
    </main>
  );
}