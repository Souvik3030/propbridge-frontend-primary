import React from 'react';
import { FileText, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';

const SummaryCard = ({ label, value, icon, color, trend, subValue }) => (
  <div className="flex-1 bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[20px] p-4 flex flex-col gap-3 relative overflow-hidden group hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className={`absolute top-0 left-0 w-full h-[3px] ${color}`} />
    
    <div className="flex items-center justify-between relative z-10">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-black text-slate-300 dark:text-slate-500 tracking-widest uppercase">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-[20px] font-bold text-slate-800 dark:text-white leading-none">{value}</span>
          <span className="text-[11px] font-bold text-emerald-500">{trend}</span>
        </div>
      </div>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-white/5 opacity-80 group-hover:scale-110 transition-transform ${color.replace('bg-', 'text-')}`}>
        {icon}
      </div>
    </div>
    
    <div className="flex items-center gap-2 pt-1 border-t border-dashed border-slate-100 dark:border-slate-800/50">
      <div className="flex -space-x-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-4 h-4 rounded-full border border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>
      <span className="text-[10px] text-slate-400 font-medium">{subValue}</span>
    </div>
  </div>
);

const ComplianceSummary = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <SummaryCard 
        label="Total Listings" 
        value="1,284" 
        icon={<FileText size={16} />} 
        color="bg-[#ccab59]"
        trend="+12"
        subValue="Managing 42 agents"
      />
      <SummaryCard 
        label="Compliance Pass" 
        value="1,142" 
        icon={<CheckCircle2 size={16} />} 
        color="bg-emerald-500"
        trend="92%"
        subValue="Average score: 88"
      />
      <SummaryCard 
        label="Compliance Fail" 
        value="142" 
        icon={<AlertCircle size={16} />} 
        color="bg-red-500"
        trend="-4"
        subValue="Requires immediate fix"
      />
      <SummaryCard 
        label="Avg. Score" 
        value="84.2" 
        icon={<BarChart3 size={16} />} 
        color="bg-[#ccab59]"
        trend="+2.1"
        subValue="Target: 90.0"
      />
    </div>
  );
};

export default ComplianceSummary;
