import React from 'react';

const PortalDistribution = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px]">
      <div className="text-[16px] font-bold text-[#1a1a2e] dark:text-white font-serif mb-[8px]">
        Portal Distribution
      </div>
      <svg viewBox="0 0 120 120" className="w-full h-[120px]">
        <path d="M60,10 A50,50 0 0 1 84.08768370508578,103.81533400219317 L74.45261022305147,86.2892004013159 A30,30 0 0 0 60,30 Z" fill="#c9a84c"></path>
        <path d="M84.08768370508578,103.81533400219317 A50,50 0 0 1 10.394264934276109,53.733338321784785 L30.236558960565663,56.240002993070874 A30,30 0 0 0 74.45261022305147,86.2892004013159 Z" fill="#10b981"></path>
        <path d="M10.394264934276109,53.733338321784785 A50,50 0 0 1 59.99999999999999,10 L59.99999999999999,30 A30,30 0 0 0 30.236558960565663,56.240002993070874 Z" fill="#f59e0b"></path>
      </svg>
      <div className="flex flex-col gap-[6px] mt-[6px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#c9a84c]"></div>
            <span className="text-[13px] text-gray-500 dark:text-gray-400">Property Finder</span>
          </div>
          <span className="text-[13px] font-bold text-[#1a1a2e] dark:text-white">42%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#10b981]"></div>
            <span className="text-[13px] text-gray-500 dark:text-gray-400">Bayut</span>
          </div>
          <span className="text-[13px] font-bold text-[#1a1a2e] dark:text-white">35%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#f59e0b]"></div>
            <span className="text-[13px] text-gray-500 dark:text-gray-400">Dubizzle</span>
          </div>
          <span className="text-[13px] font-bold text-[#1a1a2e] dark:text-white">23%</span>
        </div>
      </div>
    </div>
  );
};

export default PortalDistribution;

