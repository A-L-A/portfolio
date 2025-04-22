import React, { useRef, useEffect } from "react";
import Image from "next/image";
import web1 from "../public/web1.png";
import web2 from "../public/web2.png";
import web3 from "../public/web3.png";
import web4 from "../public/web4.png";
import { BsArrowUpRight } from "react-icons/bs";

const Portfolio = () => {
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);

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

  const projects = [
    {
      src: web1,
      alt: "Live Music Mapping Platform",
      title: "Live Music Mapping Platform",
      description:
        "MongoDB, Express.js, React.js, Node.js. Features: user authentication, OpenStreetMap API.",
      link: "https://muzika-frontend.onrender.com/",
      category: "Full Stack"
    },
    {
      src: web2,
      alt: "Restaurant Discovery Website",
      title: "Restaurant Discovery Website",
      description:
        "React.js, Chakra UI. Features: Geoapify Places API for location-based restaurant browsing.",
      link: "https://a-l-a.github.io/Restoz/",
      category: "Frontend"
    },
    {
      src: web3,
      alt: "Fashion Store Landing Page",
      title: "Fashion Store Landing Page",
      description:
        "Figma, HTML, CSS. Minimalist design showcasing modern product layout.",
      link: "https://www.figma.com/proto/78BtCYSjD0OYZgd6OJkKTp/SAMPLE-UI-DESIGN-1?node-id=0-1&t=XVm4GNyOiuYziifN-1",
      category: "Design"
    },
    {
      src: web4,
      alt: "Developer Management System Design Thumbnail",
      title: "Real Estate Development Company Management System",
      description:
        "UI/UX Design in Figma. Modern, scalable layout with multi-screen navigation.",
      link: "https://www.figma.com/design/Z60Swac1cjQo120PiTt1ud/Next-Gen-Developers-Management-System-Design-%3Fnode-id%3D1-3",
      category: "Design"
    },
  ];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 transition-all duration-500"
    >
      <div className="text-center p-4 sm:p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-brown dark:text-brown-light mb-4">
          My Projects
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
          Here are some of my recent works that showcase my skills and expertise in web design and development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              className="bg-beige/80 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full 
                         hover:transform hover:scale-[1.02] transition-all duration-300
                         opacity-0 translate-y-8 project-animation"
              style={{transitionDelay: `${index * 150}ms`}}
            >
              {/* Project image with category tag and hover effect */}
              <div className="relative aspect-video overflow-hidden group">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-brown/90 text-white text-xs font-bold py-1 px-3 rounded-full">
                  {project.category}
                </div>
              </div>
              
              {/* Project content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-brown dark:text-brown-light mb-3">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                  {project.description}
                </p>
                
                {/* Project action button - always at bottom */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <a
                    href={project.link}
                    className="inline-flex items-center bg-brown text-white py-2 px-4 rounded-lg hover:bg-brown-dark transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View Project</span>
                    <BsArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom CSS for animations */}
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