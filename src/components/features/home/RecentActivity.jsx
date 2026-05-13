import React from 'react';
import { ExternalLink } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      location: "Jumeirah Village Circle",
      stats: "2,246 sales | Avg AED 1.2M",
      trend: "+1%",
      isPositive: true,
      // Dynamic colors for light/dark mode badges
      badgeStyles: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500",
    },
    {
      id: 2,
      location: "Al Yelayiss 1",
      stats: "2,020 sales | Avg AED 5.0M",
      trend: "-17%",
      isPositive: false,
      badgeStyles: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      id: 3,
      location: "Madinat Al Mataar",
      stats: "1,612 sales | Avg AED 2.1M",
      trend: "+8%",
      isPositive: true,
      badgeStyles: "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    },
    {
      id: 4,
      location: "Dubai Land Residence Complex",
      stats: "1,463 sales | Avg AED 1.1M",
      trend: "+5%",
      isPositive: true,
      badgeStyles: "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    },
    {
      id: 5,
      location: "Majan",
      stats: "1,095 sales | Avg AED 1.1M",
      trend: "-2%",
      isPositive: false,
      badgeStyles: "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    },
  ];

  return (
    <section className="mb-12 p-4 md:p-0">
      {/* Header with Gold/Orange Accent and Pulse Dot */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[3px] h-6 bg-[#b89146] dark:bg-[#e67e22]"></div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-serif">
            Recent Activity
          </h2>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mt-1"></div>
        </div>
      </div>

      {/* Main Container - Dark mode background */}
      <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-[#ece7d9] dark:border-slate-800/60 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
          {activities.map((item) => (
            <div 
              key={item.id} 
              className="group flex items-center justify-between p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
            >
              <div className="flex items-center gap-5">
                {/* Numbered Badge with adaptive dark mode colors */}
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${item.badgeStyles}`}>
                  {item.id}
                </div>
                
                {/* Text Content */}
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[15px] mb-0.5">
                    {item.location}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {item.stats}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Trend Indicator - Refined for dark mode contrast */}
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                  item.isPositive 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500' 
                    : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                }`}>
                  {item.trend}
                </span>

                {/* External Action Icon */}
                <button className="text-slate-300 dark:text-slate-600 group-hover:text-[#b89146] dark:group-hover:text-slate-400 transition-colors">
                  <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;