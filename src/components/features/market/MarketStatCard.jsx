import React from 'react';

const MarketStatCard = ({ label, value, accent, Icon }) => {
  return (
    <div className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm shadow-[#00000008] transition hover:-translate-y-0.5 dark:border-[#1f2d45] dark:bg-slate-950 dark:shadow-[#0000001f]">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7efe0] text-[#b98e22] shadow-sm shadow-[#e9d7a2]/40 dark:bg-[#2f3040] dark:text-[#d8c078]">
          {Icon ? <Icon className="h-6 w-6" /> : null}
        </span>
      </div>
      <p className={`mt-5 text-3xl font-black tracking-tight text-slate-950 ${accent} dark:text-white`}>{value}</p>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
};

export default MarketStatCard;
