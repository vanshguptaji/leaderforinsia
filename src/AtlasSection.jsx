import React, { useState } from 'react';

const AtlasSection = () => {
  const [activeSection, setActiveSection] = useState('discover');

  const sections = {
    discover: {
      title: 'Discover',
      content: {
        headline: 'Extraordinary science is the core',
        description: 'We work shoulder-to-shoulder with Entrepreneurs-In-Residence (EIRs) to identify transformative innovation from around the world',
        image: '/mainPic.png' // You can replace this with an appropriate image
      }
    },
    shape: {
      title: 'Shape',
      content: {
        headline: 'We work shoulder-to-shoulder with Entrepreneurs-In-Residence (EIRs) to identify',
        highlightText: 'transformative innovation',
        description: 'from around the world',
        image: '/img2.png' // You can replace this with an appropriate image
      }
    },
    build: {
      title: 'Build',
      content: {
        headline: 'We leverage the entire Atlas',
        highlightText: 'ecosystem',
        description: 'to build platform and product companies',
        image: '/img3.png' // You can replace this with an appropriate image
      }
    },
    scale: {
      title: 'Scale',
      content: {
        headline: 'From innovation to commercialization, we are',
        highlightText: 'long-term partners',
        description: ', providing guidance, resources, and capital at every stage',
        image: '/img1.png' // You can replace this with an appropriate image
      }
    }
  };

  return (
    <div className="bg-black">
    <div className="min-h-screen bg-gradient-to-br from-[#2c5f6f] to-[#4a8ca6] flex items-center p-0 relative overflow-hidden rounded-4xl">
      <div className="flex w-full h-screen max-w-[1400px] mx-auto flex-col lg:flex-row">
        {/* Left Sidebar Navigation */}
        <div className="w-full lg:w-[400px] bg-[rgba(44,95,111,0.95)] flex flex-col justify-center p-10 lg:p-[60px_40px] relative z-[2]">
          <div className="mb-10 lg:mb-[100px]">
            <h2 className="text-white text-3xl lg:text-[2.5rem] font-light leading-tight">Science First</h2>
          </div>
          
          <nav className="flex flex-row lg:flex-col gap-5 lg:gap-[60px] overflow-x-auto lg:overflow-visible pb-5 lg:pb-0">
            {Object.entries(sections).map(([key, section]) => (
              <div
                key={key}
                className={`flex items-center justify-between cursor-pointer py-4 lg:py-5 px-5 lg:px-0 min-w-[120px] lg:min-w-auto border-r lg:border-r-0 lg:border-b border-white/10 transition-all duration-300 relative group hover:border-white/40 ${
                  activeSection === key ? 'border-white/40' : ''
                }`}
                onMouseEnter={() => setActiveSection(key)}
              >
                <span className={`text-white/80 text-lg lg:text-[2rem] font-light transition-colors duration-300 group-hover:text-white ${
                  activeSection === key ? 'text-white' : ''
                }`}>
                  {section.title}
                </span>
                <div className={`text-white/60 text-xl lg:text-2xl transition-all duration-300 opacity-60 group-hover:translate-x-2.5 group-hover:opacity-100 ${
                  activeSection === key ? 'translate-x-2.5 opacity-100' : ''
                }`}>
                  →
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white flex items-center relative overflow-hidden">
          <div className="w-full h-full flex flex-col relative">
            <div className="flex-1 flex items-center p-8 lg:p-[80px_60px_40px] z-[2] relative">
              <h1 className="text-2xl lg:text-[3.5rem] leading-tight font-light text-[#333] max-w-[600px] m-0">
                {sections[activeSection].content.headline.split(sections[activeSection].content.highlightText || '')[0]}
                {sections[activeSection].content.highlightText && (
                  <span className="text-[#4a8ca6] font-normal">{sections[activeSection].content.highlightText}</span>
                )}
                {sections[activeSection].content.headline.split(sections[activeSection].content.highlightText || '')[1] || sections[activeSection].content.description}
              </h1>
            </div>
            
            <div className="flex-1 relative overflow-hidden flex items-end justify-end min-h-[300px] lg:min-h-auto">
              <img 
                src={sections[activeSection].content.image} 
                alt={sections[activeSection].title}
                className="w-full h-full object-cover transition-all duration-500 scale-[1.02] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AtlasSection;
