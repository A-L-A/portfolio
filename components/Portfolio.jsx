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
      description:
        "MERN stack application with user authentication and OpenStreetMap integration for interactive mapping.",
      link: "https://muzika-frontend.onrender.com/",
      category: "Full Stack"
    },
    {
      src: web2,
      alt: "Restaurant Discovery Website",
      title: "Restaurant Discovery Website",
      description:
        "React application with Chakra UI and Geoapify Places API for location-based restaurant discovery.",
      link: "https://a-l-a.github.io/Restoz/",
      category: "Frontend"
    },
    {
      src: web3,
      alt: "Fashion Store Landing Page",
      title: "Fashion Store Landing Page",
      description:
        "Clean, minimalist design in Figma with modern layout and visual hierarchy for a fashion brand.",
      link: "https://www.figma.com/proto/78BtCYSjD0OYZgd6OJkKTp/SAMPLE-UI-DESIGN-1?node-id=0-1&t=XVm4GNyOiuYziifN-1",
      category: "Design"
    },
    {
      src: web4,
      alt: "Real Estate Management System",
      title: "Real Estate Management System",
      description:
        "Custom UI design system in Figma with multi-screen navigation for real estate development management.",
      link: "https://www.figma.com/design/Z60Swac1cjQo120PiTt1ud/Next-Gen-Developers-Management-System-Design-%3Fnode-id%3D1-3",
      category: "Design"
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
              className="bg-beige/80 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col hover:transform hover:scale-[1.05] transition-all duration-300 opacity-0 translate-y-8 project-animation relative h-[400px] w-full sm:w-80 lg:w-96"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-video overflow-hidden group">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 bg-brown/90 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {project.category}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-semibold text-brown dark:text-brown-light mb-2 line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto pt-2 border-t border-gray-100 dark:border-transparent">
                  <a
                    href={project.link}
                    className="inline-flex items-center bg-brown text-white py-2 px-4 rounded text-sm hover:bg-opacity-90 transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View Project</span>
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
          transform: translateY(20px);
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