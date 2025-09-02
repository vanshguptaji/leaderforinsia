import { useState } from "react";

export default function InvestorTeam() {
  const [activeTab, setActiveTab] = useState("ALL");

  const tabs = ["ALL", "MAIN BOARD", "MANAGING PARTNERS"];

  const team = [
    { name: "John Carter", role: "CEO & CO - FOUNDER", imgClass: "bg-gray-200" },
    { name: "Sophie Moore", role: "SENIOR PARTNER", imgClass: "bg-gray-100" },
    { name: "Andy Smith", role: "MANAGING PARTNER", imgClass: "bg-gray-300" },
    { name: "Team Member", role: "POSITION TITLE", imgClass: "bg-gray-50" },
    { name: "Team Member", role: "POSITION TITLE", imgClass: "bg-gray-100" },
    { name: "Team Member", role: "POSITION TITLE", imgClass: "bg-gray-200" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      {/* Tabs */}
      <nav className="flex gap-10 border-b border-gray-200 pb-5 mb-10 mt-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase tracking-wide text-lg font-medium transition-colors relative pb-4
              ${activeTab === tab ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-900"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

  {/* Team Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto justify-center">
        {team.map((member, idx) => (
          <div
            key={idx}
            onClick={() => console.log("Clicked on:", member.name)}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 relative hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500"
          >
            {/* Image Placeholder */}
            <div
              className={`w-full h-[350px] ${member.imgClass} relative bg-cover bg-center`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Info */}
            <div className="p-6 relative">
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-200">
                {member.name}
              </h3>
              <p className="text-sm uppercase tracking-wider text-gray-500 font-medium group-hover:text-blue-500 transition-colors duration-200">
                {member.role}
              </p>

              {/* Arrow Icon */}
              <span className="absolute top-5 right-5 text-blue-500 opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
