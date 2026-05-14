import React from 'react';

const PortalCard = ({ name, status, metrics }) => (
  <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-4">
    <div className="flex justify-between mb-[10px]">
      <span className="text-[15px] font-bold text-[#1a1a2e] dark:text-white">{name}</span>
      <span className={`text-[12px] font-bold px-[10px] py-[3px] rounded-lg ${
        status === 'Healthy' 
          ? 'bg-emerald-500/10 text-emerald-500' 
          : 'bg-amber-500/10 text-amber-500'
      }`}>
        {status}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-[6px]">
      <div>
        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Pushed</div>
        <div className="text-[14px] font-bold text-[#1a1a2e] dark:text-white">{metrics.pushed}</div>
      </div>
      <div>
        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Failed</div>
        <div className="text-[14px] font-bold text-[#1a1a2e] dark:text-white">{metrics.failed}</div>
      </div>
      <div>
        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Rejected</div>
        <div className="text-[14px] font-bold text-[#1a1a2e] dark:text-white">{metrics.rejected}</div>
      </div>
      <div>
        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Uptime</div>
        <div className="text-[14px] font-bold text-[#1a1a2e] dark:text-white">{metrics.uptime}%</div>
      </div>
    </div>
  </div>
);

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
      {portals.map(portal => (
        <PortalCard key={portal.name} {...portal} />
      ))}
    </div>
  );
};

export default PortalStatusCards;

