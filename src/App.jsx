import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/FelicisHomepag'
import PortfolioSection from './pages/PortfolioSection'
import FounderTestimonials from './pages/FounderTestimonials'
import FocusAreas from './pages/FocusAreas'
import InvestmentFAQ from './pages/InvestmentFAQ'
import InsightsSection from './pages/InsightsSection'
import StartupGrid from './pages/StartupGrid'
import Footer from './components/Footer'
import PortfolioInsights from './pages/PortfolioInsights'
import Landing from './pages/Landing'
import Interactive3DCarousel from './pages/Interactive3DCarousel'
import AtlasSection from './pages/AtlasSection'
import FelicisLayout from './pages/FelicisLayout'
import InvestorTeam from './pages/InvestorTeam'

const ParallaxStackProvider = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const handleFloatingElements = () => {
      const scrolled = window.pageYOffset;
      const floatingElements = document.querySelectorAll('.floating-element');
      
      floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    };

    const handleScroll = () => {
      updateScrollProgress();
      handleFloatingElements();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white bg-opacity-20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

  {/* Custom CSS for animations and parallax effect */}
  <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-element:nth-child(even) {
          animation-delay: -3s;
        }
        
        /* Default: allow parallax sections to size naturally. Only make sticky when .sticky is present. */
        .parallax-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Use .sticky to lock a section to the viewport (previous behavior) */
        .parallax-section.sticky {
          position: sticky;
          top: 0;
        }

        .parallax-content {
          width: 100%;
          position: relative;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      {children}
    </div>
  );
};

const ParallaxSection = ({ children, index, gradient = "from-gray-900 to-gray-800", floatingElements = [], sticky = true }) => {
  const FloatingElement = ({ emoji, position, size }) => (
    <div 
      className={`floating-element absolute ${position} ${size} opacity-10 animate-pulse`}
      style={{ zIndex: 1 }}
    >
      {emoji}
    </div>
  );

  return (
    <div
      className={`parallax-section ${sticky ? 'sticky' : ''}`}
      style={{ 
        zIndex: index + 1,
      }}
    >
      <div 
        className={`bg-gradient-to-br ${gradient} w-full relative overflow-hidden transform transition-all duration-500`}
        style={{
          boxShadow: `0 ${20 + index * 5}px ${40 + index * 10}px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm border border-white border-opacity-5"></div>
        
        {/* Content */}
        <div className="parallax-content relative z-10">
          {children}
        </div>

        {/* Floating elements */}
        {floatingElements.map((element, idx) => (
          <FloatingElement 
            key={idx}
            emoji={element.emoji}
            position={element.position}
            size={element.size}
          />
        ))}

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-white opacity-5 pointer-events-none"></div>
      </div>
    </div>
  );
};

const HomeContent = () => {
  // Parallax sections - only until AtlasSection
  const parallaxSections = [
    {
      component: <Landing />,
  gradient: "from-indigo-600 via-purple-600 to-pink-600",
  sticky: false,
      floatingElements: [
        { emoji: "🚀", position: "top-20 left-10", size: "text-3xl" },
        { emoji: "✨", position: "top-60 right-15", size: "text-2xl" }
      ]
    },
    {
      component: <Interactive3DCarousel />,
      gradient: "from-pink-600 via-red-500 to-orange-500",
      floatingElements: [
        { emoji: "🎯", position: "top-25 left-80", size: "text-2xl" },
        { emoji: "💫", position: "bottom-30 left-20", size: "text-xl" }
      ]
    },
    {
      component: <AtlasSection />,
      gradient: "from-blue-600 via-teal-500 to-green-500",
      floatingElements: [
        { emoji: "🌍", position: "top-15 right-25", size: "text-3xl" },
        { emoji: "📍", position: "bottom-20 right-10", size: "text-xl" }
      ]
    }
  ];

  return (
    <>
      {/* Parallax sections */}
      <ParallaxStackProvider>
        {parallaxSections.map((section, index) => (
          <ParallaxSection
            key={index}
            index={index}
            gradient={section.gradient}
            floatingElements={section.floatingElements}
            sticky={section.sticky !== undefined ? section.sticky : true}
          >
            {section.component}
          </ParallaxSection>
        ))}
        
        {/* Bottom spacing to transition out of parallax */}
        <div className="h-20 bg-gradient-to-t from-gray-800 to-gray-900" style={{ zIndex: parallaxSections.length + 1 }}></div>
      </ParallaxStackProvider>

      {/* Normal scrolling sections */}
      <div className="relative z-10 bg-white">
        <FelicisLayout />
        <FounderTestimonials />
        <FocusAreas />
        <InvestmentFAQ />
        <InsightsSection />
        <Footer />
      </div>
    </>
  );
};

const PortfolioContent = () => {
  return (
    <div className="bg-white">
      <StartupGrid />
      <PortfolioInsights />
      <Footer />
    </div>
  );
};

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('home')

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === 'portfolio') {
      setCurrentRoute('portfolio')
    }
  }, [])

  const setRoute = (route) => {
    setCurrentRoute(route)
    window.location.hash = route === 'home' ? '' : route
  }

  const renderContent = () => {
    switch (currentRoute) {
      case 'portfolio':
        return <PortfolioContent />
      case 'investor':
        return <InvestorTeam />
      default:
        return <HomeContent />
    }
  }

  return (
    <>
      <Navbar currentRoute={currentRoute} setRoute={setRoute} />
      {renderContent()}
    </>
  )
}

export default App