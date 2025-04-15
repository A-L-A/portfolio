import React, { useState, useEffect } from 'react';
import { BsFillStarFill, BsArrowLeftCircle, BsArrowRightCircle, BsQuote } from 'react-icons/bs';
import Image from 'next/image';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Sample reviews data - you would replace this with your actual client reviews
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'TechGrowth Inc.',
      image: '/woman1.jpg', // Replace with actual image path
      text: 'Lyse completely transformed our website. The new design not only looks amazing but has significantly improved our conversion rates. Working together was a breeze!',
      rating: 5,
    },
    {
      id: 2,
      name: 'David Chen',
      title: 'Founder',
      company: 'Artisan Café',
      image: '/man1.jpg', // Replace with actual image path
      text: 'Our website now perfectly captures the essence of our brand. Lyse understood exactly what we needed and delivered beyond our expectations. Highly recommend!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Michelle Peters',
      title: 'CEO',
      company: 'Innovative Solutions',
      image: '/woman2.jpg', // Replace with actual image path
      text: 'Working with Lyse was one of the best decisions we made for our business. The website is beautiful, functional, and has been instrumental in our growth.',
      rating: 5,
    },
  ];

  // Navigate to next review
  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Navigate to previous review
  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    
    if (autoplay) {
      interval = setInterval(() => {
        nextReview();
      }, 5000); // Slide every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, currentIndex]);

  // Pause autoplay when user interacts with controls
  const handleManualControl = (callback) => {
    setAutoplay(false); // Pause autoplay
    callback(); // Execute the navigation
    
    // Resume autoplay after a period of inactivity
    setTimeout(() => {
      setAutoplay(true);
    }, 10000); // Resume after 10 seconds of inactivity
  };

  return (
    <section
      id="reviews"
      className="min-h-screen flex items-center justify-center py-20 bg-white dark:bg-gray-900 dark:text-white transition-all duration-500"
    >
      <div className="text-center p-4 sm:p-10 max-w-6xl mx-auto">
        <h2 className="section-heading mb-10">Client Testimonials</h2>
        
        {/* Instructions for getting reviews */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300">
            These reviews are from real clients who were thrilled with their results.
            Want to add your testimonial? Share your feedback via email or connect with me on LinkedIn!
          </p>
        </div>
        
        {/* Reviews carousel */}
        <div className="relative px-6 md:px-10 mt-6">
          {/* Carousel controls - left */}
          <button 
            onClick={() => handleManualControl(prevReview)} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-brown dark:text-brown-light text-3xl hover:scale-110 transition-transform duration-300"
            aria-label="Previous review"
          >
            <BsArrowLeftCircle />
          </button>
          
          {/* Reviews container */}
          <div className="overflow-hidden relative max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              {/* Current review */}
              <div className="bg-beige/50 dark:bg-gray-800/50 rounded-2xl p-6 md:p-10 shadow-lg mx-auto w-full max-w-3xl relative">
                {/* Quote icon */}
                <div className="absolute top-6 left-6 text-brown/20 dark:text-brown-light/20 text-6xl">
                  <BsQuote />
                </div>
                
                <div className="flex flex-col md:flex-row items-center text-left gap-8">
                  {/* Profile image with fallback */}
                  <div className="min-w-[100px]">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-brown/20 dark:bg-brown-light/20 relative">
                      {/* If you have actual images, uncomment this */}
                      {/* <Image 
                        src={reviews[currentIndex].image} 
                        alt={reviews[currentIndex].name}
                        fill
                        className="object-cover"
                      /> */}
                      
                      {/* Fallback - first letter of name */}
                      <div className="flex items-center justify-center h-full text-3xl font-bold text-brown dark:text-brown-light">
                        {reviews[currentIndex].name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Review content */}
                  <div>
                    {/* Rating stars */}
                    <div className="flex mb-3 justify-center md:justify-start">
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <BsFillStarFill key={i} className="text-amber-400" />
                      ))}
                    </div>
                    
                    {/* Review text */}
                    <blockquote className="text-lg italic mb-4 relative z-10">
                      "{reviews[currentIndex].text}"
                    </blockquote>
                    
                    {/* Reviewer info */}
                    <div>
                      <h4 className="font-semibold text-lg text-brown dark:text-brown-light">
                        {reviews[currentIndex].name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reviews[currentIndex].title}, {reviews[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualControl(() => setCurrentIndex(index))}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-brown dark:bg-brown-light w-6' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Carousel controls - right */}
          <button 
            onClick={() => handleManualControl(nextReview)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-brown dark:text-brown-light text-3xl hover:scale-110 transition-transform duration-300"
            aria-label="Next review"
          >
            <BsArrowRightCircle />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;