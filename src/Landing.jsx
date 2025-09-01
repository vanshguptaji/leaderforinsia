import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function Landing() {
    const images = [
        "https://web-assets.zendesk.com/is/image/zendesk/Photo_Hero_004-1?fmt=webp-alpha&qlt=65",
        "https://web-assets.zendesk.com/is/image/zendesk/Photo_Hero_002-1?fmt=webp-alpha&qlt=65",
        "/mainPic.png",
        "https://web-assets.zendesk.com/is/image/zendesk/Photo_Hero_001-1?fmt=webp-alpha&qlt=65",
        "https://web-assets.zendesk.com/is/image/zendesk/Photo_Hero_003-1?fmt=webp-alpha&qlt=65"
    ];

    const companies = [
        {
            name: 'Smart School',
            logo: './ss.jpeg'
        },
        {
            name: 'Swiggy',
            logo: './sw.png'
        },
        {
            name: 'Cloud Tailor',
            logo: './ct.svg'
        },
        {
            name: 'AERONERO',
            logo: './an.svg'
        },
        {
            name: 'HOMEBASE',
            logo: './hp.jpeg'
        },
        {
            name: 'Wehouse',
            logo: './wh.jpeg'
        },
        {
            name: 'hitespace',
            logo: './hs.jpeg'
        },
        {
            name: 'HCC',
            logo: './hcc.jpeg'
        }
    ];

    const duplicatedCompanies = [...companies, ...companies];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white mt-14 w-full">
            <div className="max-w-[1400px] mx-auto px-4 py-16">
                <div className="text-center mb-16 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
                        THE TRUSTED PARTNER IN YOUR<br />
                        Wealth Creation JOURNEY
                    </h1>
                    <p className="text-xl max-w-5xl text-center text-gray-600 mb-8">
                         Cross leverage businesses and invest smartly for high returns by joining our. Members Only Exclusive Community! A place where leading Investors combine forces
                    </p>
                </div>

                <div className="flex items-center justify-center p-8 lg:p-4 w-full">
                    <div className="relative w-full flex items-center justify-center">
                        {/* Far left image - base layer */}
                        <div className="relative z-10 bg-white rounded-xl hidden lg:block shadow-lg overflow-hidden">
                            <img
                                src={images[0]}
                                alt="Gallery image 1"
                                className="w-60 h-80 lg:w-80 lg:h-[360px] object-cover"
                            />
                        </div>

                        {/* Left image - overlaps 40% of far left, slightly taller */}
                        <div className="relative -ml-24 z-20 bg-white rounded-xl hidden lg:block shadow-lg overflow-hidden">
                            <img
                                src={images[1]}
                                alt="Gallery image 2"
                                className="w-60 h-84 lg:w-80 lg:h-[400px]  object-cover"
                            />
                        </div>

                        {/* Center image - overlaps 40% of left, tallest */}
                        <div className="relative lg:-ml-24 z-30 bg-white rounded-xl shadow-xl overflow-hidden">
                            <img
                                src={images[2]}
                                alt="Main gallery image"
                                className="w-full h-96 lg:w-[750px] lg:h-[440px] object-cover lg:object-fill"
                            />
                        </div>

                        {/* Right image - overlaps 40% of center, shorter than center */}
                        <div className="relative -ml-28 z-20 bg-white rounded-xl hidden lg:block shadow-lg overflow-hidden">
                            <img
                                src={images[3]}
                                alt="Gallery image 4"
                                className="w-60 h-84 lg:w-80 lg:h-[400px]  object-cover"
                            />
                        </div>

                        {/* Far right image - overlaps 40% of right, shortest on right */}
                        <div className="relative -ml-24 z-10 bg-white rounded-xl hidden lg:block shadow-lg overflow-hidden">
                            <img
                                src={images[4]}
                                alt="Gallery image 5"
                                className="w-60 h-80 lg:w-80 lg:h-[360px]  object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full py-8 flex flex-col lg:flex-row items-center justify-center overflow-hidden">
                    <div className="text-center mb-6 lg:mb-0 lg:mr-8">
                        <h2 className="text-sm lg:text-lg font-bold text-gray-800 min-w-[200px]">
                            Recent Investments
                        </h2>
                    </div>

                    <div className="relative overflow-hidden bg-white py-6 w-full">
                        <div className="flex whitespace-nowrap animate-scroll">
                            {duplicatedCompanies.map((company, index) => (
                                <div
                                    key={`${company.name}-${index}`}
                                    className="flex items-center justify-center mx-8 min-w-[150px] flex-shrink-0"
                                >
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="h-12 w-auto object-contain mb-2"
                                        />
                                        <span className="text-sm font-semibold text-gray-700 tracking-wide">
                                            {company.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes scroll {
                            0% {
                                transform: translateX(0);
                            }
                            100% {
                                transform: translateX(-160%);
                            }
                        }
                        
                        .animate-scroll {
                            animation: scroll 10s linear infinite;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}