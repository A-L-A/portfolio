import React, { useState } from "react";
import { BsSend, BsEnvelope, BsPerson, BsChatText } from "react-icons/bs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 bg-beige dark:bg-gray-800 dark:text-white transition-all duration-500"
    >
      <div className="text-center p-4 sm:p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brown dark:text-brown-light mb-4">
          Get In Touch
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
          Have a project in mind or want to say hello? Send me a message and I'll get back to you soon!
        </p>
        
        {/* Form with design harmonized with portfolio section */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300">
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-10 flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
              <p>Thank you for reaching out. I'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 text-left">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                  <BsPerson />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="py-3 pl-10 w-full rounded-lg bg-beige/30 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                  <BsEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="py-3 pl-10 w-full rounded-lg bg-beige/30 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200"
                />
              </div>
              
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none text-brown/70 dark:text-brown-light/70">
                  <BsChatText />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  rows={5}
                  className="py-3 pl-10 w-full rounded-lg bg-beige/30 dark:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-brown/30 dark:focus:ring-brown-light/30 transition-all duration-300 text-gray-800 dark:text-gray-200"
                ></textarea>
              </div>
              
              {/* Button styled to match portfolio */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center bg-brown text-white py-2 px-6 rounded-lg hover:bg-brown-dark transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <BsSend className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;