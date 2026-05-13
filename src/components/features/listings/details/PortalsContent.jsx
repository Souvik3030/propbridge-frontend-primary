import React from 'react';
import { ZapOff } from 'lucide-react';

const PortalsContent = ({ listing }) => {
  const portals = [
    { name: 'Property Finder', status: 'Under Approval', statusColor: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400' },
    { name: 'Bayut', status: 'Live', statusColor: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20 dark:text-emerald-400' },
    { name: 'Dubizzle', status: 'Live', statusColor: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20 dark:text-emerald-400' },
  ];

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {portals.map((portal, i) => (
        <div key={i} className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight">{portal.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${portal.statusColor}`}>
              {portal.status}
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ccab59]/10 text-[#a38847] rounded-lg font-black text-[11px] hover:bg-[#ccab59]/20 transition-all uppercase tracking-wider">
              <ZapOff size={14} /> Unpublish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortalsContent;
