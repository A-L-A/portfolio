"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
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

  return (
    <main className={darkMode ? "dark" : ""}>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
