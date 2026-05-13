import React from 'react';

const StatsBar = ({ projects, showStats, setShowStats, totalCount }) => {
  if (!showStats) return null;

  const total = totalCount ?? projects.length;
  const avgPrice = projects.filter(p => p.p > 0).reduce((sum, p) => sum + p.p, 0) / (projects.filter(p => p.p > 0).length || 1);
  const underConstruction = projects.filter(p => p.cs === 'under-construction').length;
  const ready = projects.filter(p => p.cs === 'ready').length;
  const developers = [...new Set(projects.map(p => p.d))].length;
  const favorites = 0;

  const formatAvg = (n) => {
    if (n >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(1)}M`;
    return `AED ${Math.round(n).toLocaleString()}`;
  };

  const stats = [
    { value: total.toLocaleString(), label: 'TOTAL PROJECTS', color: 'text-[#ccab59]' },
    { value: formatAvg(avgPrice), label: 'AVG PRICE', color: 'text-[#1a73e8] dark:text-blue-400' },
    { value: underConstruction.toLocaleString(), label: 'UNDER CONSTRUCTION', color: 'text-purple-500' },
    { value: ready.toLocaleString(), label: 'READY', color: 'text-emerald-500' },
    { value: developers.toLocaleString(), label: 'DEVELOPERS', color: 'text-orange-500' },
    { value: favorites.toLocaleString(), label: 'FAVORITES', color: 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#111827] border border-[#ece7d9] dark:border-slate-800 rounded-lg p-3 text-center"
        >
          <p className={`text-[17px] sm:text-[18px] font-black ${s.color} leading-tight`}>{s.value}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
