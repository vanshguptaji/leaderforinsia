import React, { useState, useEffect } from 'react';

const Interactive3DCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingSlide, setPendingSlide] = useState(null); // hold the target slide during animation
  const [suppressTransition, setSuppressTransition] = useState(false); // when true, disable transform transition to snap
  const ANIMATION_DURATION = 1400; // keep in sync with the timeout/duration used below

  const slides = [
    {
      id: 0,
      subtitle: "~ What guides us",
      title: "We play the long game with urgency",
      description: "Patience, discipline, and vision to bring new transformational medicines to life.",
    image: "/img1.png"
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
  image: "/mainPic.png"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return;
    
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5500); // Longer pause to accommodate slower animation

    return () => clearInterval(interval);
  }, [isAutoPlaying, isAnimating, currentSlide]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    // ensure transition is enabled for the outgoing animation
    setSuppressTransition(false);
    setIsAutoPlaying(false);
    setSlideDirection('left');
    setIsAnimating(true);
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    setPendingSlide(prevIndex);
    // wait for animation to finish, then commit
    setTimeout(() => {
      // disable transition briefly so we can snap the 3-panel container back to center
      setSuppressTransition(true);
      setCurrentSlide(prevIndex);
      setPendingSlide(null);
      setIsAnimating(false);
      // restore transitions shortly after snapping
      setTimeout(() => setSuppressTransition(false), 40);
    }, ANIMATION_DURATION);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    // ensure transition is enabled for the outgoing animation
    setSuppressTransition(false);
    setIsAutoPlaying(false);
    setSlideDirection('right');
    setIsAnimating(true);
    const nextIndex = (currentSlide + 1) % slides.length;
    setPendingSlide(nextIndex);
    // wait for animation to finish, then commit
    setTimeout(() => {
      // disable transition briefly so we can snap the 3-panel container back to center
      setSuppressTransition(true);
      setCurrentSlide(nextIndex);
      setPendingSlide(null);
      setIsAnimating(false);
      // restore transitions shortly after snapping
      setTimeout(() => setSuppressTransition(false), 40);
    }, ANIMATION_DURATION);
  };

  const getPrevSlideIndex = (base = currentSlide) => (base - 1 + slides.length) % slides.length;
  const getNextSlideIndex = (base = currentSlide) => (base + 1) % slides.length;

  // Image scale/translate/zIndex for enter/leave visual
  // tuned so current slide shrinks to left and right side grows into center
  const SCALE_SIDE = 0.82;       // resting side panel scale (smaller)
  const SCALE_OUTGOING = 0.84;    // outgoing slide scales down significantly
  const SCALE_INCOMING = 1.12;   // incoming slide scales up more clearly

  let prevImgTranslate = '-12vw';
  let currImgTranslate = '0vw';
  let nextImgTranslate = '12vw';

  let prevImgScale = SCALE_SIDE;
  let currImgScale = 1;
  let nextImgScale = SCALE_SIDE;

  let prevZ = 10, currZ = 20, nextZ = 10;

  if (isAnimating) {
    if (slideDirection === 'right') {
      // moving to next: current moves left/outgoing (shrinks), next grows into center
      prevImgTranslate = '-20vw'; prevImgScale = SCALE_SIDE; prevZ = 5;
      currImgTranslate = '-12vw'; currImgScale = SCALE_OUTGOING; currZ = 12;
      nextImgTranslate = '0vw'; nextImgScale = SCALE_INCOMING; nextZ = 50;
    } else {
      // moving to prev: prev grows into center, current moves right/outgoing (shrinks)
      prevImgTranslate = '0vw'; prevImgScale = SCALE_INCOMING; prevZ = 50;
      currImgTranslate = '12vw'; currImgScale = SCALE_OUTGOING; currZ = 12;
      nextImgTranslate = '20vw'; nextImgScale = SCALE_SIDE; nextZ = 5;
    }
  } else {
    // resting: center is front
    prevImgTranslate = '-8vw'; currImgTranslate = '0vw'; nextImgTranslate = '8vw';
    prevImgScale = SCALE_SIDE; currImgScale = 1; nextImgScale = SCALE_SIDE;
    prevZ = 10; currZ = 30; nextZ = 10;
  }

  const imageWrapperStyle = (translate, scale, z) => ({
    transform: `translateX(${translate}) scale(${scale})`,
    zIndex: z,
    willChange: 'transform',
  opacity: z >= 30 ? 1 : 0.72,
  transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`
  });

  // Preview card styles for left/right thumbnails
  const PREVIEW_REST_SCALE = 0.9;
  const PREVIEW_ACTIVE_SCALE = 1.04;
  const PREVIEW_REST_OPACITY = 0.32;
  const PREVIEW_ACTIVE_OPACITY = 1;

  let previewLeftStyle = {
    transform: `scale(${PREVIEW_REST_SCALE})`,
    opacity: PREVIEW_REST_OPACITY,
    transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
    willChange: 'transform, opacity'
  };

  let previewRightStyle = { ...previewLeftStyle };

  if (isAnimating) {
    if (slideDirection === 'right') {
      // incoming is right preview
      previewRightStyle = {
        transform: `scale(${PREVIEW_ACTIVE_SCALE}) translateX(-6px)`,
        opacity: PREVIEW_ACTIVE_OPACITY,
        transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
        willChange: 'transform, opacity'
      };
      previewLeftStyle = {
        transform: `scale(${PREVIEW_REST_SCALE * 0.92}) translateX(0px)`,
        opacity: 0.18,
        transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
        willChange: 'transform, opacity'
      };
    } else {
      // incoming is left preview
      previewLeftStyle = {
        transform: `scale(${PREVIEW_ACTIVE_SCALE}) translateX(6px)`,
        opacity: PREVIEW_ACTIVE_OPACITY,
        transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
        willChange: 'transform, opacity'
      };
      previewRightStyle = {
        transform: `scale(${PREVIEW_REST_SCALE * 0.92}) translateX(0px)`,
        opacity: 0.18,
        transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
        willChange: 'transform, opacity'
      };
    }
  }

  return (
    <section className="min-h-screen bg-slate-900 flex items-center overflow-hidden relative">
      {/* Sliding Container */}
      <div className="w-full relative">
        <div className="relative h-screen flex items-center">
          
          {/* Main Sliding Content Container */}
          <div 
            className="absolute inset-0 flex"
            style={{
              // Panels are laid out as [prev, current, next] across 300vw.
              // Default (resting) translate should show the center panel at -100vw.
              // When animating to next (slideDirection === 'right') move to -200vw.
              // When animating to prev (slideDirection === 'left') move to 0vw.
              transform: `translateX(${isAnimating
                ? slideDirection === 'right' ? '-200vw' : '0vw'
                : '-100vw'
              })`,
              width: '300vw', // Three screens wide to accommodate prev, current, next
              transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
            }}
          >
            
            {/* Previous Slide - Left Screen */}
            <div className="w-screen h-full flex items-center justify-center px-4 md:px-8 lg:px-16 relative">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-[70vh]">
                  {/* Left Side - Text Content */}
                  <div className="relative w-full max-w-2xl order-2 lg:order-1 text-center lg:text-left">
                    <div className="text-white max-w-2xl mx-auto lg:mx-0">
                      <div className="text-base text-emerald-400 mb-5 font-normal tracking-wide">
                        {slides[getPrevSlideIndex()].subtitle}
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
                        {slides[getPrevSlideIndex()].title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                        {slides[getPrevSlideIndex()].description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Main Image */}
                  <div className="relative flex justify-center items-center order-1 lg:order-2 w-full">
                    <div style={imageWrapperStyle(prevImgTranslate, prevImgScale, prevZ)} className="w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden relative shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800">
                      <img 
                        src={slides[getPrevSlideIndex()].image} 
                        alt={slides[getPrevSlideIndex()].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          if (!parent.querySelector('.fallback-content')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-content absolute inset-0 flex items-center justify-center text-white/80 text-center p-8';
                            fallback.innerHTML = `
                              <div>
                                <div class="text-4xl mb-4">📸</div>
                                <div class="text-lg font-light">${slides[getPrevSlideIndex()].title}</div>
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

            {/* Current Slide - Center Screen */}
            <div className="w-screen h-full flex items-center justify-center px-4 md:px-8 lg:px-16 relative">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-[70vh]">
                  {/* Left Side - Text Content */}
                  <div className="relative w-full max-w-2xl order-2 lg:order-1 text-center lg:text-left">
                    <div className="text-white max-w-2xl mx-auto lg:mx-0">
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
                    <div style={imageWrapperStyle(currImgTranslate, currImgScale, currZ)} className="w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden relative shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800">
                      <img 
                        src={slides[currentSlide].image} 
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

            {/* Next Slide - Right Screen */}
            <div className="w-screen h-full flex items-center justify-center px-4 md:px-8 lg:px-16 relative">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-[70vh]">
                  {/* Left Side - Text Content */}
                  <div className="relative w-full max-w-2xl order-2 lg:order-1 text-center lg:text-left">
                    <div className="text-white max-w-2xl mx-auto lg:mx-0">
                      <div className="text-base text-emerald-400 mb-5 font-normal tracking-wide">
                        {slides[getNextSlideIndex()].subtitle}
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
                        {slides[getNextSlideIndex()].title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                        {slides[getNextSlideIndex()].description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Main Image */}
                  <div className="relative flex justify-center items-center order-1 lg:order-2 w-full">
                    <div style={imageWrapperStyle(nextImgTranslate, nextImgScale, nextZ)} className="w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden relative shadow-2xl bg-gradient-to-br from-slate-700 to-slate-800">
                      <img 
                        src={slides[getNextSlideIndex()].image} 
                        alt={slides[getNextSlideIndex()].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          if (!parent.querySelector('.fallback-content')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-content absolute inset-0 flex items-center justify-center text-white/80 text-center p-8';
                            fallback.innerHTML = `
                              <div>
                                <div class="text-4xl mb-4">📸</div>
                                <div class="text-lg font-light">${slides[getNextSlideIndex()].title}</div>
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

          </div>

                        {/* Side Preview Cards - keep visible so left/right are constant */}
          <>
              {/* Previous Slide Preview - Left Side */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-30 transition-all duration-500 hover:opacity-60">
                <div style={previewLeftStyle} className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-r-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-500 hover:scale-105" onClick={handlePrevSlide}>
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
                <div style={previewRightStyle} className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-l-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-500 hover:scale-105" onClick={handleNextSlide}>
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
            </>

          {/* Background Gradient Overlays */}
          <div className="absolute inset-0 pointer-events-none z-5">
            <div className="absolute left-0 top-0 w-1/12 h-full bg-gradient-to-r from-slate-900 via-slate-900/30 to-transparent"></div>
            <div className="absolute right-0 top-0 w-1/12 h-full bg-gradient-to-l from-slate-900 via-slate-900/30 to-transparent"></div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-8 md:gap-12 z-20">
          {/* Previous Button */}
          <button 
            className="group bg-white/10 border border-white/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer transition-all duration-500 text-white/70 backdrop-blur-xl relative overflow-hidden transform hover:scale-110 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-105"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-500 group-hover:scale-110 relative z-10">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Progress Bar */}
          <div className="w-48 md:w-80 lg:w-96 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-white rounded-full origin-left transition-all duration-300"
              style={{ 
                transform: `scaleX(${(currentSlide + 1) / slides.length})`,
                transition: isAutoPlaying ? 'transform 4s linear' : 'transform 0.3s ease-out'
              }}
            ></div>
          </div>

          {/* Next Button */}
          <button 
            className="group bg-white/10 border border-white/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer transition-all duration-300 text-white/70 backdrop-blur-xl relative overflow-hidden transform hover:scale-110 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-105"
            onClick={handleNextSlide}
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-300 group-hover:scale-110 relative z-10">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DCarousel;