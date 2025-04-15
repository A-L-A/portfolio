import React, { useEffect, useRef } from "react";
import { BsPaletteFill, BsCodeSlash, BsGearFill } from "react-icons/bs";

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
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

  // Service data with more concise text
  const services = [
    {
      icon: <BsPaletteFill className="text-4xl text-brown dark:text-brown-light" />,
      title: "Website Design",
      description: "Eye-catching, brand-aligned websites that convert visitors into customers.",
      features: ["Responsive layouts", "User-friendly interfaces", "Brand-aligned visuals"],
      gradient: "from-pink-200 via-red-100 to-yellow-100",
      darkGradient: "from-pink-900/20 via-red-900/20 to-yellow-900/20"
    },
    {
      icon: <BsCodeSlash className="text-4xl text-brown dark:text-brown-light" />,
      title: "Web Development",
      description: "Fast, secure, and feature-rich websites tailored to your business needs.",
      features: ["SEO optimization", "Fast-loading pages", "Secure & scalable code"],
      gradient: "from-yellow-100 via-green-100 to-blue-100",
      darkGradient: "from-yellow-900/20 via-green-900/20 to-blue-900/20"
    },
    {
      icon: <BsGearFill className="text-4xl text-brown dark:text-brown-light" />,
      title: "Website Maintenance",
      description: "Keep your website running smoothly with regular updates and support.",
      features: ["Security monitoring", "Performance optimization", "Technical support"],
      gradient: "from-blue-100 via-purple-100 to-pink-100",
      darkGradient: "from-blue-900/20 via-purple-900/20 to-pink-900/20"
    }
  ];

  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center py-20 bg-beige-dark dark:bg-gray-800 transition-colors duration-700"
    >
      <div 
        ref={sectionRef} 
        className="text-center p-4 sm:p-10 max-w-6xl mx-auto reveal-section"
      >
        <h2 className="text-3xl font-bold text-brown dark:text-brown-light mb-4">
          My Services
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
          I transform your ideas into exceptional digital experiences that connect with your audience.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:transform hover:scale-[1.02] transition-all duration-300"
            >
              {/* Gradient background for visual interest */}
              <div className={`w-full h-28 bg-gradient-to-r ${service.gradient} dark:${service.darkGradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md z-10">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-brown dark:text-brown-light mb-3">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                {/* Features as tag-style bullets */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2 justify-center">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="inline-block text-xs bg-brown/10 dark:bg-brown-light/10 text-brown dark:text-brown-light py-1 px-3 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;