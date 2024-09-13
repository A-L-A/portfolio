"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { useTheme } from "../ThemeContext";

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <main className={darkMode ? "dark" : ""}>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Footer />
    </main>
  );
}
