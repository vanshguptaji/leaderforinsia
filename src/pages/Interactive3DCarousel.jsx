import React, { useState, useEffect } from 'react';

const Interactive3DCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  const ANIMATION_DURATION = 800;

  const slides = [
    {
      id: 0,
      subtitle: "~ What guides us",
      title: "We play the long game with urgency",
      description: "Patience, discipline, and vision to bring new transformational medicines to life.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 1,
      subtitle: "~ What guides us", 
      title: "We are relentless truth-seekers",
      description: "Our seed-led investment model uncovers the most promising opportunities.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80"
    },
    {
      id: 2,
      subtitle: "~ What guides us",
      title: "We understand the power of community",
      description: "We prioritize a collaborative, science-first, patient-centric culture.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
    },
    {
      id: 3,
      subtitle: "~ What guides us",
      title: "We keep people at the center",
      description: "Every company, experiment, decision is guided by a singular goal - improving the lives of patients.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    setSlideDirection('next');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    setSlideDirection('prev');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAutoPlaying(false);
    
    const direction = index > currentSlide ? 'next' : 'prev';
    setSlideDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  // Get slide indices
  const getPrevSlideIndex = () => (currentSlide - 1 + slides.length) % slides.length;
  const getNextSlideIndex = () => (currentSlide + 1) % slides.length;

  // Calculate slide positions for continuous effect with previews
  const getSlideStyle = (slideIndex) => {
    const isCurrentSlide = slideIndex === currentSlide;
    const isPrevSlide = slideIndex === getPrevSlideIndex();
    const isNextSlide = slideIndex === getNextSlideIndex();
    
    let translateX = '120%'; // Default: far off-screen
    let opacity = 0;
    let scale = 0.7;
    let zIndex = 1;

    if (isCurrentSlide) {
      if (isAnimating) {
        if (slideDirection === 'next') {
          translateX = '-120%'; // Exit left
          opacity = 0;
          scale = 0.7;
        } else {
          translateX = '120%'; // Exit right
          opacity = 0;
          scale = 0.7;
        }
      } else {
        translateX = '0%'; // Center
        opacity = 1;
        scale = 1;
        zIndex = 10;
      }
    } else if (isPrevSlide) {
      if (isAnimating && slideDirection === 'prev') {
        translateX = '0%'; // Enter from left to center
        opacity = 1;
        scale = 1;
        zIndex = 10;
      } else {
        translateX = '-70%'; // Preview position on left
        opacity = 0.6;
        scale = 0.75;
        zIndex = 5;
      }
    } else if (isNextSlide) {
      if (isAnimating && slideDirection === 'next') {
        translateX = '0%'; // Enter from right to center
        opacity = 1;
        scale = 1;
        zIndex = 10;
      } else {
        translateX = '70%'; // Preview position on right
        opacity = 0.6;
        scale = 0.75;
        zIndex = 5;
      }
    }

    return {
      transform: `translateX(${translateX}) scale(${scale})`,
      opacity,
      zIndex,
      transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  const SlideContent = ({ slide, isPreview = false }) => (
    <div 
      className={`relative w-full h-full rounded-3xl overflow-hidden ${
        isPreview 
          ? 'bg-slate-800/40 backdrop-blur-md border border-white/10' 
          : 'bg-slate-900/95 backdrop-blur-xl border border-white/20'
      }`}
      style={{
        boxShadow: isPreview 
          ? '0 20px 50px rgba(0, 0, 0, 0.4)' 
          : '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 120px rgba(59, 130, 246, 0.03)',
      }}
    >
      {/* Main slide content */}
      {!isPreview ? (
        <div className="grid lg:grid-cols-2 gap-8 items-center h-full p-8 md:p-16">
          
          {/* Text Content - Left Side */}
          <div className="text-white space-y-8 order-2 lg:order-1">
            <div className="text-cyan-400 font-medium tracking-wider text-lg">
              {slide.subtitle}
            </div>
            
            <h2 className="font-light leading-tight text-4xl md:text-5xl lg:text-6xl">
              {slide.title}
            </h2>
            
            <p className="text-xl text-white/70 leading-relaxed font-light max-w-lg">
              {slide.description}
            </p>
          </div>

          {/* Image Content - Right Side */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-2xl h-96 md:h-[500px]">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Image overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/20 via-transparent to-slate-900/30"></div>
            </div>
          </div>
        </div>
      ) : (
        // Preview slide content
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="relative w-full max-w-sm h-48 mb-4">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl opacity-80"
            />
          </div>
          
          <div className="text-cyan-400 font-medium text-sm mb-2">
            {slide.subtitle}
          </div>
          
          <h3 className="font-light text-white text-lg leading-tight">
            {slide.title}
          </h3>
        </div>
      )}

      {/* Inner glow border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"></div>
    </div>
  );

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-slate-700/20 rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Atlas Venture branding */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-cyan-400 text-lg font-medium tracking-wide">
          novel medicines.
        </div>
      </div>

      {/* Enhanced edge gradients for smoother transitions */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-[15] pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent z-[15] pointer-events-none"></div>

      {/* Slider Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 h-[700px]">
          
          {/* Slides Stack */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => {
              const isCurrentSlide = index === currentSlide;
              const isPrevSlide = index === getPrevSlideIndex();
              const isNextSlide = index === getNextSlideIndex();
              const shouldRender = isCurrentSlide || isPrevSlide || isNextSlide;
              
              if (!shouldRender) return null;

              const isPreview = isPrevSlide || isNextSlide;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full ${isPreview ? 'cursor-pointer hover:scale-105' : ''} transition-transform duration-300`}
                  style={getSlideStyle(index)}
                  onClick={isPreview ? (isPrevSlide ? handlePrevSlide : handleNextSlide) : undefined}
                >
                  <SlideContent slide={slide} isPreview={isPreview} />
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-10">
          
          {/* Previous Button */}
          <button 
            className="group bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrevSlide}
            disabled={isAnimating}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70 group-hover:text-white transition-colors duration-300">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  transition-all duration-500 transform rounded-full
                  ${index === currentSlide 
                    ? 'w-12 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-cyan-400/50' 
                    : 'w-3 h-3 bg-white/25 hover:bg-white/50 hover:scale-125'
                  }
                `}
                disabled={isAnimating}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            className="group bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNextSlide}
            disabled={isAnimating}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70 group-hover:text-white transition-colors duration-300">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Minimalist Progress Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-96 h-0.5 bg-white/10 rounded-full overflow-hidden z-20">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
};

export default Interactive3DCarousel;