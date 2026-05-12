import React, { useRef, useEffect } from "react";
import Image from "next/image";
import web1 from "../public/web1.png";
import web2 from "../public/web2.png";
import web3 from "../public/web3.png";
import web4 from "../public/web4.png";
import { useTheme } from "../ThemeContext";

const Portfolio = () => {
  const { darkMode } = useTheme();
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Standardized project descriptions
  const projects = [
    {
      src: web1,
      alt: "Live Music Mapping Platform",
      title: "Live Music Mapping Platform",
      description: "Honours capstone project. Music lovers struggle to discover live shows nearby. Built a map-based platform for discovery by location, date, and genre. (Literature review + working prototype)",
      demoLink: "https://muzika-frontend.onrender.com/",
      caseStudyLink: "https://docs.google.com/presentation/d/1e3YcOrYom8AjMCjCKBPByU6aMQpVRMOcFdDfRFiaF0o/edit?usp=sharing", 
      category: "Research / Full Stack"
    },
    {
      src: web2, 
      alt: "BeReal Product Management Externship",
      title: "BeReal Product Externship",
      description: "Analyzed declining active user metrics and sentiments to identify key friction point. Designed solution feature concept. Pitched recommendation with success metrics.",
      demoLink: "https://www.figma.com/proto/eLwVKDeBHRgnnHPJR5Bzk4/BEREALQUICK-REPLY-FEATURE?node-id=7-342&t=Jj3LgNEJv8rKpd7p-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A342", 
      caseStudyLink: "https://docs.google.com/presentation/d/1AZ4t5I7dsUaMYIMDHAJ6f02LoYBPM51J1zjgmxioIpA/edit?usp=sharing",
      category: "Product Strategy & Design"
    },
    {
      src: web4,
      alt: "Real Estate Management System",
      title: "Real Estate Management System",
      description: "Custom UI design system in Figma for property development tracking and management",
      demoLink: "https://www.figma.com/design/Z60Swac1cjQo120PiTt1ud/Next-Gen-Developers-Management-System-Design-%3Fnode-id%3D1-3",
      caseStudyLink: "",
      category: "Product Design"
    },
  ];

  // Add animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Animate projects with staggered delay
          projectRefs.current.forEach((project, index) => {
            if (project) {
              setTimeout(() => {
                project.classList.add("project-visible");
              }, 150 * index);
            }
          });
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
      const particleCount = darkMode ? 50 : 35;

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

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-16 flex items-center justify-center transition-all duration-500 relative overflow-hidden"
    >
      {/* Enhanced background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 opacity-70"
      />

      <div className="text-center p-4 sm:p-8 max-w-7xl mx-auto z-10 place-items-center">
        {/* Heading with consistent styling */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-2xl font-bold text-brown dark:text-brown-light relative inline-block">
            Projects
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brown dark:bg-brown-light"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Explore some of my recent work.
          </p>
        </div>

        {/* Project Flexbox Cards */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className="bg-beige/80 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col hover:transform hover:scale-[1.05] transition-all duration-300 opacity-0 translate-y-8 project-animation relative h-auto min-h-[480px] w-full sm:w-80 lg:w-96"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image Section - 4:3 ratio */}
              <div className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge - Bottom left */}
                <div className="absolute bottom-2 left-2 bg-brown/90 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {project.category}
                </div>
              </div>

              {/* Content Section - Left aligned */}
              <div className="p-4 flex flex-col flex-grow text-left">
                <h3 className="text-lg font-semibold text-brown dark:text-brown-light mb-2 line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-4">
                  {project.description}
                </p>

                {/* Buttons Section - Stacked (Case Study Primary, Demo Secondary) */}
                <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-600">
                  {/* Primary Button - Case Study */}
                  {project.caseStudyLink && project.caseStudyLink !== "" && (
                    <a
                      href={project.caseStudyLink}
                      className="flex items-center justify-center bg-brown text-white py-2 px-4 rounded-md text-sm hover:bg-opacity-90 transition-all duration-300 group w-full mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Case Study</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                  
                  {/* Secondary Button - Live Demo */}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      className="flex items-center justify-center bg-transparent border border-brown/50 text-brown dark:text-brown-light py-1.5 px-4 rounded-md text-xs hover:bg-brown/10 transition-all duration-300 w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live Demo ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .project-animation {
          opacity: 0;
          transform: translateY(2rem);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .project-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default Portfolio;