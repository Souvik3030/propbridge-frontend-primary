import React from 'react';

const topCommunities = [
  { name: 'JUMEIRAH VILLAGE CIRCLE', rank: '1st', sales: '2,246', sqft: '1,395', mortgage: '21%', breakdown: ['1 B/R: 1557', 'Studio: 703', '2 B/R: 402', '3 B/R: 107'], ranges: 'Min: AED 0.0M · Max: AED 45.5M · Median: AED 1.0M', locations: 'Dubai Internet City · Marina Mall', projects: ['Luma Park Views (154 txns)', 'PEARL HOUSE IV BY IMTIAZ (69 txns)', 'Binghatti Phoenix (64 txns)'] },
  { name: 'AL YELAYISS 1', rank: '2nd', sales: '2,020', sqft: '437', mortgage: '0%', breakdown: ['4 B/R: 1328', '5 B/R: 645', 'Unknown: 47'], ranges: 'Min: AED 0.4M · Max: AED 1426.3M · Median: AED 2.9M', locations: '', projects: ['DAMAC ISLANDS 2 - BAHAMAS 1 (315 txns)', 'DAMAC ISLANDS 2 - BAHAMAS 2 (311 txns)', 'DAMAC ISLANDS 2 - BERMUDA (248 txns)'] },
  { name: 'MADINAT AL MATAAR', rank: '3rd', sales: '1,612', sqft: '721', mortgage: '7%', breakdown: ['1 B/R: 474', '2 B/R: 429', 'Studio: 324', 'Unknown: 177'], ranges: 'Min: AED 0.2M · Max: AED 66.2M · Median: AED 1.5M', locations: '', projects: ['WINDSOR HOUSE (253 txns)', 'Terra Gardens (162 txns)', 'WINDSOR HOUSE II (100 txns)'] },
  { name: 'DUBAI LAND RESIDENCE COMPLEX', rank: '', sales: '1,463', sqft: '1,331', mortgage: '5%', breakdown: ['Studio: 696', '1 B/R: 583', '2 B/R: 212', '3 B/R: 33'], ranges: 'Min: AED 0.3M · Max: AED 91.5M · Median: AED 0.8M', locations: '', projects: ['Samana Boulevard Heights (184 txns)', 'Cove Grand Residence by Imtiaz (90 txns)', 'Weybridge Gardens 5 (84 txns)'] },
  { name: 'MAJAN', rank: '', sales: '1,095', sqft: '1,335', mortgage: '15%', breakdown: ['Studio: 612', '1 B/R: 415', '2 B/R: 186', 'NA: 48'], ranges: 'Min: AED 0.4M · Max: AED 72.5M · Median: AED 0.7M', locations: '', projects: ['Binghatti Vintage (470 txns)', 'Paradise View 1 (264 txns)', 'Samana Barari Heights (75 txns)'] },
  { name: 'JUMEIRAH VILLAGE TRIANGLE', rank: '', sales: '768', sqft: '1,434', mortgage: '11%', breakdown: ['1 B/R: 412', 'Studio: 225', '2 B/R: 133', 'Unknown: 58'], ranges: 'Min: AED 0.4M · Max: AED 51.0M · Median: AED 1.2M', locations: 'Damac Properties · Marina Mall', projects: ['SOL LEVANTE (88 txns)', 'INTERSTELLAR TOWER (81 txns)', 'VOXA RESIDENCES (67 txns)'] },
  { name: 'DUBAI PRODUCTION CITY', rank: '', sales: '736', sqft: '1,259', mortgage: '20%', breakdown: ['1 B/R: 395', 'Studio: 286', '2 B/R: 204', '3 B/R: 31'], ranges: 'Min: AED 0.0M · Max: AED 80.7M · Median: AED 1.0M', locations: 'Damac Properties · Marina Mall', projects: ['IVY AT PARK FIVE (94 txns)', 'Vista by Vision (87 txns)', 'ELM AT PARK FIVE (63 txns)'] },
  { name: 'ARJAN', rank: '', sales: '721', sqft: '1,555', mortgage: '43%', breakdown: ['Studio: 474', '1 B/R: 443', '2 B/R: 187', 'NA: 117'], ranges: 'Min: AED 0.1M · Max: AED 6.5M · Median: AED 1.0M', locations: 'Sharaf Dg Metro Station · Mall of the Emirates', projects: ['THE WINGS (151 txns)', 'Marquis One (94 txns)', 'Vincitore Benessere (80 txns)'] },
  { name: 'BUSINESS PARK', rank: '', sales: '688', sqft: '3,545', mortgage: '0%', breakdown: ['Studio: 506', '1 B/R: 112', '2 B/R: 59', '3 B/R: 8'], ranges: 'Min: AED 1.3M · Max: AED 6.1M · Median: AED 1.4M', locations: 'Creek Metro Station · Dubai Mall', projects: ['Maybach Six (475 txns)', 'Project Maybach (94 txns)', 'Maybach Ultimate Luxury (90 txns)'] },
  { name: 'AL KHAIRAN FIRST', rank: '', sales: '685', sqft: '2,624', mortgage: '0%', breakdown: ['1 B/R: 299', '2 B/R: 294', '3 B/R: 93'], ranges: 'Min: AED 0.8M · Max: AED 6.8M · Median: AED 3.0M', locations: '', projects: ['Creek Haven (212 txns)', 'Creek Bay (192 txns)', 'Lyvia by Palace (119 txns)'] },
  { name: 'DUBAI SPORTS CITY', rank: '', sales: '684', sqft: '1,383', mortgage: '16%', breakdown: ['Studio: 292', '1 B/R: 262', '2 B/R: 200', 'Unknown: 42'], ranges: 'Min: AED 0.2M · Max: AED 17.4M · Median: AED 1.0M', locations: 'Nakheel Metro Station · Marina Mall', projects: ['Hadley Heights 2 (104 txns)', 'VERDE BY VISION (70 txns)', 'ASPIRZ By Danube (59 txns)'] },
  { name: 'MOTOR CITY', rank: '', sales: '623', sqft: '1,482', mortgage: '15%', breakdown: ['1 B/R: 332', 'Studio: 164', '2 B/R: 162', '3 B/R: 29'], ranges: 'Min: AED 0.2M · Max: AED 72.0M · Median: AED 1.3M', locations: 'Dubai Internet City · Mall of the Emirates', projects: ['SIERRA BY IMAN (192 txns)', 'Sobha Solis (46 txns)', 'Mirdad (46 txns)'] },
];

const CommunityCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm font-sans flex flex-col h-full relative transition-colors duration-200">

      {/* Name and Rank */}
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 pr-12">
          {data.name}
        </h3>
        {data.rank && (
          <span className="absolute top-6 right-6 text-[18px] font-medium text-[#A9B1BD] dark:text-slate-500">
            {data.rank}
          </span>
        )}
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center mb-5">
        <div>
          <p className="text-[20px] font-bold text-blue-500 dark:text-blue-400">{data.sales}</p>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium uppercase">Sales</p>
        </div>
        <div>
          <p className="text-[16px] font-bold text-amber-500 dark:text-amber-400 mt-1">AED {data.sqft}</p>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium uppercase">Per sqft</p>
        </div>
        <div>
          <p className="text-[18px] font-bold text-emerald-500 dark:text-emerald-400 mt-1">{data.mortgage}</p>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium uppercase">Mortgage</p>
        </div>
      </div>

      {/* Type Breakdown Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.breakdown.map((item, idx) => (
          <span
            key={idx}
            className="text-[11px] font-bold px-3 py-1 rounded-lg bg-[#F9F6FF] dark:bg-indigo-950/40 text-[#937CF2] dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-900/50"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Statistical Ranges */}
      <p className="text-[11px] text-gray-400 dark:text-slate-400 mb-2">{data.ranges}</p>

      {/* Secondary Location Tags */}
      {data.locations && (
        <p className="text-[11px] text-gray-400/80 dark:text-slate-500 font-medium mb-5">{data.locations}</p>
      )}

      {/* Conditionally Render Top Projects Section */}
      {data.projects.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
          <p className="text-[12px] font-bold text-gray-500 dark:text-slate-400 mb-2">Top Projects:</p>
          {data.projects.map((proj, idx) => (
            <p key={idx} className="text-[11px] text-gray-400 dark:text-slate-500 leading-relaxed truncate">
              • {proj}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const CommunityDeepDive = () => {
  return (
    <div className=" p-4 md:p-6 min-h-screen transition-colors duration-200">
      <div className=" mx-auto">
        <h2 className="text-[20px] font-bold text-slate-900 dark:text-white mb-10">
          Area Deep Dive — Top Performing Communities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCommunities.map((community, index) => (
            <CommunityCard key={index} data={community} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDeepDive;