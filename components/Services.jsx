import React, { useEffect, useRef } from "react";
import { BsPaletteFill, BsCodeSlash, BsGearFill } from "react-icons/bs";
import { useTheme } from "../ThemeContext";

const Services = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      },
      { threshold: 0.1 }
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
  
  // Star animation effect using inline implementation
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

  // Service data with more concise text and desired visual styling
  const services = [
    {
      icon: <BsPaletteFill className="text-4xl text-brown dark:text-brown-light" />,
      title: "Web Design",
      description: "Visually stunning sites that turn visitors into loyal customers.",
      features: ["Responsive Designs", "Brand Identity", "UX-Driven"],
      gradient: "from-pink-200 via-red-100 to-yellow-100",
      darkGradient: "from-pink-900/30 via-red-900/30 to-yellow-900/30"
    },
    {
      icon: <BsCodeSlash className="text-3xl text-brown dark:text-brown-light" />,
      title: "Web Development",
      description: "Custom-built sites using Code, WordPress, or Shopify—AI-powered for optimal performance & scalability.",
      features: ["Content Management", "Automation", "SEO Ready"],
      gradient: "from-yellow-100 via-green-100 to-blue-100",
      darkGradient: "from-yellow-900/30 via-green-900/30 to-blue-900/30"
    },
    {
      icon: <BsGearFill className="text-4xl text-brown dark:text-brown-light" />,
      title: "Maintenance & Performance",
      description: "Proactive site updates, speed, and security—automated for hassle-free management.",
      features: ["Speed Optimization", "Auto-Updates", "Analytics"],
      gradient: "from-blue-100 via-purple-100 to-pink-100",
      darkGradient: "from-blue-900/30 via-purple-900/30 to-pink-900/30"
    }
  ];

  return (
    <section
      id="services"
      className="py-16 flex items-center justify-center transition-colors duration-700 relative overflow-hidden"
    >
      {/* Star background animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10 opacity-70"
      />
      
      <div 
        ref={sectionRef} 
        className="text-center p-4 sm:p-8 max-w-6xl mx-auto reveal-section z-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-brown dark:text-brown-light relative inline-block">
          What I Offer
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brown dark:bg-brown-light"></span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base max-w-xl mx-auto mb-10">
          Simplifying digital experiences so your brand can stand out online
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {services.map((service, index) => (
            <div 
              key={index}
              className="rounded-2xl shadow-xl bg-white dark:bg-gray-900 overflow-hidden group transition-all duration-300 flex flex-col hover:scale-105 h-[380px]"
            >
              {/* Gradient background for visual interest */}
              <div className={`h-36 bg-gradient-to-r ${service.gradient} dark:${service.darkGradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg z-10 hover:rotate-6 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow group-hover:bg-gray-50 dark:group-hover:bg-gray-800 transition-all">
                <h3 className="text-lg font-semibold text-brown dark:text-brown-light mb-2">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                
                {/* Features as tag-style bullets */}
                <div className="mt-auto flex flex-wrap gap-2 justify-center">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="inline-block text-xs px-3 py-1 rounded-full text-brown dark:text-brown-light bg-brown/10 dark:bg-brown-light/10 hover:bg-brown/25 dark:hover:bg-brown-light/25 transition-colors duration-200 cursor-pointer"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative bg-brown text-white px-7 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center"
          >
            <span className="relative z-10">Learn More 👇</span>
            <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;