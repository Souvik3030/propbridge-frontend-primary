import React from 'react';
import { Globe, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

const portalData = [
  { id: 1, name: 'Property Finder', type: 'REST API', sync: '12 mins ago', status: 'Healthy', pushed: 842, failed: 2, rejected: 0, uptime: '99.9%' },
  { id: 2, name: 'Bayut', type: 'XML Feed', sync: '1 hour ago', status: 'Healthy', pushed: 1204, failed: 0, rejected: 1, uptime: '100%' },
  { id: 3, name: 'Dubizzle', type: 'XML Feed', sync: '45 mins ago', status: 'Degraded', pushed: 642, failed: 12, rejected: 4, uptime: '98.2%' },
];

const PortalCard = ({ portal }) => {
  const isHealthy = portal.status === 'Healthy';
  
  return (
    <div className="flex-1 bg-white dark:bg-[#1a1f33] border border-black/5 dark:border-white/5 rounded-[16px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.01] group animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#c9a84c12] flex items-center justify-center">
            <Globe size={18} className="text-[#c9a84c]" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-[15px] font-[800] text-[#1a1a2e] dark:text-[#f0f0f0] font-serif leading-none transition-colors">{portal.name}</h4>
            <span className="text-[10px] font-bold text-slate-400 dark:text-[#8892a4] uppercase tracking-wider mt-1.5 transition-colors">{portal.type}</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-tight ${
          isHealthy 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' 
            : 'bg-orange-50 border-orange-100 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400'
        }`}>
          {portal.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 pb-6 border-b border-dashed border-slate-100 dark:border-white/5">
        <HealthStat label="Pushed" value={portal.pushed} color="text-[#1a1a2e] dark:text-white" />
        <HealthStat label="Uptime" value={portal.uptime} color="text-[#10b981]" />
        <HealthStat label="Failed" value={portal.failed} color="text-[#ef4444]" />
        <HealthStat label="Rejected" value={portal.rejected} color="text-[#f59e0b]" />
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-slate-400 dark:text-[#8892a4]">
          <RefreshCw size={12} className="animate-spin-slow" />
          <span className="text-[11px] font-medium transition-colors">Sync {portal.sync}</span>
        </div>
        <button className="text-[11px] font-bold text-[#c9a84c] hover:text-[#b3933d] transition-colors uppercase tracking-wider">
          Feed Logs
        </button>
      </div>
    </div>
  );
};

const HealthStat = ({ label, value, color }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-slate-400 dark:text-[#8892a4] uppercase tracking-wider mb-1 transition-colors">{label}</span>
    <span className={`text-[18px] font-[800] font-mono leading-none ${color}`}>{value}</span>
  </div>
);

const PortalHealthCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {portalData.map((portal) => (
        <PortalCard key={portal.id} portal={portal} />
      ))}
    </div>
  );
};

export default PortalHealthCards;
