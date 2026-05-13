import React from 'react';
import { Globe, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

const portalData = [
  { id: 1, name: 'Property Finder', type: 'REST API', sync: '12 mins ago', status: 'Healthy', pushed: 842, failed: 2, rejected: 0, uptime: '99.9%' },
  { id: 2, name: 'Bayut', type: 'XML Feed', sync: '1 hour ago', status: 'Healthy', pushed: 1204, failed: 0, rejected: 1, uptime: '100%' },
  { id: 3, name: 'Dubizzle', type: 'XML Feed', sync: '45 mins ago', status: 'Degraded', pushed: 642, failed: 12, rejected: 4, uptime: '98.2%' },
];

const PortalCard = ({ portal }) => {
  const isHealthy = portal.status === 'Healthy';
  
  return (
    <div className="flex-1 bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[20px] p-4 flex flex-col gap-4 group hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#fdfaf3] dark:bg-[#ccab59]/10 flex items-center justify-center">
            <Globe size={14} className="text-[#ccab59]" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold text-slate-800 dark:text-white leading-none">{portal.name}</h4>
            <span className="text-[9px] font-black text-slate-300 dark:text-slate-500 tracking-widest uppercase mt-0.5">{portal.type}</span>
          </div>
        </div>
        <div className={`px-2 py-0.5 rounded-full border text-[9px] font-black tracking-widest ${
          isHealthy ? 'bg-emerald-50 border-emerald-100 text-emerald-500 dark:bg-emerald-500/10' : 'bg-orange-50 border-orange-100 text-orange-500 dark:bg-orange-500/10'
        }`}>
          {portal.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-3 border-b border-dashed border-slate-100 dark:border-slate-800/50">
        <HealthStat label="Pushed" value={portal.pushed} color="text-slate-800 dark:text-white" />
        <HealthStat label="Failed" value={portal.failed} color="text-red-500" />
        <HealthStat label="Rejected" value={portal.rejected} color="text-orange-500" />
        <HealthStat label="Uptime" value={portal.uptime} color="text-emerald-500" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-400">
          <RefreshCw size={10} />
          <span className="text-[10px] font-medium">{portal.sync}</span>
        </div>
        <button className="text-[10px] font-bold text-[#ccab59] hover:underline uppercase tracking-wider">
          View Feed Log
        </button>
      </div>
    </div>
  );
};

const HealthStat = ({ label, value, color }) => (
  <div className="flex flex-col">
    <span className="text-[8px] font-black text-slate-300 dark:text-slate-500 tracking-widest uppercase">{label}</span>
    <span className={`text-[15px] font-bold ${color}`}>{value}</span>
  </div>
);

const PortalHealthCards = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {portalData.map((portal) => (
        <PortalCard key={portal.id} portal={portal} />
      ))}
    </div>
  );
};

export default PortalHealthCards;
