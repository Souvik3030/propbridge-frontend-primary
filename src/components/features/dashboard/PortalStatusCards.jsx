import React from 'react';

const PortalCard = ({ name, status, metrics }) => {
  const isWarning = status === 'Warning';
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-3 shadow-sm group hover:translate-y-1 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between">
        <h4 className="text-[14px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">{name}</h4>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
          isWarning ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-y-3">
        <div>
          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Pushed</p>
          <p className="text-[14px] font-serif font-bold text-slate-900 dark:text-white leading-none">{metrics.pushed}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Failed</p>
          <p className="text-[14px] font-serif font-bold text-slate-900 dark:text-white leading-none">{metrics.failed}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Rejected</p>
          <p className="text-[14px] font-serif font-bold text-slate-900 dark:text-white leading-none">{metrics.rejected}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Uptime</p>
          <p className="text-[14px] font-serif font-bold text-slate-900 dark:text-white leading-none">{metrics.uptime}%</p>
        </div>
      </div>
    </div>
  );
};

const PortalStatusCards = () => {
  const portals = [
    {
      name: 'Property Finder',
      status: 'Healthy',
      metrics: { pushed: 312, failed: 3, rejected: 8, uptime: 99.8 }
    },
    {
      name: 'Bayut',
      status: 'Healthy',
      metrics: { pushed: 298, failed: 1, rejected: 5, uptime: 99.9 }
    },
    {
      name: 'Dubizzle',
      status: 'Warning',
      metrics: { pushed: 245, failed: 12, rejected: 18, uptime: 97.2 }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {portals.map(portal => (
        <PortalCard key={portal.name} {...portal} />
      ))}
    </div>
  );
};

export default PortalStatusCards;
