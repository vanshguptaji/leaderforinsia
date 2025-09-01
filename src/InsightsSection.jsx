import { ArrowRight } from 'lucide-react';

export default function InsightsSection() {
  const insights = [
    {
      id: 1,
      title: "Investing in Exowatt",
      imageUrl: "/img1.png",
      alt: "Exowatt container"
    },
    {
      id: 2,
      title: "AI is here to transform security services",
      imageUrl: "/img2.png",
      alt: "Cybersecurity workforce visualization showing 5.5M current workforce, 4.8M gap, with a total needed workforce of 10.2M"
    },
    {
      id: 3,
      title: "Paul Copplestone on building for builders",
      imageUrl: "/footerimg0.png",
      alt: "Paul Copplestone, CEO & Co-Founder of Supabase"
    }
  ];

  return (
    <div className="bg-purple-100 mt-[40px]  rounded-2xl  xl:mx-30 p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <div key={insight.id} className="flex flex-col">
              <h3 className="text-xl font-medium text-gray-800 mb-4">{insight.title}</h3>
              
              <div className="relative mb-4 overflow-hidden rounded-lg aspect-video">
                <img 
                  src={insight.imageUrl} 
                  alt={insight.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-auto">
                <button className="flex items-center font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  <span className="mr-2">READ MORE</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 border border-gray-700 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-colors">
            MORE STORIES
          </button>
        </div>
      </div>
    </div>
  );
}