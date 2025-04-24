import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  
  // Form state management
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  
  // Form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Form handling
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ""
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    
    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Please enter a valid email";
    }
    
    // Phone validation - only validate if something is entered (since it's optional)
    if (formState.phone.trim() && !/^[\d\+\-\(\) ]{7,15}$/.test(formState.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!formState.subject.trim()) {
      errors.subject = "Subject is required";
    }
    
    if (!formState.message.trim()) {
      errors.message = "Message is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Add current timestamp to the form data
      const templateParams = {
        name: formState.name,
        email: formState.email,
        phone: formState.phone || "Not provided",
        subject: formState.subject,
        message: formState.message,
        date: new Date().toLocaleString()
      };
      
      // EmailJS integration
      await emailjs.send(
        'service_3qn7hcs',  
        'template_uk2x3k2', 
        templateParams,
        'UeK8qa1luww8pzLsM'  
      );
      setIsSubmitted(true);
      
      // Reset form state after submission
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("There was an error sending your message. Please try again or contact me directly at lyseaaneze@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Background particles animation
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

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinkle = Math.random() * Math.PI;
        
        // Colors based on theme
        this.baseColor = darkMode 
          ? [220, 220, 240] // More visible blue-white for dark mode stars
          : [119, 80, 61]; // Brown for light mode
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Twinkle effect
        this.twinkle += this.twinkleSpeed;
        const twinkleFactor = (Math.sin(this.twinkle) + 1) / 2;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Dynamic color with twinkle
        const o = this.opacity * (0.6 + twinkleFactor * 0.4);
        this.color = `rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, ${o})`;
      }

      draw() {
        ctx.beginPath();
        
        if (darkMode) {
          // Draw a star shape in dark mode
          const outerRadius = this.size;
          const innerRadius = this.size / 2;
          const spikes = 4;
          
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            
            const x = this.x + Math.cos(angle) * radius;
            const y = this.y + Math.sin(angle) * radius;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          // Draw a simple dot in light mode
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const particleCount = darkMode ? 50 : 35; // More stars in dark mode
      
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
      id="contact" 
      ref={sectionRef}
      className="py-16 px-4 transition-colors duration-700 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Enhanced background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10 opacity-70"
      />
      
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
        {darkMode ? (
          // Star pattern for dark mode
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-brown-light w-full h-full">
            <path d="M50 10 L55 35 L80 35 L60 50 L70 75 L50 60 L30 75 L40 50 L20 35 L45 35 Z" fill="currentColor" opacity="0.5" />
            <path d="M20 15 L22 25 L30 25 L23 30 L26 40 L20 35 L14 40 L17 30 L10 25 L18 25 Z" fill="currentColor" opacity="0.7" />
            <path d="M75 20 L77 28 L85 28 L78 33 L81 41 L75 36 L69 41 L72 33 L65 28 L73 28 Z" fill="currentColor" opacity="0.6" />
          </svg>
        ) : (
          // Leaf pattern for light mode
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-brown w-full h-full">
            <path d="M20,80 Q50,40 80,80" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" transform="rotate(180 50 50)" />
            <path d="M30,70 Q50,30 70,70" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" transform="rotate(180 50 50)" />
            <path d="M40,60 Q50,20 60,60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" transform="rotate(180 50 50)" />
            <ellipse cx="80" cy="20" rx="5" ry="3" fill="currentColor" opacity="0.5" />
            <ellipse cx="70" cy="30" rx="4" ry="2" fill="currentColor" opacity="0.6" />
            <ellipse cx="60" cy="40" rx="3" ry="2" fill="currentColor" opacity="0.7" />
          </svg>
        )}
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {/* Heading with consistent styling */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brown dark:text-brown-light relative inline-block">
            Get In Touch
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brown dark:bg-brown-light"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </div>

        {/* Contact form card */}
        <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-beige/80 dark:bg-gray-700 rounded-lg p-8 shadow-md w-full max-w-xl mx-auto mt-10 relative overflow-hidden">
            
            {/* Success message that appears after form submission */}
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300">Your message has been sent successfully.</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1">I'll get back to you soon.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="mt-6 bg-brown text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-opacity-90 transition duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Form fields */
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={`py-3 pl-10 w-full rounded-lg bg-white/60 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200 ${formErrors.name ? 'border-2 border-red-500' : ''}`}
                    />
                    <span className="absolute top-3 right-3 text-pink-500">*</span>
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className={`py-3 pl-10 w-full rounded-lg bg-white/60 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200 ${formErrors.email ? 'border-2 border-red-500' : ''}`}
                    />
                    <span className="absolute top-3 right-3 text-pink-500">*</span>
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                
                {/* Phone number field (optional) */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="Your phone (optional)"
                    className={`py-3 pl-10 w-full rounded-lg bg-white/60 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200 ${formErrors.phone ? 'border-2 border-red-500' : ''}`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
              
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="4" y1="9" x2="20" y2="9"></line>
                      <line x1="4" y1="15" x2="20" y2="15"></line>
                      <line x1="10" y1="3" x2="8" y2="21"></line>
                      <line x1="16" y1="3" x2="14" y2="21"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    autoComplete="off"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className={`py-3 pl-10 w-full rounded-lg bg-white/60 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200 ${formErrors.subject ? 'border-2 border-red-500' : ''}`}
                  />
                  <span className="absolute top-3 right-3 text-pink-500">*</span>
                  {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
                </div>
                
                <div className="relative">
                  <div className="absolute top-3 left-0 flex items-start pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <textarea
                    name="message"
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    rows="4"
                    className={`py-3 pl-10 w-full rounded-lg bg-white/60 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200 resize-none ${formErrors.message ? 'border-2 border-red-500' : ''}`}
                  ></textarea>
                  <span className="absolute top-3 right-3 text-pink-500">*</span>
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>
                
                {/* Error message display */}
                {submitError && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
                    {submitError}
                  </div>
                )}
                
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brown text-white px-6 py-3 rounded-full font-medium shadow-md hover:scale-105 hover:bg-opacity-90 transition duration-300 relative overflow-hidden flex items-center group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    {!isSubmitting && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                      </svg>
                    )}
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </button>
                </div>
              </form>
            )}
            
            {/* Visual accent line */}
            <div className="w-12 h-1 bg-brown dark:bg-brown-light rounded-full mx-auto mt-6 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;