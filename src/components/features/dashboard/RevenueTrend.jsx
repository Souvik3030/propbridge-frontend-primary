import React from 'react';

const RevenueTrend = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px]">
      <div className="text-[16px] font-bold text-[#1a1a2e] dark:text-white font-serif mb-[10px]">
        Revenue & Compliance Trend
      </div>
      <div>
        <svg viewBox="0 0 360 180" className="w-full h-[200px]">
          <defs>
            <linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c9a84c" stopOpacity="0.2"></stop>
              <stop offset="95%" stopColor="#c9a84c" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <path d="M25,75.78125 L87,82.12890625 L149,53.9453125 L211,47.08984375 L273,33.6328125 L335,25 L335,155 L25,155 Z" fill="url(#gGrad)"></path>
          <path d="M25,75.78125 L87,82.12890625 L149,53.9453125 L211,47.08984375 L273,33.6328125 L335,25" fill="none" stroke="#c9a84c" strokeWidth="2"></path>
          <path d="M25,53.599999999999994 L87,49.69999999999999 L149,45.8 L211,43.2 L273,40.599999999999994 L335,36.7" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,3"></path>
          
          <g className="text-gray-400 dark:text-gray-500 fill-current">
            <text x="25" y="174" textAnchor="middle" fontSize="10" fontFamily="'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif">Sep</text>
            <text x="87" y="174" textAnchor="middle" fontSize="10" fontFamily="'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif">Oct</text>
            <text x="149" y="174" textAnchor="middle" fontSize="10" fontFamily="'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif">Nov</text>
            <text x="211" y="174" textAnchor="middle" fontSize="10" fontFamily="'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif">Dec</text>
            <text x="273" y="174" textAnchor="middle" fontSize="10" fontFamily="'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif">Jan</text>
            <text x="335" y="174" textAnchor="middle" fontSize="10" fontFamily="'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif">Feb</text>
          </g>

          <circle cx="25" cy="75.78125" r="3" fill="#c9a84c"></circle>
          <circle cx="87" cy="82.12890625" r="3" fill="#c9a84c"></circle>
          <circle cx="149" cy="53.9453125" r="3" fill="#c9a84c"></circle>
          <circle cx="211" cy="47.08984375" r="3" fill="#c9a84c"></circle>
          <circle cx="273" cy="33.6328125" r="3" fill="#c9a84c"></circle>
          <circle cx="335" cy="25" r="3" fill="#c9a84c"></circle>
        </svg>
        <div className="flex gap-4 mt-[6px]">
          <div className="flex items-center gap-[5px] text-[11px] text-gray-400 dark:text-gray-500">
            <div className="w-[14px] h-[2px] bg-[#c9a84c]"></div>
            Revenue
          </div>
          <div className="flex items-center gap-[5px] text-[11px] text-gray-400 dark:text-gray-500">
            <div className="w-[14px] h-[2px] bg-[#10b981] border-t border-dashed border-[#10b981]"></div>
            Compliance
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrend;
