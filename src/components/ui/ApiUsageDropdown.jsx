import React from 'react';

const ApiUsageDropdown = () => {
  return (
    <div className="absolute top-[calc(100%+12px)] right-0 w-[300px] bg-white dark:bg-[#1a1c29] border border-[#e5dfce] dark:border-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-2xl py-4 flex flex-col z-50 transition-colors">
      <h3 className="px-5 text-[13px] font-bold text-[#111424] dark:text-white mb-4 transition-colors">
        API Usage Details
      </h3>
      
      <div className="flex flex-col gap-3 px-5 text-[12px] text-gray-500 dark:text-gray-400 transition-colors">
        <div className="flex items-center gap-1">
          <span>Projects:</span>
          <span className="font-semibold text-[#111424] dark:text-gray-200 transition-colors">0 cached</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span>Last refresh:</span>
          <span className="font-semibold text-[#111424] dark:text-gray-200 transition-colors">N/A</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span>Images cached:</span>
          <span className="font-semibold text-[#111424] dark:text-gray-200 transition-colors">0 projects</span>
        </div>
        
        <div className="flex items-center gap-1 line-through opacity-70">
          <span>DLD Data:</span>
          <span>Not imported</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Next batch:</span>
          <span className="font-semibold text-[#111424] dark:text-gray-200 transition-colors">Pending</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 px-5 border-t border-[#e5dfce] dark:border-gray-800/80 transition-colors">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 transition-colors">
          Resets at midnight
        </p>
      </div>
    </div>
  );
};

export default ApiUsageDropdown;
