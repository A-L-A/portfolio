"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
// import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTheme } from "../ThemeContext";

/**
 * Main Home component that assembles all sections of the portfolio website
 * 
 * @returns {JSX.Element} The complete homepage
 */
export default function Home() {
  const { darkMode } = useTheme();
  
  // Global scroll observer for section animations
  useEffect(() => {
    // Setup intersection observer for section animations
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    // Cleanup observer on component unmount
    return () => {
      document.querySelectorAll('section').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Apply alternating section backgrounds
  useEffect(() => {
    // Identify sections for alternating backgrounds
    const sections = [
      document.getElementById('services'),
      document.getElementById('portfolio'),
      document.getElementById('contact')
    ].filter(Boolean);
    
    // Remove any existing background classes
    sections.forEach(section => {
      section.classList.remove(
        'bg-white', 'bg-beige', 'bg-beige-dark', 
        'dark:bg-gray-800', 'dark:bg-gray-900', 'dark:bg-gray-700'
      );
    });
    
    // Apply alternating backgrounds
    sections.forEach((section, index) => {
      if (index % 2 === 0) {
        section.classList.add('bg-white', 'dark:bg-gray-800');
      } else {
        section.classList.add('bg-beige', 'dark:bg-gray-900');
      }
    });
  }, [darkMode]);

  return (
    <main className={darkMode ? "dark" : ""}>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      {/* <Reviews /> - Uncomment to add reviews section */}
      <Contact />
      <Footer />
    </main>
  );
}