import { ArrowRight } from 'lucide-react';

export default function PortfolioSection() {
  // Sample company logos with their respective names
  const portfolioCompanies = [
    { name: "Adyen", logo: "ADYEN" },
    { name: "Shopify", logo: "Shopify" },
    { name: "Canva", logo: "Canva" },
    { name: "Vannevar Labs", logo: "VANNEVAR Labs" },
    { name: "Runway", logo: "runway" },
    { name: "Mercor", logo: "MERCOR" },
    { name: "Weights & Biases", logo: "Weights & Biases" },
    { name: "Notion", logo: "Notion" },
  ];

  return (
    <div className="w-full py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Stats Section - Yellow Background */}
          <div className="w-full md:w-1/2 bg-amber-200 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Success & Impact on a Global Scale Since <span className="relative">
                2006
                <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-400"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Market Value Stat */}
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gray-800">$220B+</p>
                <p className="text-lg text-gray-700 mt-2">Total Market Value Captured</p>
                <div className="h-px bg-gray-300 w-full mt-6"></div>
              </div>
              
              {/* Market Cap Stat */}
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gray-800">$100B+</p>
                <p className="text-lg text-gray-700 mt-2">Total Exit Market Cap</p>
                <div className="h-px bg-gray-300 w-full mt-6"></div>
              </div>
              
              {/* IPOs Stat */}
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gray-800">18</p>
                <p className="text-lg text-gray-700 mt-2">IPOs</p>
              </div>
              
              {/* Exits Stat */}
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gray-800">100+</p>
                <p className="text-lg text-gray-700 mt-2">Exits</p>
              </div>
            </div>
          </div>
          
          {/* Portfolio Companies Section - Purple Background */}
          <div className="w-full md:w-1/2 bg-purple-100 rounded-2xl p-8 md:p-12 flex flex-col">
            <div className="grid grid-cols-2 gap-6 flex-grow">
              {portfolioCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-center border-b border-gray-300 pb-4">
                  <CompanyLogo name={company.name} displayText={company.logo} />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="flex items-center text-gray-700 font-medium hover:text-gray-900">
                SEE ALL
                <span className="ml-2 p-2 border border-gray-300 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to display company logos
function CompanyLogo({ name, displayText }) {
  // In a real implementation, you would use actual SVG logos or images
  // This is a simple text representation for the example
  
  const logoStyles = {
    "Adyen": "font-bold text-lg",
    "Shopify": "font-bold text-lg",
    "Canva": "font-bold italic text-xl",
    "Vannevar Labs": "font-bold text-sm",
    "Runway": "font-bold text-2xl lowercase",
    "Mercor": "font-medium text-lg",
    "Weights & Biases": "font-bold text-sm",
    "Notion": "font-bold text-xl",
  };
  
  return (
    <div className={`${logoStyles[name]} text-gray-800`}>
      {displayText}
    </div>
  );
}