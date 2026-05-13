import React from 'react';
import {
  DLD_STATS,
  DLD_PRICE_DISTRIBUTION,
  DLD_ROOM_DEMAND,
  DLD_TOP_AREAS,
} from '../../../data/mockData';

/* ── tiny helpers ─────────────────────────────────────────── */
const fmt = (n) => Number(n).toLocaleString();

const MortgageBadge = ({ pct }) => {
  if (pct === 0) return <span className="text-slate-400 text-[12px]">0%</span>;
  const color =
    pct >= 30
      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700/40'
      : pct >= 15
        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700/30'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border ${color}`}>
      {pct}%
    </span>
  );
};

/* ── stat card ────────────────────────────────────────────── */
const StatCard = ({ value, label, color }) => (
  <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#ece7d9] dark:border-slate-800 px-5 py-4 shadow-sm">
    <p className={`text-[22px] sm:text-[26px] font-bold leading-tight ${color}`}>{value}</p>
    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</p>
  </div>
);

/* ── main component ───────────────────────────────────────── */
const DLDAnalytics = () => {
  const s = DLD_STATS;
  const maxPriceCount = Math.max(...DLD_PRICE_DISTRIBUTION.map(d => d.count));
  const maxRoomCount = Math.max(...DLD_ROOM_DEMAND.map(d => d.count));

  const statCards = [
    { value: fmt(s.totalTransactions), label: 'Total Transactions', color: 'text-[#ccab59]' },
    { value: fmt(s.sales), label: 'Sales', color: 'text-[#1a73e8] dark:text-blue-400' },
    { value: fmt(s.offPlanSales), label: 'Off-Plan Sales', color: 'text-emerald-500' },
    { value: fmt(s.readySales), label: 'Ready Sales', color: 'text-purple-500' },
    { value: fmt(s.mortgages), label: 'Mortgages', color: 'text-[#ccab59]' },
    { value: `AED ${s.totalValueB}B`, label: 'Total Value', color: 'text-[#1a73e8] dark:text-blue-400' },
    { value: `AED ${s.avgTransactionM}M`, label: 'Avg Transaction', color: 'text-[#1a73e8] dark:text-blue-400' },
    { value: `${s.freeholdPct}%`, label: 'Freehold %', color: 'text-emerald-500' },
    { value: `${s.residentialPct}%`, label: 'Residential %', color: 'text-purple-500' },
    { value: fmt(s.areasTracked), label: 'Areas Tracked', color: 'text-[#ccab59]' },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* ── Stat Cards Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {statCards.map((c, i) => (
          <StatCard key={i} value={c.value} label={c.label} color={c.color} />
        ))}
      </div>

      {/* ── Price Distribution ── */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#ece7d9] dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-[16px] font-bold text-slate-800 dark:text-white mb-6">
          Off-Plan Price Distribution
        </h3>
        <div className="flex items-end gap-4 sm:gap-6 h-[180px]">
          {DLD_PRICE_DISTRIBUTION.map((bar) => {
            const heightPct = (bar.count / maxPriceCount) * 100;
            return (
              <div key={bar.range} className="flex flex-col items-center flex-1 gap-1 h-full justify-end">
                {/* count label */}
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  {fmt(bar.count)}
                </span>
                {/* bar */}
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${heightPct}%`,
                    background: 'linear-gradient(180deg, #d4a843 0%, #a07830 100%)',
                    minHeight: '4px',
                  }}
                />
                {/* label */}
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {bar.range}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Room Type Demand ── */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#ece7d9] dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-[16px] font-bold text-slate-800 dark:text-white mb-5">
          Off-Plan Room Type Demand
        </h3>
        <div className="flex flex-col gap-3">
          {DLD_ROOM_DEMAND.map((row, idx) => {
            const widthPct = (row.count / maxRoomCount) * 100;
            // gradient: blue → purple, fading for smaller bars
            const opacity = Math.max(0.3, row.count / maxRoomCount);
            return (
              <div key={row.room} className="flex items-center gap-3">
                <span className="text-[12px] text-slate-500 dark:text-slate-400 w-14 text-right flex-shrink-0 font-medium">
                  {row.room}
                </span>
                <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md flex items-center justify-end pr-3 transition-all duration-700"
                    style={{
                      width: `${Math.max(widthPct, 0.5)}%`,
                      background: `linear-gradient(90deg, rgba(99,102,241,${opacity}) 0%, rgba(139,92,246,${opacity}) 100%)`,
                    }}
                  />
                </div>
                <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200 w-12 text-right flex-shrink-0">
                  {fmt(row.count)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Top 20 Areas by Sales Volume ── */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#ece7d9] dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ece7d9] dark:border-slate-800">
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-white">
            Top 20 Areas by Sales Volume
          </h3>
        </div>

        {/* Table — scrolls horizontally on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#ece7d9] dark:border-slate-800">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-8">#</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Area</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Sales</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Off-Plan</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Avg/sqft</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Avg Price</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mortgage %</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Top Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7d9] dark:divide-slate-800/60">
              {DLD_TOP_AREAS.map((row) => (
                <tr
                  key={row.rank}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* rank */}
                  <td className="px-4 py-3.5">
                    <span className={`text-[13px] font-bold ${row.rank <= 3
                        ? 'text-[#ccab59]'
                        : 'text-slate-400 dark:text-slate-500'
                      }`}>
                      {row.rank}
                    </span>
                  </td>

                  {/* area name */}
                  <td className="px-4 py-3.5">
                    <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 tracking-wide">
                      {row.area}
                    </span>
                  </td>

                  {/* sales */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-[13px] font-bold text-[#1a73e8] dark:text-blue-400">
                      {fmt(row.sales)}
                    </span>
                  </td>

                  {/* off-plan */}
                  <td className="px-4 py-3.5 text-right">
                    <span className={`text-[13px] font-bold ${row.offPlan > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-400 dark:text-slate-500'
                      }`}>
                      {fmt(row.offPlan)}
                    </span>
                  </td>

                  {/* avg/sqft */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-[13px] text-slate-600 dark:text-slate-300">
                      {row.avgSqft}
                    </span>
                  </td>

                  {/* avg price */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-[13px] font-semibold text-[#ccab59]">
                      {row.avgPrice}
                    </span>
                  </td>

                  {/* mortgage % */}
                  <td className="px-4 py-3.5 text-right">
                    <MortgageBadge pct={row.mortgagePct} />
                  </td>

                  {/* top room */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">
                      {row.topRoom}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ece7d9] dark:border-slate-800 text-center">
          <p className="text-[12px] text-slate-400 dark:text-slate-500">
            Source: Dubai Land Department · {fmt(s.totalTransactions)} transactions · Data as of {s.dataAsOf}
          </p>
        </div>
      </div>

    </div>
  );
};

export default DLDAnalytics;
