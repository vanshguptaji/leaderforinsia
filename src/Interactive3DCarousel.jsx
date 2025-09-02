import React, { useState, useEffect } from 'react';

const Interactive3DCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const ANIMATION_DURATION = 800; // ms, keep in sync with CSS durations

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
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
  changeSlide((currentSlide + 1) % slides.length, 'right');
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    const next = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(next, 'left');
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next, 'right');
  };

  // small helper to transition between slides while keeping previous visible for exit animation
  const changeSlide = (nextIndex, direction) => {
    if (isAnimating) return; // ignore while animating
    setPrevSlide(currentSlide);
    setSlideDirection(direction);
    setCurrentSlide(nextIndex);
    setIsAnimating(true);
    // clear prev after animation completes
    setTimeout(() => {
      setPrevSlide(null);
      setIsAnimating(false);
    }, ANIMATION_DURATION + 50);
  };

  const getPrevSlideIndex = () => (currentSlide - 1 + slides.length) % slides.length;
  const getNextSlideIndex = () => (currentSlide + 1) % slides.length;

  return (
    <section className="min-h-screen bg-slate-900 flex items-center overflow-hidden relative">
      <div className="w-full relative">
        {/* Main Content Area */}
        <div className="relative h-screen flex items-center">
          {/* Previous Slide Preview - Left Side */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-20 transition-all duration-700 hover:opacity-50">
            <div className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-r-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={handlePrevSlide}>
              <img 
                src={slides[getPrevSlideIndex()].image} 
                alt={slides[getPrevSlideIndex()].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                <div className="text-white/90 text-center px-4">
                  <div className="text-xs md:text-sm text-emerald-400 mb-1">{slides[getPrevSlideIndex()].subtitle}</div>
                  <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight">{slides[getPrevSlideIndex()].title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Next Slide Preview - Right Side */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20 transition-all duration-700 hover:opacity-50">
            <div className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-l-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={handleNextSlide}>
              <img 
                src={slides[getNextSlideIndex()].image} 
                alt={slides[getNextSlideIndex()].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                <div className="text-white/90 text-center px-4">
                  <div className="text-xs md:text-sm text-emerald-400 mb-1">{slides[getNextSlideIndex()].subtitle}</div>
                  <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight">{slides[getNextSlideIndex()].title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Main Slide Content */}
          <div className="w-full flex items-center justify-center px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-[70vh]">
                {/* Left Side - Text Content (layered to animate outgoing and incoming) */}
                <div className="relative w-full max-w-2xl order-2 lg:order-1 text-center lg:text-left">
                  {/* Incoming/current text */}
                  <div
                    key={`text-current-${currentSlide}`}
                    className={`text-white max-w-2xl mx-auto lg:mx-0 transition-all duration-700 ${
                      slideDirection === 'right'
                        ? 'animate-[slideInFromRight_0.7s_ease-out_forwards]'
                        : 'animate-[slideInFromLeft_0.7s_ease-out_forwards]'
                    }`}
                    style={{ position: prevSlide !== null ? 'absolute' : 'relative', inset: 0 }}
                  >
                    <div className={`text-base text-emerald-400 mb-5 font-normal tracking-wide opacity-0 ${
                      slideDirection === 'right'
                        ? 'animate-[slideInFromRight_0.8s_ease-out_0.1s_forwards]'
                        : 'animate-[slideInFromLeft_0.8s_ease-out_0.1s_forwards]'
                    }`}>
                      {slides[currentSlide].subtitle}
                    </div>
                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8 opacity-0 ${
                      slideDirection === 'right'
                        ? 'animate-[slideInFromRight_0.8s_ease-out_0.2s_forwards]'
                        : 'animate-[slideInFromLeft_0.8s_ease-out_0.2s_forwards]'
                    }`}>
                      {slides[currentSlide].title}
                    </h1>
                    <p className={`text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg opacity-0 mx-auto lg:mx-0 ${
                      slideDirection === 'right'
                        ? 'animate-[slideInFromRight_0.8s_ease-out_0.3s_forwards]'
                        : 'animate-[slideInFromLeft_0.8s_ease-out_0.3s_forwards]'
                    }`}>
                      {slides[currentSlide].description}
                    </p>
                  </div>

                  {/* Outgoing/previous text (if any) */}
                  {prevSlide !== null && (
                    <div
                      key={`text-prev-${prevSlide}`}
                      className={`text-white max-w-2xl mx-auto lg:mx-0 transition-all duration-700 ${
                        slideDirection === 'right'
                          ? 'animate-[slideOutToLeft_0.7s_ease-in_forwards]'
                          : 'animate-[slideOutToRight_0.7s_ease-in_forwards]'
                      } opacity-100`}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <div className="text-base text-emerald-400 mb-5 font-normal tracking-wide">
                        {slides[prevSlide].subtitle}
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
                        {slides[prevSlide].title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                        {slides[prevSlide].description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side - Main Image (layered) */}
                <div className="relative flex justify-center items-center order-1 lg:order-2 w-full">
                  {/* Incoming/current image */}
                  <div
                    key={`image-current-${currentSlide}`}
                    className={`w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden relative shadow-2xl opacity-100 bg-gradient-to-br from-slate-700 to-slate-800 z-20 transition-all duration-700 ${
                      slideDirection === 'right'
                        ? 'animate-[slideInFromRight_0.8s_ease-out_0.1s_forwards]'
                        : 'animate-[slideInFromLeft_0.8s_ease-out_0.1s_forwards]'
                    }`}
                    style={{ position: prevSlide !== null ? 'absolute' : 'relative', inset: 0 }}
                  >
                    <img 
                      src={slides[currentSlide].image} 
                      alt={slides[currentSlide].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 relative z-30"
                      style={{ display: 'block' }}
                      onLoad={(e) => {
                        console.log('Image loaded successfully:', e.target.src);
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        console.log('Image failed to load:', e.target.src);
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (!parent.querySelector('.fallback-content')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-content absolute inset-0 flex items-center justify-center text-white/80 text-center p-8 z-30';
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent z-25"></div>
                  </div>

                  {/* Outgoing/previous image */}
                  {prevSlide !== null && (
                    <div
                      key={`image-prev-${prevSlide}`}
                      className={`w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden relative shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800 z-10 transition-all duration-700 ${
                        slideDirection === 'right'
                          ? 'animate-[slideOutToLeft_0.8s_ease-in_forwards]'
                          : 'animate-[slideOutToRight_0.8s_ease-in_forwards]'
                      }`}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <img 
                        src={slides[prevSlide].image} 
                        alt={slides[prevSlide].title}
                        className="w-full h-full object-cover transition-transform duration-700 relative z-20"
                        style={{ display: 'block' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent z-25"></div>
                    </div>
                  )}
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