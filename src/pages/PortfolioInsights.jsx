import React from 'react';
import { ArrowUpRight, CircleArrowOutUpRight } from 'lucide-react';

const PortfolioInsights = () => {
    const insights = [
        {
            id: 1,
            date: "October 11, 2023",
            category: "Jungle Insights",
            title: "First Cheque@Jungle",
            featured: false
        },
        {
            id: 2,
            date: "July 13, 2021",
            category: "Company Building",
            title: "How Moglix went from an idea to India's largest B2B commerce Unicorn",
            featured: false
        },
        {
            id: 3,
            date: "June 8, 2023",
            category: "Jungle Insights",
            title: "Amit Anand, Founding Partner at Jungle, accepted into The Aspen Institute Financial Leaders Fellowship",
            featured: false
        },
        {
            id: 4,
            date: "May 11, 2021",
            category: "Company Building",
            title: "How Turtlemint built India's largest Insurtech Community",
            featured: false
        }
    ];

    const InsightCard = ({ insight, isLast }) => {
        const baseClasses = "group cursor-pointer transition-all duration-300 ease-in-out";
        const containerClasses = insight.featured
            ? `${baseClasses} p-8 bg-blue-600 text-white hover:bg-blue-700`
            : `${baseClasses} p-6 hover:bg-blue-600 hover:text-white border-b border-gray-500 mb-7`;

        return (
            <div className={containerClasses}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex-1">
                        <div className={`flex items-center gap-4 text-sm pb-3 ${insight.featured
                                ? 'text-white opacity-90 group-hover:opacity-100'
                                : 'text-gray-600 group-hover:text-white'
                            }`}>
                            <span>{insight.date}</span>
                            <span>|</span>
                            <span>{insight.category}</span>
                        </div>
                        <h2 className={`font-normal leading-tight max-w-4xl ${insight.featured
                                ? 'text-3xl'
                                : 'text-2xl group-hover:text-white'
                            }`}>
                            {insight.title}
                        </h2>
                    </div>
                    <div className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all duration-300 ease-in-out bg-white text-black ${insight.featured
                            ? 'border-white text-white group-hover:bg-white group-hover:text-blue-600'
                            : 'border-black text-black group-hover:border-white group-hover:text-white'
                        }`}>
                        <ArrowUpRight
                            size={20}
                            className="transition-transform duration-300 ease-in-out group-hover:rotate-45 text-black"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-8 py-16 bg-white">
            <h1 className="text-5xl font-medium mb-16">Portfolio insights</h1>

            <hr className="border-gray-500 mb-12" />

            <div className="space-y-0">
                {insights.map((insight, index) => (
                    <InsightCard
                        key={insight.id}
                        insight={insight}
                        isLast={index === insights.length - 1}
                    />
                ))}
            </div>

            <button className='flex items-center justify-center group mt-5 ml-5 text-lg cursor-pointer'>
                View All <CircleArrowOutUpRight size={24} className="inline-block ml-2 group-hover:rotate-45 transition-all" />
            </button>
        </div>
    );
};

export default PortfolioInsights;