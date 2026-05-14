import React from 'react';

const MarketStatCard = ({ label, value, Icon }) => {
  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[12px] p-[18px_16px] shadow-sm transition-all hover:border-[#c9a84c60] hover:shadow-md group">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-9 h-9 rounded-[10px] bg-[#c9a84c12] dark:bg-[#c9a84c1a] flex items-center justify-center transition-all group-hover:scale-110">
          {Icon && <Icon className="w-[18px] h-[18px] text-[#a38847] dark:text-[#c9a84c]" />}
        </div>
        <span className="text-[11px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-[22px] font-[800] font-mono text-[#c9a84c] dark:text-[#c9a84c] leading-none tracking-tight">
        {value}
      </div>
    </div>
  );
};

export default MarketStatCard;
