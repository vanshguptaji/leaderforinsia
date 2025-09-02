import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Homepage from './FelicisHomepag'
import PortfolioSection from './PortfolioSection'
import FounderTestimonials from './FounderTestimonials'
import FocusAreas from './FocusAreas'
import InvestmentFAQ from './InvestmentFAQ'
import InsightsSection from './InsightsSection'
import StartupGrid from './StartupGrid'
import Footer from './Footer'
import PortfolioInsights from './PortfolioInsights'
import Landing from './Landing'
import Interactive3DCarousel from './Interactive3DCarousel'
import AtlasSection from './AtlasSection'

const ParallaxContainer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const parallaxContainer = document.querySelector('.parallax-container');
      const interactiveFixed = document.querySelector('.interactive-fixed');
      
      if (!parallaxContainer || !interactiveFixed) return;

      const containerRect = parallaxContainer.getBoundingClientRect();
      const containerTop = containerRect.top + scrollY;
      const viewportHeight = window.innerHeight;

      // Show/hide interactive based on scroll position
      if (scrollY >= containerTop && scrollY < containerTop + viewportHeight) {
        // Interactive is visible during the first viewport height
        interactiveFixed.style.opacity = '1';
        interactiveFixed.style.zIndex = '1';
      } else if (scrollY >= containerTop + viewportHeight) {
        // After first viewport, fade out interactive
        interactiveFixed.style.opacity = '0';
        interactiveFixed.style.zIndex = '0';
      } else {
        // Before container, hide interactive
        interactiveFixed.style.opacity = '0';
        interactiveFixed.style.zIndex = '0';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Interactive component - fixed in background */}
      <div className="interactive-fixed" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 0.3s ease-out'
      }}>
        <Interactive3DCarousel />
      </div>
      
      {/* Parallax container for scrolling */}
      <div className="parallax-container" style={{
        position: 'relative',
        height: '120vh', // Space for interactive to show
      }}>
        {/* Empty space for interactive to show */}
      </div>
      
      {/* Atlas section scrolls normally after interactive */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'white'
      }}>
        <AtlasSection />
      </div>
    </>
  );
};

const HomeContent = () => (
  <>
    <Landing />
    <ParallaxContainer />
    <div className="content-after-parallax" style={{ 
      position: 'relative', 
      zIndex: 3, 
      backgroundColor: 'white',
      marginTop: 0
    }}>
      <Homepage />
      <PortfolioSection />
      <FounderTestimonials />
      <FocusAreas />
      <InvestmentFAQ />
      <InsightsSection />
      <Footer />
    </div>
  </>
)

const PortfolioContent = () => (
  <>
    <StartupGrid />
    <PortfolioInsights />
    <Footer />
  </>
)

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