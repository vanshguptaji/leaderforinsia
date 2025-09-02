import React, { useState, useEffect } from 'react';

const Interactive3DCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const ANIMATION_DURATION = 600; // ms, reduced for smoother transitions

  const slides = [
    {
      id: 0,
      subtitle: "~ What guides us",
      title: "We play the long game with urgency",
      description: "Patience, discipline, and vision to bring new transformational medicines to life.",
      image: "./img1.png"
    },
    {
      id: 1,
      subtitle: "~ What guides us", 
      title: "We are relentless truth-seekers",
      description: "Our seed-led investment model uncovers the most promising opportunities.",
      image: "./img2.png"
    },
    {
      id: 2,
      subtitle: "~ What guides us",
      title: "We understand the power of community",
      description: "We prioritize a collaborative, science-first, patient-centric culture.",
      image: "./img3.png"
    },
    {
      id: 3,
      subtitle: "~ What guides us",
      title: "We keep people at the center",
      description: "Every company, experiment, decision is guided by a singular goal - improving the lives of patients.",
      image: "./mainPic.png"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return;
    
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isAnimating, currentSlide]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    setSlideDirection('left');
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    setSlideDirection('right');
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  };

  const getPrevSlideIndex = () => (currentSlide - 1 + slides.length) % slides.length;
  const getNextSlideIndex = () => (currentSlide + 1) % slides.length;

  return (
    <section className="min-h-screen bg-slate-900 flex items-center overflow-hidden relative">
      <div className="w-full relative">
        {/* Main Content Area */}
        <div className="relative h-screen flex items-center">
          {/* Previous Slide Preview - Left Side */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-30 transition-all duration-500 hover:opacity-60">
            <div className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-r-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={handlePrevSlide}>
              <img 
                src={slides[getPrevSlideIndex()].image} 
                alt={slides[getPrevSlideIndex()].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-sm">
                <div className="text-white text-center px-4">
                  <div className="text-xs md:text-sm text-emerald-400 mb-1 opacity-90">{slides[getPrevSlideIndex()].subtitle}</div>
                  <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight opacity-95">{slides[getPrevSlideIndex()].title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Next Slide Preview - Right Side */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-30 transition-all duration-500 hover:opacity-60">
            <div className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-l-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={handleNextSlide}>
              <img 
                src={slides[getNextSlideIndex()].image} 
                alt={slides[getNextSlideIndex()].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-sm">
                <div className="text-white text-center px-4">
                  <div className="text-xs md:text-sm text-emerald-400 mb-1 opacity-90">{slides[getNextSlideIndex()].subtitle}</div>
                  <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight opacity-95">{slides[getNextSlideIndex()].title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Main Slide Content */}
          <div className="w-full flex items-center justify-center px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-[70vh]">
                {/* Left Side - Text Content */}
                <div className="relative w-full max-w-2xl order-2 lg:order-1 text-center lg:text-left">
                  <div
                    key={currentSlide}
                    className={`text-white max-w-2xl mx-auto lg:mx-0 transition-all duration-600 ease-out ${
                      isAnimating 
                        ? slideDirection === 'right' 
                          ? 'animate-slideInLeft' 
                          : 'animate-slideInRight'
                        : 'opacity-100 transform translate-x-0'
                    }`}
                  >
                    <div className="text-base text-emerald-400 mb-5 font-normal tracking-wide">
                      {slides[currentSlide].subtitle}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
                      {slides[currentSlide].title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                </div>

                {/* Right Side - Main Image */}
                <div className="relative flex justify-center items-center order-1 lg:order-2 w-full">
                  <div
                    key={currentSlide}
                    className={`w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden relative shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-600 ease-out transform ${
                      isAnimating 
                        ? slideDirection === 'right' 
                          ? 'animate-slideInRight scale-95 opacity-0' 
                          : 'animate-slideInLeft scale-95 opacity-0'
                        : 'scale-100 opacity-100'
                    }`}
                  >
                    <img 
                      src={slides[currentSlide].image} 
                      alt={slides[currentSlide].title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onLoad={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (!parent.querySelector('.fallback-content')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-content absolute inset-0 flex items-center justify-center text-white/80 text-center p-8';
                          fallback.innerHTML = `
                            <div>
                              <div class="text-4xl mb-4">📸</div>
                              <div class="text-lg font-light">${slides[currentSlide].title}</div>
                            </div>
                          `;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Gradient Overlays */}
          <div className="absolute inset-0 pointer-events-none z-5">
            {/* Left gradient */}
            <div className="absolute left-0 top-0 w-1/12 h-full bg-gradient-to-r from-slate-900 via-slate-900/30 to-transparent"></div>
            {/* Right gradient */}
            <div className="absolute right-0 top-0 w-1/12 h-full bg-gradient-to-l from-slate-900 via-slate-900/30 to-transparent"></div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-8 md:gap-12 z-20">
          {/* Previous Button */}
          <button 
            className="group bg-white/10 border border-white/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer transition-all duration-500 text-white/70 backdrop-blur-xl relative overflow-hidden transform hover:scale-110 hover:bg-white/20 hover:border-white/40 hover:text-white hover:shadow-2xl hover:shadow-white/10 active:scale-105"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-500 group-hover:scale-110 group-hover:-translate-x-0.5 relative z-10">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Progress Bar */}
          <div className="w-48 md:w-80 lg:w-96 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-white rounded-full origin-left transition-all duration-300"
              style={{ 
                transform: `scaleX(${(currentSlide + 1) / slides.length})`,
                transition: isAutoPlaying ? 'transform 4s linear' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            ></div>
          </div>

          {/* Next Button */}
          <button 
            className="group bg-white/10 border border-white/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer transition-all duration-500 text-white/70 backdrop-blur-xl relative overflow-hidden transform hover:scale-110 hover:bg-white/20 hover:border-white/40 hover:text-white hover:shadow-2xl hover:shadow-white/10 active:scale-105"
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-500 group-hover:scale-110 group-hover:translate-x-0.5 relative z-10">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
  @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Exit animations */
        @keyframes slideOutToLeft {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-120px);
          }
        }

        @keyframes slideOutToRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(120px);
          }
        }
      `}</style>
    </section>
  );
};

export default Interactive3DCarousel;