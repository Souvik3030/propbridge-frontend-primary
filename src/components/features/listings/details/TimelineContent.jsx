import React from 'react';
import { Plus, Check, Globe, Edit3 } from 'lucide-react';

const TimelineContent = ({ listing }) => {
  const events = [
    { title: 'Created', user: 'Mohammad Ali', role: 'Owner', date: 'Jan 15', icon: Plus, color: 'text-amber-500 bg-amber-50' },
    { title: 'Agent Approved', user: 'Ahmed Khan', role: 'Agent', date: 'Jan 15', icon: Check, color: 'text-emerald-500 bg-emerald-50' },
    { title: 'Published to Bayut & Dubizzle', user: 'Ahmed Khan', role: 'Agent', date: 'Jan 16', icon: Globe, color: 'text-blue-500 bg-blue-50' },
    { title: 'Updated', user: 'Admin', role: 'Superadmin', date: 'Mar 18', icon: Edit3, color: 'text-slate-500 bg-slate-50' },
  ];

  return (
    <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-[1.5rem] p-7 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-0 relative">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 relative">
            {/* Timeline Line */}
            {i !== events.length - 1 && (
              <div className="absolute left-4 top-8 w-px h-full bg-[#f3efe6] dark:bg-slate-800" />
            )}
            
            {/* Icon */}
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border border-[#ece7d9] dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 group relative z-10`}>
              <event.icon size={14} />
            </div>

            {/* Content */}
            <div className="pb-8">
              <h4 className="text-[13px] font-black text-slate-800 dark:text-white leading-tight mb-1 uppercase tracking-tight">{event.title}</h4>
              <p className="text-[11px] font-bold text-slate-400">
                {event.user} · <span className={event.role === 'Owner' ? 'text-amber-500' : event.role === 'Agent' ? 'text-blue-500' : 'text-[#ccab59]'}>{event.role}</span> · {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineContent;
