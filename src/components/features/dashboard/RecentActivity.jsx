import React from 'react';
import { CheckCircle2, RefreshCw, Send, FilePlus, AlertCircle, XCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'list',
    user: 'Ahmed',
    target: 'VW-2456 - Luxury 2BR Marina Gate',
    time: '2 hours ago',
    icon: CheckCircle2,
    color: 'emerald'
  },
  {
    id: 2,
    type: 'update',
    user: 'Sara',
    target: 'VW-2457 - Premium Villa Arabian Ranches',
    time: '4 hours ago',
    icon: RefreshCw,
    color: 'blue'
  },
  {
    id: 3,
    type: 'publish',
    user: 'Omar',
    target: 'VW-2458 to Bayut & PF',
    time: '5 hours ago',
    icon: Send,
    color: 'amber'
  },
  {
    id: 4,
    type: 'submit',
    user: 'New listing',
    target: 'VW-2459 submitted for approval',
    time: '8 hours ago',
    icon: FilePlus,
    color: 'orange'
  },
  {
    id: 5,
    type: 'approve',
    user: 'VW-2462',
    target: 'approved and pushed to all portals',
    time: '12 hours ago',
    icon: CheckCircle2,
    color: 'emerald'
  },
  {
    id: 6,
    type: 'reject',
    user: 'VW-2461',
    target: 'rejected by PF - needs more images',
    time: '1 day ago',
    icon: AlertCircle,
    color: 'red'
  }
];

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400',
  blue: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-600/10 dark:text-amber-500',
  orange: 'bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400',
  red: 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400',
};

const RecentActivity = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-3 shadow-sm h-full">
      <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
        Recent Activity
      </h3>
      
      <div className="flex flex-col gap-3.5">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-2.5 group">
            <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${colorMap[item.color]}`}>
              <item.icon size={15} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] text-slate-700 dark:text-slate-300 font-medium leading-snug">
                <span className="font-bold text-slate-900 dark:text-white">{item.user}</span> {item.target}
              </p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
