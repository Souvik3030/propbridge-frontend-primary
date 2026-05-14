import React from 'react';
import { LayoutGrid, Building2, CheckCircle2, TrendingUp } from 'lucide-react';

const QuickInsights = () => {
  const insights = [
    { 
      label: 'Total DLD Areas', 
      value: '176', 
      icon: <LayoutGrid className="w-[18px] h-[18px] stroke-[#3b82f6]" />, 
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f612]',
      circleColor: 'bg-[#3b82f606]'
    },
    { 
      label: 'Active Off-Plan', 
      value: '1109', 
      icon: <Building2 className="w-[18px] h-[18px] stroke-[#c9a84c]" />, 
      color: 'text-[#c9a84c]',
      bgColor: 'bg-[#c9a84c12]',
      circleColor: 'bg-[#c9a84c06]'
    },
    { 
      label: 'Ready Properties', 
      value: '12,666', 
      icon: <CheckCircle2 className="w-[18px] h-[18px] stroke-[#10b981]" />, 
      color: 'text-[#10b981]',
      bgColor: 'bg-[#10b98112]',
      circleColor: 'bg-[#10b98106]'
    },
    { 
      label: 'Average ROI', 
      value: '6.5%', 
      icon: <TrendingUp className="w-[18px] h-[18px] stroke-[#8b5cf6]" />, 
      color: 'text-[#8b5cf6]',
      bgColor: 'bg-[#8b5cf612]',
      circleColor: 'bg-[#8b5cf606]'
    },
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <div className="w-1 h-6 rounded-[2px] bg-[linear-gradient(rgb(16,185,129),rgb(59,130,246))]"></div>
        <h2 className="text-[22px] font-bold font-serif text-[#111424] dark:text-[#f0f0f0] m-0 transition-colors">Quick Insights</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[14px]">
        {insights.map((insight, idx) => (
          <div 
            key={idx}
            className="group bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[14px] p-[20px_16px] text-center relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-none hover:border-slate-300 dark:hover:border-white/10"
          >
            {/* Background Decoration */}
            <div className={`absolute -bottom-[10px] -right-[10px] w-[50px] h-[50px] rounded-full ${insight.circleColor} pointer-events-none group-hover:scale-125 transition-transform opacity-60 dark:opacity-100`}></div>
            
            {/* Icon Wrapper */}
            <div className={`w-10 h-10 rounded-[12px] ${insight.bgColor} flex items-center justify-center mx-auto mb-3 relative z-10 transition-transform group-hover:scale-110`}>
              {insight.icon}
            </div>

            {/* Value */}
            <div className={`text-[26px] font-extrabold ${insight.color} font-mono leading-[1.1] mb-1 relative z-10 tracking-tight`}>
              {insight.value}
            </div>

            {/* Label */}
            <div className="text-[12px] text-slate-500 dark:text-[#8892a4] font-medium relative z-10 transition-colors">
              {insight.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickInsights;