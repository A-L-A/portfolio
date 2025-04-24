import React, { useState, useEffect, useRef } from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { useTheme } from "../ThemeContext";
import { setupParticles } from "../utils/particle";

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

  // Star animation with particle effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    
    // Define custom particle animation (without using the utility)
    let animationFrameId;
    let celestialObjects = [];
    
    // Star class with sparkle effects
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.twinkle = Math.random() * Math.PI;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.08;
        this.particles = [];
        this.sparkleTimer = 0;
        this.sparkleInterval = Math.random() * 200 + 100;
        
        const baseOpacity = Math.random() * 0.5 + 0.3;
        this.maxOpacity = baseOpacity; 
        this.baseColor = darkMode ? "255, 255, 255" : "119, 80, 61";
        this.color = `rgba(${this.baseColor}, ${baseOpacity})`;
      }

      createParticle() {
        if (this.particles.length < 4 && Math.random() > 0.7) {
          this.particles.push({
            x: this.x,
            y: this.y,
            size: this.size * 0.4,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            life: 30 + Math.random() * 20
          });
        }
      }

      update() {
        // Twinkle effect
        this.twinkle += this.twinkleSpeed;
        const opacityFactor = (Math.sin(this.twinkle) + 1) / 2;
        this.color = `rgba(${this.baseColor}, ${this.maxOpacity * opacityFactor})`;
        
        // Move star
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        
        // Create occasional particles
        this.sparkleTimer++;
        if (this.sparkleTimer > this.sparkleInterval) {
          this.createParticle();
          this.sparkleTimer = 0;
          this.sparkleInterval = Math.random() * 200 + 100;
        }
        
        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.life--;
          
          if (p.life <= 0) {
            this.particles.splice(i, 1);
          }
        }
      }

      draw() {
        // Draw star as a four-pointed star shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Draw four-pointed star
        const spikes = 4;
        const outerRadius = this.size;
        const innerRadius = this.size / 2;
        
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / spikes) * i;
          
          const x = this.x + Math.cos(angle) * radius;
          const y = this.y + Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Draw particles
        this.particles.forEach(p => {
          const opacity = p.life / 50;
          ctx.fillStyle = `rgba(${this.baseColor}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    // Initialize stars
    const init = () => {
      celestialObjects = [];
      const starCount = Math.min(Math.floor(window.innerWidth / 5), 240);
      
      for (let i = 0; i < starCount; i++) {
        celestialObjects.push(new Star());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      celestialObjects.forEach(obj => {
        obj.update();
        obj.draw();
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

  // Smooth scroll to next section
  const scrollToNextSection = () => {
    const servicesSection = document.getElementById('services');
    
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      
      const servicesNavItem = document.querySelector('nav a[href="#services"]');
      if (servicesNavItem) {
        document.querySelectorAll('nav a').forEach(item => {
          item.classList.remove('active');
        });
        
        servicesNavItem.classList.add('active');
      }
    }
  };

  // Add scroll event listener to handle nav highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById('services');
      if (!servicesSection) return;
      
      const sectionTop = servicesSection.offsetTop;
      const sectionHeight = servicesSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const servicesNavItem = document.querySelector('nav a[href="#services"]');
        if (servicesNavItem) {
          document.querySelectorAll('nav a').forEach(item => {
            item.classList.remove('active');
          });
          
          servicesNavItem.classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 bg-beige dark:bg-gray-900 transition-colors duration-700 relative overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      <div className="max-w-4xl mx-auto text-center px-6 sm:px-10 py-16 z-10">
        <h2 className="text-3xl md:text-5xl py-2 font-bold text-brown dark:text-brown-light font-cursive relative inline-block">
          Lyse A. Aneze
          <span className="absolute -inset-1 bg-brown dark:bg-brown-light opacity-10 blur-2xl rounded-full -z-10"></span>
        </h2>

        <h3 className="text-xl md:text-2xl text-black dark:text-gray-200 font-medium mt-3 tracking-wide relative">
          {typedText}
          <span className={`inline-block w-1 h-6 ml-1 bg-brown dark:bg-gray-200 animate-pulse`}></span>
        </h3>

        <div className="flex justify-center gap-4 flex-wrap py-4 mt-2">
          <a
            href="mailto:lyseaaneze@gmail.com"
            className="group bg-brown text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:bg-opacity-90 transition duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Email Me</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          
          <a
            href="#portfolio"
            className="border-2 border-brown text-brown dark:border-brown-light dark:text-brown-light px-5 py-2 rounded-full font-semibold hover:bg-brown hover:text-white dark:hover:bg-beige-light transition duration-300"
          >
            View Portfolio
          </a>
        </div>

        <div className="text-4xl flex justify-center gap-12 py-4 text-gray-600 dark:text-gray-400">
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

      {/* Blinking down arrow scroll indicator */}
      <div 
        onClick={scrollToNextSection}
        className="absolute left-0.55 bottom-10 transform -translate-x-1/2 cursor-pointer animate-bounce flex flex-col items-center gap-2 focus:outline-none"
        aria-label="Scroll to services section"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-brown dark:text-brown-light hover:scale-110 transition-transform duration-300"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;