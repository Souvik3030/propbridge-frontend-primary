import React from 'react';
import { RefreshCw } from 'lucide-react';

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
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[18px] p-4 flex items-center justify-between group hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#fdfaf3] dark:bg-[#ccab59]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <RefreshCw size={16} className="text-[#ccab59]" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[14px] font-bold text-slate-800 dark:text-white leading-tight">
            {rule.title}
          </h4>
          <div className="flex items-center gap-3 text-[11px] font-medium mt-0.5">
            <span className="text-slate-400">
              Trigger: <span className="text-slate-500 dark:text-slate-300 tracking-tight">{rule.trigger}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            <span className="text-slate-400">
              Freq: <span className="text-slate-500 dark:text-slate-300 tracking-tight">{rule.freq}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-[15px] font-bold text-[#ccab59]">
            {rule.affected}
          </span>
          <span className="text-[9px] font-black text-slate-300 dark:text-slate-500 tracking-widest uppercase">
            AFFECTED
          </span>
        </div>

        <div className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
          <span className="text-[10px] font-black tracking-widest text-emerald-500">
            {rule.status}
          </span>
        </div>
      </div>
    </div>
  );
};

const AutomationRules = () => {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {automationRules.map((rule) => (
        <AutomationCard key={rule.id} rule={rule} />
      ))}
      
      <div className="mt-2 text-center">
        <p className="text-[11px] text-slate-400 font-medium italic opacity-60">
          Changes apply in real-time • Drag to reorder
        </p>
      </div>
    </div>
  );
};

export default AutomationRules;
