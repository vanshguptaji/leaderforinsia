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

const HomeContent = () => (
  <>
    <Landing />
    <Homepage />
    <PortfolioSection />
    <FounderTestimonials />
    <FocusAreas />
    <InvestmentFAQ />
    <InsightsSection />
    <Footer />
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