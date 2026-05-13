import React from 'react';

const StatCard = ({ value, label, colorClass }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[110px] transition-all hover:bg-white/10">
    <span className={`text-[28px] font-bold leading-none ${colorClass}`}>
      {value}
    </span>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 text-center">
      {label}
    </span>
  </div>
);

const OperationsCommandCenter = () => {
  return (
    <div className="bg-[#1a1c2e] dark:bg-[#0f111a] rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/5">
      <div className="flex flex-col gap-1 text-center md:text-left">
        <h1 className="text-[24px] font-serif font-bold text-white leading-tight tracking-tight">
          Operations Command Center
        </h1>
        <p className="text-[12px] text-slate-400 font-medium">
          Real-time listing compliance, portal feeds, and team performance
        </p>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar justify-center">
        <StatCard 
          value="1,284" 
          label="LISTINGS" 
          colorClass="text-[#ccab59]" 
        />
        <StatCard 
          value="1,142" 
          label="PASSING" 
          colorClass="text-emerald-400" 
        />
        <StatCard 
          value="142" 
          label="FAILING" 
          colorClass="text-red-400" 
        />
      </div>
    </div>
  );
};

export default OperationsCommandCenter;
