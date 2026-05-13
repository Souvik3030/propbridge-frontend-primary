import React from 'react';
import { Grid, Building2, CheckCircle2, BarChart3 } from 'lucide-react';

const QuickInsights = () => {
  const insights = [
    { 
      label: 'Total DLD Areas', 
      value: '176', 
      icon: <Grid className="w-5 h-5 text-blue-500" />, 
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400' 
    },
    { 
      label: 'Active Off-Plan', 
      value: '1109', 
      icon: <Building2 className="w-5 h-5 text-[#ccab59]" />, 
      bgColor: 'bg-orange-50/50 dark:bg-orange-900/10',
      textColor: 'text-[#ccab59]' 
    },
    { 
      label: 'Ready Properties', 
      value: '12,666', 
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, 
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-600 dark:text-emerald-400' 
    },
    { 
      label: 'Average ROI', 
      value: '6.5%', 
      icon: <BarChart3 className="w-5 h-5 text-purple-500" />, 
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400' 
    },
  ];

  return (
    <section className="mb-12">
      {/* Header with teal/gold accent */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-[3px] h-6 bg-[#1a73e8] dark:bg-[#ccab59]"></div>
        <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white font-serif">
          Quick Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {insights.map((insight, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden bg-white dark:bg-[#111827] p-10 rounded-2xl border border-[#ece7d9] dark:border-slate-800 flex flex-col items-center justify-center text-center transition-all shadow-sm"
          >
            {/* Background Decorative Circle (Bottom Right) */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-slate-50 dark:bg-slate-800/40 rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Soft Squared Icon Background */}
              <div className={`p-3 rounded-xl ${insight.bgColor} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                {insight.icon}
              </div>

              {/* Value with specific tracking */}
              <h3 className={`text-3xl font-bold mb-2 tracking-tight ${insight.textColor}`}>
                {insight.value}
              </h3>

              {/* Label */}
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {insight.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickInsights;