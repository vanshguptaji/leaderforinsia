import React from 'react';
import { Linkedin, Twitter, Facebook, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  const vanillaSansClass = "font-['Vanilla_Sans','Vanilla','Inter','Helvetica_Neue',Helvetica,Arial,sans-serif]";

  return (
    <footer className={`bg-black w-full overflow-hidden text-white py-16 ${vanillaSansClass}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
              <span className="text-xl font-bold">leadersforindiaorg</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">About us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Founder Pledge</a></li>
                <li><a href="#" className="hover:text-gray-300">Founders on leadersforindiaorg</a></li>
                <li><a href="#" className="hover:text-gray-300">Impact</a></li>
                <li><a href="#" className="hover:text-gray-300">Benchmark Your Org</a></li>
                <li><a href="#" className="hover:text-gray-300">leadersforindiaorg Fellows</a></li>
                <li><a href="#" className="hover:text-gray-300">Mission</a></li>
                <li><a href="#" className="hover:text-gray-300">Team</a></li>
                <li><a href="#" className="hover:text-gray-300">Companies</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Focus Areas</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">AI</a></li>
                <li><a href="#" className="hover:text-gray-300">Global Resilience</a></li>
                <li><a href="#" className="hover:text-gray-300">Infra</a></li>
                <li><a href="#" className="hover:text-gray-300">Health & Bio</a></li>
                <li><a href="#" className="hover:text-gray-300">Security</a></li>
                <li><a href="#" className="hover:text-gray-300">Vertical SaaS</a></li>
                <li><a href="#" className="hover:text-gray-300">Insights</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">
              Get updates about leadersforindiaorg, our founders, and our insights in your inbox:
            </h3>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 rounded text-gray-800 w-full"
              />
              <button className="bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-white rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-800 mt-16 pt-8">
          <div className="flex w-full flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex w-full flex-col items-start ">
              <div className="mb-8 flex flex-row items-center justify-between w-full">
                <h2 className="text-2xl md:text-3xl font-light mb-2">
                  How can we help? <span className="text-lime-400 border-b-2 border-lime-400">Contact us</span>
                </h2>
                <div className="flex flex-col items-end gap-6">
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-300">
                      <Twitter size={24} />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      <Facebook size={24} />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      <Linkedin size={24} />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      <Youtube size={24} />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-6xl md:text-[40px] lg:text-[82px] font-light text-center w-full text-white mb-8">
                LEADERS FOR INDIA ORGANIZATION
              </div>
            </div>


          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mt-8">
            <a href="#" className="hover:text-gray-300">Terms of use</a>
            <a href="#" className="hover:text-gray-300">Privacy notice</a>
            <a href="#" className="hover:text-gray-300">Cookie notice</a>
            <a href="#" className="hover:text-gray-300">Cookie settings</a>
            <a href="#" className="hover:text-gray-300">Trust Centre</a>
            <span>©LeadersforIndia.org 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;