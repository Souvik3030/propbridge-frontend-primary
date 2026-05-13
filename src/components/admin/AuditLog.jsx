import React from 'react';

const AuditLog = () => {
  const logs = [
    { id: 1, timestamp: '3/23/2026, 12:24:37 PM', actionType: 'role_switch', description: 'Changed role from admin to superadmin', user: 'Ishika Vishnoi' },
    { id: 2, timestamp: '3/23/2026, 12:24:34 PM', actionType: 'role_switch', description: 'Changed role from superadmin to admin', user: 'Ishika Vishnoi' },
    { id: 3, timestamp: '3/23/2026, 12:03:52 PM', actionType: 'role_switch', description: 'Changed role from listing_agent to superadmin', user: 'Ishika Vishnoi' },
    { id: 4, timestamp: '3/23/2026, 12:01:09 PM', actionType: 'role_switch', description: 'Changed role from admin to listing_agent', user: 'Ishika Vishnoi' },
    { id: 5, timestamp: '3/23/2026, 12:01:06 PM', actionType: 'role_switch', description: 'Changed role from superadmin to admin', user: 'Ishika Vishnoi' },
    { id: 6, timestamp: '3/23/2026, 11:59:55 AM', actionType: 'role_changed', description: 'Changed user_1 to superadmin', user: 'Ishika Vishnoi' },
    { id: 7, timestamp: '3/23/2026, 11:59:52 AM', actionType: 'role_switch', description: 'Changed role from admin to superadmin', user: 'Ishika Vishnoi' },
    { id: 8, timestamp: '3/23/2026, 11:59:43 AM', actionType: 'role_changed', description: 'Changed user_1 to listing_owner', user: 'Ishika Vishnoi' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <h3 className="text-slate-900 dark:text-white font-serif font-bold text-xl">
          Audit Log
        </h3>
        <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-xl text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          Clear Log
        </button>
      </div>

      <div className="p-8">
        <div className="space-y-6">
          {logs.map((log) => (
            <div key={log.id} className="grid grid-cols-1 md:grid-cols-12 items-center text-sm group">
              <div className="md:col-span-2 text-slate-300 dark:text-slate-500 font-medium whitespace-nowrap">
                {log.timestamp}
              </div>
              <div className="md:col-span-2 px-4">
                <span className="text-[#ccab59] font-black uppercase tracking-widest text-[11px]">
                  {log.actionType}
                </span>
              </div>
              <div className="md:col-span-6 text-slate-500 dark:text-slate-400 font-medium">
                {log.description}
              </div>
              <div className="md:col-span-2 text-right text-slate-300 dark:text-slate-500 font-medium italic group-hover:text-slate-500 transition-colors">
                {log.user}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
