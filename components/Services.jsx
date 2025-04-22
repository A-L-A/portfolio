import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";

const Services = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Consolidated services data with icons - combining into 3 main categories
  const services = [
    {
      title: "Web Design",
      description: "Creating beautiful, responsive websites with intuitive user interfaces and engaging user experiences that drive results and delight visitors.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      ),
      items: ["Responsive Design", "UI/UX Development", "Brand Integration", "Interactive Prototypes"]
    },
    {
      title: "Web Development",
      description: "Building modern, high-performance web applications with the latest technologies that are secure, scalable, and optimized for all devices.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      items: ["Frontend Development", "Backend Integration", "E-commerce Solutions", "Content Management"]
    },
    {
      title: "Optimization & SEO",
      description: "Enhancing your website's performance and visibility with speed optimizations, search engine best practices, and conversion-focused improvements.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      items: ["Performance Tuning", "SEO Optimization", "Analytics Setup", "Speed Improvements"]
    }
  ];

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Subtle stars/fireflies animation based on theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    
    // Adjust canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class (stars for dark mode, fireflies for light)
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + (darkMode ? 0.5 : 1);
        this.speedX = (Math.random() - 0.5) * (darkMode ? 0.15 : 0.3);
        this.speedY = (Math.random() - 0.5) * (darkMode ? 0.15 : 0.3);
        this.blinkSpeed = Math.random() * 0.05 + 0.01;
        this.blink = Math.random() * Math.PI;
        this.maxOpacity = Math.random() * 0.5 + 0.3;
        
        // Colors based on theme
        this.baseColor = darkMode 
          ? `255, 255, 255` // White stars
          : `143, 202, 82`; // Green fireflies
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Blinking/pulsing effect
        this.blink += this.blinkSpeed;
        const opacityFactor = (Math.sin(this.blink) + 1) / 2;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        this.color = `rgba(${this.baseColor}, ${this.maxOpacity * opacityFactor})`;
      }

      draw() {
        ctx.beginPath();
        
        if (darkMode) {
          // Draw stars in dark mode
          ctx.fillStyle = this.color;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw fireflies in light mode with glow
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
          );
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, `rgba(${this.baseColor}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const particleCount = darkMode ? 40 : 25; // Fewer fireflies
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-700 relative overflow-hidden"
    >
      {/* Canvas for stars/fireflies background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10 opacity-60"
      />
      
      {/* Theme-based decorative elements */}
      <div className="absolute top-6 right-6 opacity-30">
        {darkMode ? (
          // Moon and stars for dark mode
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-yellow-100 shadow-lg"></div>
            <div className="absolute -top-1 left-1 w-7 h-7 rounded-full bg-gray-800"></div>
          </div>
        ) : (
          // Sun for light mode
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-yellow-400 shadow-lg"></div>
            <div className="absolute inset-0 opacity-70">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-6 h-1 bg-yellow-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(7px)` }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Modern visual heading with floating elements */}
        <div className="text-center mb-12 relative">
          <div className="text-sm font-medium text-brown dark:text-brown-light uppercase tracking-wider">What I Offer
          
          
            {/* Floating decorative elements */}
            <span className="absolute -top-3 -left-4 text-3xl text-brown dark:text-brown-light opacity-20 animate-pulse" style={{ animationDuration: '3s' }}>
              {darkMode ? '✧' : '☼'}
            </span>
            <span className="absolute -bottom-2 -right-4 text-2xl text-brown dark:text-brown-light opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              {darkMode ? '✦' : '❀'}
            </span>
            </div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Comprehensive design and development solutions to bring your digital vision to life.
          </p>
        </div>

        {/* Three card layout with enhanced visual elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-beige dark:bg-gray-700 rounded-lg p-6 shadow-md 
                         transform transition-all duration-700 hover:scale-105 hover:shadow-lg
                         flex flex-col items-center text-center relative
                         ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transitionProperty: 'transform, opacity, translate',
              }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-20 h-20 bg-brown dark:bg-brown-light opacity-10 rotate-45 transform origin-bottom-left`}></div>
              </div>
              
              <div className={`text-brown dark:text-brown-light transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-0'}`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-brown dark:text-brown-light mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {service.description}
              </p>
              
              {/* Interactive tag cloud */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 mt-2">
                {service.items.map((item, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-300 cursor-pointer
                              ${hoveredTag === `${index}-${i}` 
                                ? 'bg-brown dark:bg-brown-light text-white scale-105' 
                                : 'bg-brown/10 dark:bg-brown-light/10 text-brown dark:text-brown-light'}`}
                    onMouseEnter={() => setHoveredTag(`${index}-${i}`)}
                    onMouseLeave={() => setHoveredTag(null)}
                  >
                    {item}
                  </span>
                ))}
              </div>
              
              {/* Visual card footer */}
              <div className="w-full mt-auto">
                <div className="w-12 h-1 bg-brown dark:bg-brown-light rounded-full mx-auto mb-4 opacity-60"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced call-to-action button */}
        <div className="text-center mt-10">
          <button
            onClick={scrollToContact}
            className="group bg-brown text-white px-6 py-3 rounded-full font-medium shadow-md hover:scale-105 hover:bg-opacity-90 transition-all duration-300 relative overflow-hidden inline-flex items-center"
          >
            <span className="relative z-10">Got Specific Questions?</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;