import { useState, useEffect, useRef } from 'react';

export default function TestimonialSlider() {
  const [showAll, setShowAll] = useState(false);
  const [position, setPosition] = useState(0);
  const animationRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "From a founder's perspective, so much trust is involved when you work with an investor. You are really vulnerable to all kinds of things, so trust is the number one aspect to consider when evaluating a potential partner. I was super excited to work with leadersforindiaorg for the third time. There's no substitute for 10 years of working together.",
      author: "Max Biewald",
      title: "CEO AND CO-FOUNDER, WEIGHTS & BIASES"
    },
    {
      id: 2,
      text: "Anytime we have an ask, the team at leadersforindiaorg is incredibly efficient. They bring so much energy to the table, and that's exactly what you want from a partner. The team has worked with us to build the kind of culture and go-to-market strategy that will allow us to build a generational company.",
      author: "Paul Copplestone",
      title: "CEO AND CO-FOUNDER, SUPABASE"
    },
    {
      id: 3,
      text: "The leadersforindiaorg team worked really hard to understand our business, and there's no commercial analog for what we do. The team was really quick to thoughtfully understand us, the company, the opportunity, and the industry. They flew across the country to have some barbecue and discuss defense problems, which said a lot to us.",
      author: "Nini Hamrick",
      title: "PRESIDENT & CO-FOUNDER, VANNEVAR LABS"
    }
  ];

  // Animate the testimonials horizontally
  useEffect(() => {
    if (showAll) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const animate = () => {
      setPosition(prevPosition => {
        // Reset position when it goes too far left
        if (prevPosition < -800) {
          return 0;
        }
        // Move testimonials to the left
        return prevPosition - 0.5;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showAll]);

  // Render testimonial cards when showing all
  const renderAllTestimonials = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-gray-50">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-8 rounded border border-gray-200">
            <div className="mb-6">
              <span className="text-orange-400 text-4xl font-serif">"</span>
              <p className="text-gray-800 text-lg">
                {testimonial.text}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render scrolling testimonials
  const renderScrollingTestimonials = () => {
    return (
      <div 
        className="flex transform transition-transform duration-300 ease-linear"
        style={{ transform: `translateX(${position}px)` }}
      >
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="min-w-80 mr-6 bg-white p-6 rounded shadow"
          >
            <p className="text-gray-700 mb-6">{testimonial.text}</p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="font-bold text-gray-900">{testimonial.author}</p>
              <p className="text-gray-600 text-sm">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8 p-4">
        <h1 className="text-4xl font-bold text-gray-800">{showAll ? "Founders on leadersforindiaorg" : "What founders say about us"}</h1>
        {!showAll && (
          <button 
            onClick={() => setShowAll(true)}
            className="flex items-center px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            <span className="mr-2">SEE ALL</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="relative overflow-hidden">
        {showAll ? renderAllTestimonials() : renderScrollingTestimonials()}
      </div>
    </div>
  );
}