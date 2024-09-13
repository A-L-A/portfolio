import React from "react";
import Image from "next/image";
import design from "../public/design.png";
import code from "../public/code.png";
import maintenance from "../public/maintenance.png";

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="text-center p-4 sm:p-10 max-w-7xl mx-auto">
        <h3 className="text-3xl py-1">Services</h3>
        <div className="lg:flex gap-6 mt-10">
          {/* Service 1 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={design}
              width={130}
              height={130}
              alt="Design icon"
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Modern designs
            </h3>
            <p className="py-2 text-sm sm:text-base dark:text-gray-300">
              Crafting intuitive and visually striking interfaces that captivate
              your audience and enhance user engagement across all platforms.
            </p>
            <h4 className="py-4 text-teal-600 text-lg dark:text-teal-400">
              Design Tools:
            </h4>
            <div className="space-y-1">
              {["Balsamiq", "Figma", "Canva"].map((tool) => (
                <p
                  key={tool}
                  className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 transition-all duration-300 hover:bg-teal-600 inline-block">
                  {tool}
                </p>
              ))}
            </div>
          </div>

          {/* Service 2 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={code}
              width={130}
              height={130}
              alt="Code icon"
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Robust Websites
            </h3>
            <p className="py-2 text-sm sm:text-base dark:text-gray-300">
              From responsive websites to complex web applications, I leverage
              cutting-edge technologies to bring your digital vision to life.
            </p>
            <h4 className="py-4 text-teal-600 text-lg dark:text-teal-400">
              Development Tools:
            </h4>
            <div className="space-y-1">
              {["MERN Stack", "WordPress", "Shopify"].map((tool) => (
                <p
                  key={tool}
                  className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 transition-all duration-300 hover:bg-teal-600 inline-block">
                  {tool}
                </p>
              ))}
            </div>
          </div>

          {/* Service 3 */}
          <div className="shadow-lg p-6 rounded-xl dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300">
            <Image
              src={maintenance}
              width={130}
              height={130}
              alt="Consulting icon"
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">
              Maintenance & Optimization
            </h3>
            <p className="py-2 text-sm sm:text-base dark:text-gray-300">
              Providing ongoing support, updates, and performance enhancements
              to keep your digital assets secure, efficient, and user-friendly.
            </p>
            <h4 className="py-4 text-teal-600 text-lg dark:text-teal-400">
              Optimization Tools:
            </h4>
            <div className="space-y-1">
              {["LightHouse", "GT Merix", "Grafana"].map((tool) => (
                <p
                  key={tool}
                  className="text-white py-1 text-sm sm:text-base bg-teal-500 rounded-full px-4 transition-all duration-300 hover:bg-teal-600 inline-block">
                  {tool}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
