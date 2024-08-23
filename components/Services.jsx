import React from "react";
import Image from "next/image";
import design from "../public/design.png";
import code from "../public/code.png";
import consulting from "../public/consulting.png";

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="text-center p-4 sm:p-10 max-w-7xl mx-auto">
        <h3 className="text-3xl py-1">Services</h3>
        <div className="lg:flex gap-6 mt-10">
          <div className="text-center shadow-lg p-6 rounded-xl my-4 flex-1 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center sm:text-left lg:text-center dark:bg-gray-800">
            <div className="sm:w-1/3 lg:w-full mb-4 sm:mb-0 lg:mb-4">
              <Image
                src={design}
                width={100}
                height={100}
                alt="Design icon"
                className="mx-auto"
              />
            </div>
            <div className="sm:w-2/3 lg:w-full">
              <h3 className="text-teal-500 text-xl sm:text-2xl py-2 dark:text-teal-300">
                Modern designs
              </h3>
              <p className="py-2 text-sm sm:text-base dark:text-gray-300">
                Crafting intuitive and visually striking interfaces that
                captivate your audience and enhance user engagement across all
                platforms.
              </p>
              <h4 className="py-4 text-teal-600 text-lg dark:text-teal-400">
                Design Tools:
              </h4>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                Balsamiq
              </p>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                Figma
              </p>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                Canva
              </p>
            </div>
          </div>

          <div className="text-center shadow-lg p-6 rounded-xl my-4 flex-1 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center sm:text-left lg:text-center dark:bg-gray-800">
            <div className="sm:w-1/3 lg:w-full mb-4 sm:mb-0 lg:mb-4">
              <Image
                src={code}
                width={100}
                height={100}
                alt="Code icon"
                className="mx-auto"
              />
            </div>
            <div className="sm:w-2/3 lg:w-full">
              <h3 className="text-teal-500 text-xl sm:text-2xl py-2 dark:text-teal-300">
                Robust Websites
              </h3>
              <p className="py-2 text-sm sm:text-base dark:text-gray-300">
                From responsive websites to complex web applications, I leverage
                cutting-edge technologies to bring your digital vision to life.
              </p>
              <h4 className="py-4 text-teal-600 text-lg dark:text-teal-400">
                Development Tools:
              </h4>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                MERN (MongoDB, Express.js, React.js, Node.js)
              </p>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                WordPress
              </p>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                Drupal
              </p>
            </div>
          </div>

          <div className="text-center shadow-lg p-6 rounded-xl my-4 flex-1 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center sm:text-left lg:text-center dark:bg-gray-800">
            <div className="sm:w-1/3 lg:w-full mb-4 sm:mb-0 lg:mb-4">
              <Image
                src={consulting}
                width={100}
                height={100}
                alt="Consulting icon"
                className="mx-auto"
              />
            </div>
            <div className="sm:w-2/3 lg:w-full">
              <h3 className="text-teal-500 text-xl sm:text-2xl py-2 dark:text-teal-300">
                Maintenance & Optimization
              </h3>
              <p className="py-2 text-sm sm:text-base dark:text-gray-300">
                Providing ongoing support, updates, and performance enhancements
                to keep your digital assets secure, efficient, and ahead of the
                curve.
              </p>
              <h4 className="py-4 text-teal-600 text-lg dark:text-teal-400">
                Maintenance Tools:
              </h4>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                Google Lighthouse
              </p>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                GTmetrix
              </p>
              <p className="text-gray-800 py-1 text-sm sm:text-base dark:text-gray-300">
                Grafana
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
