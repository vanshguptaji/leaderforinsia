import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function InvestmentFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What kind of companies do you invest in?",
      answer: "We focus on early-stage technology companies with high growth potential, particularly in AI, climate tech, healthcare, and enterprise software. We look for innovative solutions addressing significant market needs with strong founding teams."
    },
    {
      question: "What's your investment process like?",
      answer: "Our investment process typically involves an initial screening, followed by in-depth meetings with the founding team. We conduct thorough due diligence on the market, technology, and business model. Final investment decisions are made collaboratively by our partnership, with term sheets typically issued within 3-4 weeks of our first meeting."
    },
    {
      question: "How do you support founders?",
      answer: "Beyond capital, we provide hands-on operational support, strategic guidance, and access to our extensive network. Our platform team helps with recruiting, business development, marketing, and fundraising. We hold regular check-ins with portfolio companies and remain actively involved throughout their growth journey."
    },
    {
      question: "What's unique about leadersforindiaorg?",
      answer: "leadersforindiaorg takes a founder-first approach with flexible capital across stages and sectors. We're known for our global perspective, backing companies across 35+ countries. Our concentrated portfolio strategy allows us to provide meaningful support to each company, and we have a strong track record of backing category-defining companies early."
    },
    {
      question: "Who are your limited partners?",
      answer: "Our limited partners include prestigious university endowments, philanthropic foundations, sovereign wealth funds, and family offices. We maintain a diverse LP base that shares our long-term investment philosophy and provides valuable connections to our portfolio companies."
    }
  ];

  return (
    <div className=" mx-[20px] xl:mx-20 bg-white">  
    <div className='border-b border-black mb-[10px] pb-4' ></div>    
      <div className="space-y-4 ">
        
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-black p-8"
          >
            <button
              className="flex justify-between items-center w-full text-left px-4 py-2 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-2xl xl:text-4xl md:text-3xl font-semibold  text-gray-800">{faq.question}</h2>
              <div className="text-gray-600">
                {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>
            
            {openIndex === index && (
              <div className="mt-2 px-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}