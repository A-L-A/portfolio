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
      className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="text-center p-4 sm:p-10 max-w-7xl mx-auto">
        <h3 className="text-3xl py-1">Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Project 1 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={web1}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Live Music Mapping Platform"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Live Music Mapping Platform
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              MongoDB, Express.js, React.js, Node.js. Features: user
              authentication, Openstreet Map API.
            </p>
            <a
              href="https://muzika-frontend.onrender.com/"
              className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 mt-4 inline-block transition-all duration-300 hover:bg-teal-600"
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>

          {/* Project 2 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={web2}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Restaurant Discovery Website"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Restaurant Discovery Website
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              React.js, Chackra UI. Features: Geoapify Places API.
            </p>
            <a
              href="https://a-l-a.github.io/Restoz/"
              className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 mt-4 inline-block transition-all duration-300 hover:bg-teal-600"
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>

          {/* Project 3 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={web3}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Fashion Store Landing Page"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Fashion Store Landing Page
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              Figma, HTML, CSS. Minimalist Design showcasing project.
            </p>
            <a
              href="https://www.figma.com/proto/78BtCYSjD0OYZgd6OJkKTp/SAMPLE-UI-DESIGN-1?node-id=0-1&t=XVm4GNyOiuYziifN-1"
              className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 mt-4 inline-block transition-all duration-300 hover:bg-teal-600"
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>

          {/* Project 4 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={web4}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Tinder for Dogs Demo Site"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Tinder for Dogs Demo Site
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              HTML, CSS, Bootstrap. Clean responsive design.
            </p>
            <a
              href="https://a-l-a.github.io/Tindogsite/"
              className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 mt-4 inline-block transition-all duration-300 hover:bg-teal-600"
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
