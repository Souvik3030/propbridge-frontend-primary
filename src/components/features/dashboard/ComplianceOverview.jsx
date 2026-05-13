import React from 'react';

const ComplianceBar = ({ label, percentage, color }) => {
  const colorMap = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-400',
    blue: 'bg-blue-500',
  };
  
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className="text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
        <span className={`${color === 'emerald' ? 'text-emerald-500' : color === 'amber' ? 'text-amber-500' : 'text-blue-500'}`}>
          {percentage}%
        </span>
      </div>
      <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${colorMap[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const ComplianceOverview = () => {
  const metrics = [
    { label: 'Valid Permits', percentage: 38, color: 'emerald' },
    { label: '5+ Photos', percentage: 100, color: 'amber' },
    { label: 'Arabic Title', percentage: 100, color: 'blue' },
    { label: 'Avg Compliance', percentage: 91, color: 'emerald' },
  ];

  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-3 shadow-sm h-full">
      <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
        Compliance Overview
      </h3>
      
      <div className="flex flex-col gap-4 flex-1 justify-center mt-1">
        {metrics.map((metric) => (
          <ComplianceBar key={metric.label} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default ComplianceOverview;
