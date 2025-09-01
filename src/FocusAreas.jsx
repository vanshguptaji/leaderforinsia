import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function FocusAreas() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftControl, setShowLeftControl] = useState(false);
  const [showRightControl, setShowRightControl] = useState(true);
  const scrollContainerRef = useRef(null);

  const focusAreas = [
    {
      id: 1,
      title: "AI",
      link: "/ai"
    },
    {
      id: 2,
      title: "Global Resilience",
      link: "/global-resilience"
    },
    {
      id: 3,
      title: "Health & Bio",
      link: "/health-bio"
    },
    {
      id: 4,
      title: "Infra",
      link: "/infra"
    },
    {
      id: 5,
      title: "Fintech",
      link: "/fintech"
    },
    {
      id: 6,
      title: "Enterprise",
      link: "/enterprise"
    }
  ];

  // Update scroll controls visibility based on scroll position
  const updateScrollControls = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    setShowLeftControl(scrollPosition > 0);
    setShowRightControl(scrollPosition < maxScroll - 5); // Small buffer to handle rounding errors
  };

  // Check scroll controls on mount and window resize
  useEffect(() => {
    updateScrollControls();
    window.addEventListener('resize', updateScrollControls);
    return () => window.removeEventListener('resize', updateScrollControls);
  }, []);

  // Update controls when scroll position changes
  useEffect(() => {
    updateScrollControls();
  }, [scrollPosition]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // On mobile, scroll by card width plus gap (approx 280px + 16px)
    // On desktop, scroll by approx 2 cards
    const scrollAmount = direction === 'left' 
      ? (window.innerWidth < 768 ? -296 : -600)
      : (window.innerWidth < 768 ? 296 : 600);
    
    const newPosition = scrollPosition + scrollAmount;
    
    // Calculate boundaries to prevent over-scrolling
    const maxScroll = container.scrollWidth - container.clientWidth;
    const boundedPosition = Math.max(0, Math.min(newPosition, maxScroll));
    
    container.scrollTo({
      left: boundedPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(boundedPosition);
  };

  // Handle manual scrolling
  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  // Get gradient class based on index
  const getGradientClass = (index) => {
    // Alternating gradient styles to match the image
    const gradients = [
      'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-800',
      'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600',
      'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700',
      'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800'
    ];
    
    return gradients[index % gradients.length];
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 lg:mb-0">Focus areas</h2>
        
        <div className="flex items-center">
          <p className="text-lg sm:text-xl text-gray-700 max-w-lg mr-6">
            We invest across areas, but this is what's capturing our attention right now.
          </p>
          
          <div className="flex space-x-4 ml-auto lg:ml-6">
            <button 
              onClick={() => scroll('left')} 
              className={`rounded-full border border-gray-300 w-12 h-12 flex items-center justify-center transition-colors ${!showLeftControl ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              aria-label="Scroll left"
              disabled={!showLeftControl}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => scroll('right')} 
              className={`rounded-full border border-gray-300 w-12 h-12 flex items-center justify-center transition-colors ${!showRightControl ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              aria-label="Scroll right"
              disabled={!showRightControl}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide snap-x"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {focusAreas.map((area, index) => (
          <div 
            key={area.id}
            className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] h-48 sm:h-56 rounded-lg ${getGradientClass(index)} relative overflow-hidden snap-start`}
          >
            {/* Abstract shapes overlay - mimicking the curved amber shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute w-3/4 h-3/4 rounded-full ${index % 2 === 0 ? 'bottom-0 -right-1/4' : 'bottom-0 -right-1/3'} bg-amber-300 opacity-40 blur-sm`}></div>
              <div className={`absolute w-2/3 h-2/3 rounded-full ${index % 2 === 0 ? '-bottom-1/4 left-1/4' : '-bottom-1/3 right-1/4'} bg-amber-600 opacity-30 blur-sm`}></div>
            </div>
            
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 flex flex-col justify-end h-full w-full">
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-6 sm:mb-8 z-10">{area.title}</h3>
              
              <a 
                href={area.link}
                className="rounded-full border border-white/50 bg-white/20 backdrop-blur-sm w-10 h-10 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label={`Explore ${area.title}`}
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full h-px bg-gray-200 mt-12"></div>
    </div>
  );
}