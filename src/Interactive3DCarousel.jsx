import React, { useState, useEffect } from 'react';
import './Interactive3DCarousel.css';

const Interactive3DCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 0,
      subtitle: "~ What guides us",
      title: "We play the long game with urgency",
      description: "Patience, discipline, and vision to bring new transformational medicines to life.",
      image: "/mainPic.png"
    },
    {
      id: 1,
      subtitle: "~ What guides us", 
      title: "We are relentless truth-seekers",
      description: "Our seed-led investment model uncovers the most promising opportunities.",
      image: "/img2.png"
    },
    {
      id: 2,
      subtitle: "~ What guides us",
      title: "We understand the power of community",
      description: "We prioritize a collaborative, science-first, patient-centric culture.",
      image: "/img3.png"
    },
    {
      id: 3,
      subtitle: "~ What guides us",
      title: "We keep people at the center",
      description: "Every company, experiment, decision is guided by a singular goal - improving the lives of patients.",
      image: "/img1.png"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="interactive-3d-carousel">
      <div className="carousel-container">
        {/* Main Content Layout */}
        <div className="carousel-content">
          {/* Left Side - Text Content */}
          <div className="carousel-text-side" key={`text-${currentSlide}`}>
            <div className="slide-subtitle">{slides[currentSlide].subtitle}</div>
            <h1 className="slide-title">{slides[currentSlide].title}</h1>
            <p className="slide-description">{slides[currentSlide].description}</p>
          </div>

          {/* Right Side - Image */}
          <div className="carousel-image-side" key={`image-${currentSlide}`}>
            <div className="carousel-image-container">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="carousel-main-image"
              />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="carousel-controls">
          {/* Progress Bar */}
           <button 
              className="carousel-btn carousel-btn-prev"
              onClick={handlePrevSlide}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          <div className="carousel-progress">
            <div 
              className="progress-fill"
              style={{ 
                transform: `scaleX(${(currentSlide + 1) / slides.length})`,
                transition: isAutoPlaying ? 'transform 4s linear' : 'transform 0.3s ease'
              }}
            ></div>
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">

            <button 
              className="carousel-btn carousel-btn-next"
              onClick={handleNextSlide}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DCarousel;
