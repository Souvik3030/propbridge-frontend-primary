import React from 'react';

const MetricCard = ({ value, label, description, accentColor }) => (
  <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[12px] p-[18px_16px] text-center relative overflow-hidden shadow-sm transition-all hover:shadow-md">
    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: accentColor }} />
    <div className="text-[32px] font-[800] font-mono leading-none" style={{ color: accentColor }}>
      {value}
    </div>
    <div className="text-[12px] font-[700] text-[#1a1a2e] dark:text-[#f0f0f0] mt-2 uppercase tracking-[0.5px]">
      {label}
    </div>
    <div className="text-[11px] text-slate-400 dark:text-[#8892a4] mt-1 font-medium">
      {description}
    </div>
  </div>
);

const ComplianceSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[20px] animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
      <MetricCard 
        value="14" 
        label="Total Listings" 
        description="All managed listings" 
        accentColor="#c9a84c"
      />
      <MetricCard 
        value="14" 
        label="Compliance Pass" 
        description="Meeting all requirements" 
        accentColor="#10b981"
      />
      <MetricCard 
        value="0" 
        label="Compliance Fail" 
        description="Needs attention" 
        accentColor="#ef4444"
      />
      <MetricCard 
        value="84" 
        label="Avg Score" 
        description="Out of 100" 
        accentColor="#f59e0b"
      />
    </div>
  );
};

export default ComplianceSummary;
