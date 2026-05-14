import React from 'react';

const MarketHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
      <h2 className="text-[26px] font-[800] font-serif text-[#1a1a2e] dark:text-[#f0f0f0] mb-[6px] tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-[14px] text-slate-500 dark:text-[#8892a4] font-medium">
        {subtitle}
      </p>
    </div>
  );
};

export default MarketHeader;
