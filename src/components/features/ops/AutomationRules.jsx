import React from 'react';
import { RefreshCw, Play, Settings2 } from 'lucide-react';

const automationRules = [
  {
    id: 1,
    title: 'Refresh Stale Listings',
    trigger: 'Views < 10 in 7 days',
    freq: 'Daily 6 AM',
    affected: 23,
    status: 'ACTIVE'
  },
  {
    id: 2,
    title: 'Boost Premium Properties',
    trigger: 'Price > 5M AED',
    freq: 'Every 48h',
    affected: 8,
    status: 'ACTIVE'
  },
  {
    id: 3,
    title: 'Auto-Archive Inactive',
    trigger: 'No views 30 days',
    freq: 'Weekly',
    affected: 4,
    status: 'ACTIVE'
  }
];

const AutomationCard = ({ rule }) => {
  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-black/5 dark:border-white/5 rounded-[16px] p-5 flex items-center justify-between group shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-[12px] bg-[#c9a84c12] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <RefreshCw size={20} className="text-[#c9a84c]" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[15px] font-[800] text-[#1a1a2e] dark:text-[#f0f0f0] font-serif leading-none transition-colors">
            {rule.title}
          </h4>
          <div className="flex items-center gap-3 text-[11px] font-medium mt-2">
            <span className="text-slate-400 dark:text-[#8892a4] transition-colors">
              Trigger: <span className="text-[#c9a84c] font-bold">{rule.trigger}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
            <span className="text-slate-400 dark:text-[#8892a4] transition-colors">
              Freq: <span className="text-slate-500 dark:text-slate-300 font-bold">{rule.freq}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <span className="text-[20px] font-[800] font-mono text-[#c9a84c] leading-none">
            {rule.affected}
          </span>
          <span className="text-[9px] font-[800] text-slate-400 dark:text-[#8892a4] tracking-widest uppercase mt-1 transition-colors">
            AFFECTED
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
            <span className="text-[10px] font-[800] tracking-tight text-[#10b981]">
              {rule.status}
            </span>
          </div>
          <button className="p-2 text-slate-400 hover:text-[#c9a84c] transition-colors">
            <Settings2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AutomationRules = () => {
  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-2 px-2">
        <p className="text-[12px] text-slate-500 dark:text-[#8892a4] font-medium">
          Active automation workflows monitoring your listings 24/7.
        </p>
        <button className="text-[11px] font-bold text-[#c9a84c] flex items-center gap-1.5 hover:underline transition-all">
          <Play size={12} fill="currentColor" />
          Run All Rules
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {automationRules.map((rule) => (
          <AutomationCard key={rule.id} rule={rule} />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-[11px] text-slate-400 dark:text-[#8892a4] font-medium italic opacity-60 transition-colors">
          Changes apply in real-time • Drag handles to reorder priority
        </p>
      </div>
    </div>
  );
};

export default AutomationRules;
