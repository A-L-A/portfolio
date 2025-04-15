import React, { useState, useEffect, useRef } from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { useTheme } from "../ThemeContext";

const Hero = () => {
  const { darkMode } = useTheme();
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const canvasRef = useRef(null);
  const text = "Web Designer & Developer";

  // Typing animation effect
  useEffect(() => {
    let typingEffect;
    if (index < text.length) {
      typingEffect = setInterval(() => {
        setTypedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
    } else {
      typingEffect = setTimeout(() => {
        setTypedText("");
        setIndex(0);
      }, 3000);
    }

    return () => {
      clearInterval(typingEffect);
      clearTimeout(typingEffect);
    };
  }, [index]);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    
    // Set canvas size to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Different color scheme for dark/light mode
        const opacity = Math.random() * 0.3;
        this.color = darkMode 
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(119, 80, 61, ${opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges with some randomness
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX * (0.9 + Math.random() * 0.2);
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY * (0.9 + Math.random() * 0.2);
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 8), 150);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between particles
      ctx.strokeStyle = darkMode 
        ? 'rgba(255, 255, 255, 0.03)' 
        : 'rgba(119, 80, 61, 0.03)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
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

  // Scroll to next section
  const scrollToNextSection = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 bg-beige dark:bg-gray-900 transition-colors duration-700 relative overflow-hidden"
    >
      {/* Animated background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      <div className="max-w-4xl mx-auto text-center px-6 sm:px-10 py-20 z-10">
        {/* Name with glow effect */}
        <h2 className="text-4xl md:text-6xl py-2 font-bold text-brown dark:text-brown-light font-cursive relative inline-block">
          Lyse A. Aneze
          <span className="absolute -inset-1 bg-brown dark:bg-brown-light opacity-10 blur-2xl rounded-full -z-10"></span>
        </h2>

        {/* Animated text with cursor effect */}
        <h3 className="text-2xl md:text-3xl text-black dark:text-gray-200 font-medium mt-4 tracking-wide relative">
          {typedText}
          <span className={`inline-block w-1 h-8 ml-1 bg-brown dark:bg-gray-200 animate-pulse`}></span>
        </h3>

        {/* Buttons with hover effects */}
        <div className="flex justify-center gap-4 flex-wrap py-6">
          <a
            href="mailto:lyseaaneze@gmail.com"
            className="group bg-brown text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:bg-opacity-90 transition duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Email Me</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          
          <a
            href="#portfolio"
            className="border-2 border-brown text-brown dark:border-brown-light dark:text-brown-light px-6 py-3 rounded-full font-semibold hover:bg-brown hover:text-white dark:hover:bg-brown-light transition duration-300"
          >
            View Portfolio
          </a>
        </div>

        {/* Social Links with animated hover effects */}
        <div className="text-5xl flex justify-center gap-16 py-6 text-gray-600 dark:text-gray-400">
          <a
            href="https://linkedin.com/in/lyseaneze/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-all duration-300 hover:scale-110"
          >
            <AiFillLinkedin className="hover:text-brown dark:hover:text-brown-light transition duration-300" />
          </a>
          
          <a
            href="https://github.com/A-L-A/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-all duration-300 hover:scale-110"
          >
            <AiFillGithub className="hover:text-brown dark:hover:text-brown-light transition duration-300" />
          </a>
        </div>
      </div>

      {/* Scroll down indicator with spacing and better visibility */}
      <div 
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer mt-16 animate-bounce"
      >
        <HiChevronDown className="text-4xl text-brown dark:text-brown-light hover:scale-110 transition-transform duration-300" />
      </div>
    </section>
  );
};

export default Hero;