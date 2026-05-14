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
      color: "text-[#c9a84c]",
      bgColor: "bg-[#c9a84c18]",
    },
    {
      id: 2,
      location: "Al Yelayiss 1",
      stats: "2,020 sales | Avg AED 5.0M",
      trend: "-17%",
      isPositive: false,
      color: "text-[#3b82f6]",
      bgColor: "bg-[#3b82f612]",
    },
    {
      id: 3,
      location: "Madinat Al Mataar",
      stats: "1,612 sales | Avg AED 2.1M",
      trend: "+8%",
      isPositive: true,
      color: "text-slate-400 dark:text-[#8892a4]",
      bgColor: "bg-slate-400/10 dark:bg-white/8",
    },
    {
      id: 4,
      location: "Dubai Land Residence Complex",
      stats: "1,463 sales | Avg AED 1.1M",
      trend: "+5%",
      isPositive: true,
      color: "text-slate-400 dark:text-[#8892a4]",
      bgColor: "bg-slate-400/10 dark:bg-white/8",
    },
    {
      id: 5,
      location: "Majan",
      stats: "1,095 sales | Avg AED 1.1M",
      trend: "-2%",
      isPositive: false,
      color: "text-slate-400 dark:text-[#8892a4]",
      bgColor: "bg-slate-400/10 dark:bg-white/8",
    },
  ];

  return (
    <div className="mb-[20px]">
      {/* Header */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <div className="w-1 h-6 rounded-[2px] bg-[linear-gradient(rgb(239,68,68),rgb(245,158,11))]"></div>
        <h2 className="text-[22px] font-bold font-serif text-[#111424] dark:text-[#f0f0f0] m-0 transition-colors">Recent Activity</h2>
        <div className="w-2 h-2 rounded-full bg-[#10b981] ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.376)] animate-pulse"></div>
      </div>

      {/* Box */}
      <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[16px] overflow-hidden transition-colors">
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {activities.map((item) => (
            <div 
              key={item.id}
              className="flex items-center p-[14px_20px] cursor-pointer transition-all duration-150 gap-3.5 hover:bg-slate-50 dark:hover:bg-white/5 group"
            >
              {/* Badge */}
              <div className={`w-8 h-8 rounded-[8px] ${item.bgColor} flex items-center justify-center text-[13px] font-extrabold ${item.color} font-mono shrink-0 transition-transform group-hover:scale-110`}>
                {item.id}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-[#111424] dark:text-[#f0f0f0] mb-0.5 truncate transition-colors">
                  {item.location}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-[#8892a4] transition-colors">
                  {item.stats}
                </div>
              </div>

              {/* Trend */}
              <div className={`flex items-center gap-4 shrink-0`}>
                <div className={`flex items-center gap-4 px-2.5 py-1 rounded-[8px] ${item.isPositive ? 'bg-[#10b98112] text-[#10b981]' : 'bg-[#ef444412] text-[#ef4444]'} text-[12px] font-bold font-mono transition-colors`}>
                  {item.trend}
                </div>
                <div className="text-slate-300 dark:text-slate-600 opacity-40 group-hover:opacity-100 group-hover:text-[#c9a84c] transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;