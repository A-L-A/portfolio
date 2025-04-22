import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "../ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Subtle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    
    // Draw flowing lines
    const lines = [];
    const lineCount = Math.floor(canvas.width / 100);
    
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 30 + 10,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.5 + 0.1) * (darkMode ? 0.7 : 1),
        thickness: Math.random() * 1 + 0.5,
        color: darkMode 
          ? `rgba(255, 255, 255, ${Math.random() * 0.04 + 0.01})` 
          : `rgba(119, 80, 61, ${Math.random() * 0.04 + 0.01})`
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach(line => {
        // Update position
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;
        
        // Randomly change angle slightly
        line.angle += (Math.random() - 0.5) * 0.05;
        
        // Wrap around edges
        if (line.x < 0) line.x = canvas.width;
        if (line.x > canvas.width) line.x = 0;
        if (line.y < 0) line.y = canvas.height;
        if (line.y > canvas.height) line.y = 0;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.thickness;
        ctx.stroke();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-700 relative overflow-hidden">
      {/* Subtle animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10"
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Top section with logo and socials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and brief intro */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-brown dark:text-brown-light font-cursive">
              Lyse A. Aneze
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Web Designer & Developer creating beautiful, functional websites that help businesses grow online.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://linkedin.com/in/lyseaneze/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://github.com/A-L-A/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="mailto:lyseaaneze@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">About</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">Services</a></li>
              <li><a href="#portfolio" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">Portfolio</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">Contact</a></li>
            </ul>
          </div>
          
          {/* Services summary */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">Web Design</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">Web Development</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">UI/UX Design</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-brown-light transition duration-300">SEO Optimization</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright and "back to top" button - properly aligned */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright text with theme-based icon */}
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              {darkMode ? (
                <span className="mr-2 text-yellow-200 opacity-70">✧</span>
              ) : (
                <span className="mr-2 text-amber-600 opacity-70">☀</span>
              )}
              <span>Designed with care by Lyse A. Aneze © {currentYear}</span>
            </span>
          </div>
          
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-brown dark:text-brown-light hover:opacity-80 transition duration-300 flex items-center"
            aria-label="Back to top"
          >
            <span className="text-sm mr-2">Back to top</span>
            <div className="relative">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'transform -translate-y-1' : ''}`}
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              {isHovered && (
                <span className="absolute h-6 w-px bg-brown dark:bg-brown-light opacity-50 left-1/2 transform -translate-x-1/2 -bottom-1"></span>
              )}
            </div>
          </button>
        </div>
        
        {/* Theme indicator that appears on the bottom right */}
        <div className="absolute bottom-4 right-4 opacity-30">
          {darkMode ? (
            <div className="text-yellow-200 flex items-center">
              <span className="text-xl">✦</span>
              <span className="text-sm ml-1">Night</span>
            </div>
          ) : (
            <div className="text-amber-600 flex items-center">
              <span className="text-xl">☀</span>
              <span className="text-sm ml-1">Day</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;