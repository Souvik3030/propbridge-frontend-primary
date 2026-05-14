import React from 'react';

const StatBadge = ({ value, label, colorClass }) => (
  <div className="bg-white/10 rounded-[10px] py-[10px] px-4 text-center min-w-[100px] transition-all hover:bg-white/15">
    <div className={`text-[20px] font-[800] font-mono leading-tight ${colorClass}`}>
      {value}
    </div>
    <div className="text-[10px] color-white/50 uppercase tracking-tight mt-0.5 font-bold">
      {label}
    </div>
  </div>
);

const OperationsCommandCenter = () => {
  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-[16px] p-[28px_32px] mb-6 flex flex-wrap justify-between items-center gap-4 shadow-xl border border-white/5 transition-all">
      <div className="flex flex-col">
        <h1 className="text-[26px] font-[800] font-serif text-white mb-1.5 leading-tight">
          Operations Command Center
        </h1>
        <p className="text-[14px] text-white/60 font-medium tracking-tight">
          Real-time listing compliance, portal feeds, and team performance
        </p>
      </div>

      <div className="flex gap-3">
        <StatBadge 
          value="14" 
          label="Listings" 
          colorClass="text-[#c9a84c]" 
        />
        <StatBadge 
          value="14" 
          label="Passing" 
          colorClass="text-[#10b981]" 
        />
        <StatBadge 
          value="0" 
          label="Failing" 
          colorClass="text-[#ef4444]" 
        />
      </div>
    </div>
  );
};

export default OperationsCommandCenter;
