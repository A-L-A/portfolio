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

export default function Home() {
  const { darkMode } = useTheme();
  
  // Global scroll observer for section animations
  useEffect(() => {
    // Function to handle intersection observations for section animations
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    // Set up the intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      threshold: 0.15, // 15% of the section must be visible
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before section comes into view
    });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      // Clean up observer
      if (observer) {
        document.querySelectorAll('section').forEach(section => {
          observer.unobserve(section);
        });
      }
    };
  }, []);

  // Add global CSS for alternating section backgrounds
  useEffect(() => {
    // Function to apply alternating backgrounds to sections
    const applySectionBackgrounds = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        // Remove any existing background classes
        section.classList.remove('bg-beige', 'bg-beige-dark', 'dark:bg-gray-800', 'dark:bg-gray-900');
        
        // Apply alternating backgrounds
        if (index % 2 === 0) {
          section.classList.add('bg-beige', 'dark:bg-gray-900');
        } else {
          section.classList.add('bg-beige-dark', 'dark:bg-gray-800');
        }
      });
    };
    
    applySectionBackgrounds();
    
    // Also apply when dark mode changes
    return () => {
      applySectionBackgrounds();
    };
  }, [darkMode]);

  return (
    <main className={darkMode ? "dark" : ""}>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      {/* <Reviews /> */}
      <Contact />
      <Footer />
      
      {/* Global styles for animations and section transitions */}
      <style jsx global>{`
        /* Section entry animations */
        section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Smooth transitions between sections */
        section {
          transition: background-color 0.5s ease;
        }
        
        /* Additional animation for card entry effects */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}