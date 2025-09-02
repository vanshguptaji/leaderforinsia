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

const InteractiveParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const interactiveParallax = document.querySelector('.interactive-parallax');
      
      if (!interactiveParallax) return;

      const rect = interactiveParallax.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport
      if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
        // Apply parallax transform - slower movement creates overlap effect
        const rate = (scrollTop - elementTop) * 0.3; // Reduced rate for more overlap
        interactiveParallax.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="interactive-parallax-container" style={{
      overflow: 'hidden',
      position: 'relative',
      height: '120vh' // Reduced height to allow more overlap
    }}>
      <div className="interactive-parallax" style={{
        transition: 'transform 0.1s ease-out',
        height: '100vh' // Taller than container to create overlap effect
      }}>
        <Interactive3DCarousel />
      </div>
    </div>
  );
};

const HomeContent = () => (
  <>
    <Landing />
    <InteractiveParallax />
    <div className="content-after-interactive" style={{ 
      position: 'relative', 
      zIndex: 3, 
      backgroundColor: 'white',
      marginTop: '-20vh' // Negative margin to pull content up over the interactive component
    }}>
      <AtlasSection />
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