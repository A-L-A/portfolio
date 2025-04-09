import React from "react";
import Image from "next/image";
import web1 from "../public/web1.png";
import web2 from "../public/web2.png";
import web3 from "../public/web3.png";
import web4 from "../public/web4.png";


const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white"
    >
      <div className="text-center p-4 sm:p-10 max-w-6xl mx-auto">
        <h3 className="text-3xl py-1">Portfolio</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Portfolio Item Template */}
          {[
            {
              src: web1,
              alt: "Live Music Mapping Platform",
              title: "Live Music Mapping Platform",
              description:
                "MongoDB, Express.js, React.js, Node.js. Features: user authentication, OpenStreetMap API.",
              link: "https://muzika-frontend.onrender.com/",
            },
            {
              src: web2,
              alt: "Restaurant Discovery Website",
              title: "Restaurant Discovery Website",
              description:
                "React.js, Chakra UI. Features: Geoapify Places API for location-based restaurant browsing.",
              link: "https://a-l-a.github.io/Restoz/",
            },
            {
              src: web3,
              alt: "Fashion Store Landing Page",
              title: "Fashion Store Landing Page",
              description:
                "Figma, HTML, CSS. Minimalist design showcasing modern product layout.",
              link: "https://www.figma.com/proto/78BtCYSjD0OYZgd6OJkKTp/SAMPLE-UI-DESIGN-1?node-id=0-1&t=XVm4GNyOiuYziifN-1",
            },
            {
              src: web4,
              alt: "Developer Management System Design Thumbnail",
              title: "Real Estate Development Company Management System",
              description:
                "UI/UX Design in Figma. Modern, scalable layout with multi-screen navigation.",
              link: "https://www.figma.com/design/Z60Swac1cjQo120PiTt1ud/Next-Gen-Developers-Management-System-Design-%3Fnode-id%3D1-3",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="shadow-lg p-6 pt-8 rounded-2xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300"
            >
              <div className="relative w-full aspect-video overflow-hidden rounded-lg group">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 dark:text-white">
                {project.title}
              </h3>
              <p className="text-sm mt-2 dark:text-gray-300">
                {project.description}
              </p>
              <a
                href={project.link}
                className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 mt-4 inline-block transition-all duration-300 hover:bg-teal-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
