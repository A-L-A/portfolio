import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const Contact = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Form handling
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formState);
    // Reset form after submission
    setFormState({
      name: "",
      email: "",
      message: ""
    });
    // Show success message
    alert("Message sent successfully!");
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
        this.size = Math.random() * 1.5 + (darkMode ? 0.5 : 1);
        this.speedX = (Math.random() - 0.5) * (darkMode ? 0.15 : 0.3);
        this.speedY = (Math.random() - 0.5) * (darkMode ? 0.15 : 0.3);
        this.blinkSpeed = Math.random() * 0.05 + 0.01;
        this.blink = Math.random() * Math.PI;
        this.maxOpacity = Math.random() * 0.4 + 0.2;
        
        // Colors based on theme
        this.baseColor = darkMode 
          ? `255, 255, 255` // White stars
          : `255, 213, 79`; // Yellow/amber fireflies
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
      const particleCount = darkMode ? 30 : 20; 
      
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

  // Contact info items with icons
  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      label: "Phone",
      value: "+1 (555) 123-4567"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      label: "Email",
      value: "lyseaaneze@gmail.com"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      label: "Location",
      value: "New York, USA"
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-12 px-4 bg-beige dark:bg-gray-900 transition-colors duration-700 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Canvas for stars/fireflies background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10 opacity-40"
      />
      
      {/* Theme-based decorative element */}
      <div className="absolute top-6 left-6 opacity-30">
        {darkMode ? (
          // Stars for dark mode
          <div className="relative">
            <span className="text-2xl text-yellow-100">✦</span>
            <span className="absolute -top-1 -right-3 text-lg text-yellow-100">✧</span>
          </div>
        ) : (
          // Leaves for light mode
          <div className="relative">
            <span className="text-2xl text-green-600">🍃</span>
            <span className="absolute -top-2 -right-3 text-lg text-green-600 opacity-70">🍃</span>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-sm font-medium text-brown dark:text-brown-light uppercase tracking-wider">
            {darkMode ? "✉ " : "📬 "}
            Contact
          </span>
          
          <h2 className="text-2xl md:text-3xl font-bold text-brown dark:text-brown-light mt-2 inline-block relative">
            Get In Touch
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brown dark:bg-brown-light transform scale-x-0 transition-transform duration-500 ease-out origin-left"
              style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto text-sm">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form - Takes 2 columns */}
          <div className={`lg:col-span-2 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brown dark:focus:ring-brown-light focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brown dark:focus:ring-brown-light focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brown dark:focus:ring-brown-light focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="group bg-brown text-white px-5 py-2 text-sm rounded-full font-medium shadow-md hover:bg-opacity-90 transition duration-300 relative overflow-hidden flex items-center"
                  >
                    <span className="relative z-10">Send Message</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Info Card - Takes 1 column */}
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md h-full">
              <h3 className="text-lg font-semibold text-brown dark:text-brown-light mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brown bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-brown dark:text-brown-light">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social links */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">Follow me on</h4>
                <div className="flex space-x-3">
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/lyseaneze/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-brown bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-brown dark:text-brown-light hover:bg-opacity-20 dark:hover:bg-opacity-30 transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  
                  {/* GitHub */}
                  <a 
                    href="https://github.com/A-L-A/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-brown bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-brown dark:text-brown-light hover:bg-opacity-20 dark:hover:bg-opacity-30 transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  
                  {/* Email */}
                  <a 
                    href="mailto:lyseaaneze@gmail.com"
                    className="w-8 h-8 rounded-full bg-brown bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-brown dark:text-brown-light hover:bg-opacity-20 dark:hover:bg-opacity-30 transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Availability indicator */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 relative">
                    <span className="absolute -inset-0.5 bg-green-500 rounded-full animate-ping opacity-75"></span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Available for freelance projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;