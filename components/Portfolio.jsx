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
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800">
            <Image
              src={web1}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Web Project 1"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              E-commerce Website
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              React, Node.js, MongoDB. Features: user authentication, payment
              integration.
            </p>
            <a
              href="#"
              className="text-teal-500 mt-4 inline-block hover:underline dark:text-teal-300">
              View Project
            </a>
          </div>

          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800">
            <Image
              src={web2}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Web Project 2"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Blog Platform
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              Next.js, GraphQL. Features: comment system, content management.
            </p>
            <a
              href="#"
              className="text-teal-500 mt-4 inline-block hover:underline dark:text-teal-300">
              View Project
            </a>
          </div>

          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800">
            <Image
              src={web3}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Web Project 3"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Task Management App
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              Vue.js, Firebase. Features: real-time updates, collaborative
              tasks.
            </p>
            <a
              href="#"
              className="text-teal-500 mt-4 inline-block hover:underline dark:text-teal-300">
              View Project
            </a>
          </div>

          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800">
            <Image
              src={web4}
              className="rounded-lg object-cover"
              width={500}
              height={300}
              layout="responsive"
              alt="Web Project 4"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Portfolio Website
            </h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              HTML, CSS, JavaScript. Clean, responsive design showcasing
              projects.
            </p>
            <a
              href="#"
              className="text-teal-500 mt-4 inline-block hover:underline dark:text-teal-300">
              View Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
