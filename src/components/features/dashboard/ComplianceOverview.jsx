import React from 'react';

const ComplianceBar = ({ label, value, color }) => {
  const textColorClass = color === 'emerald-500' ? 'text-emerald-500' : color === 'amber-500' ? 'text-amber-500' : 'text-blue-500';
  const bgColorClass = color === 'emerald-500' ? 'bg-emerald-500' : color === 'amber-500' ? 'bg-amber-500' : 'bg-blue-500';

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1">
        <span className="text-[12px] text-gray-500 dark:text-gray-400">{label}</span>
        <span className={`text-[12px] font-bold ${textColorClass}`}>{value}%</span>
      </div>
      <div className="h-[6px] rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
        <div 
          className={`h-full rounded-full ${bgColorClass} transition-all duration-500`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

const ComplianceOverview = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px]">
      <div className="text-[16px] font-bold text-[#1a1a2e] dark:text-white font-serif mb-[12px]">
        Compliance Overview
      </div>
      <div>
        <ComplianceBar label="Valid Permits" value={38} color="emerald-500" />
        <ComplianceBar label="5+ Photos" value={100} color="amber-500" />
        <ComplianceBar label="Arabic Title" value={100} color="blue-500" />
        <ComplianceBar label="Avg Compliance" value={91} color="emerald-500" />
      </div>
    </div>
  );
};

export default ComplianceOverview;

