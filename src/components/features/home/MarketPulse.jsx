import React from 'react';
import { Layers, CheckCircle2, Key } from 'lucide-react';

const MarketPulse = () => {
  const stats = [
    {
      label: "Off-Plan Share",
      value: "63",
      subtext: "21,744 transactions",
      icon: <Layers className="w-4 h-4 text-blue-500" />,
      barColor: "bg-blue-500/60",
      textColor: "text-blue-600 dark:text-blue-400",
      width: "63%",
    },
    {
      label: "Freehold Share",
      value: "98",
      subtext: "33,722 freehold txns",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      barColor: "bg-emerald-500/60",
      textColor: "text-emerald-600 dark:text-emerald-400",
      width: "98%",
    },
    {
      label: "Mortgage Share",
      value: "24",
      subtext: "8,146 financed",
      icon: <Key className="w-4 h-4 text-purple-500" />,
      barColor: "bg-purple-500/60",
      textColor: "text-purple-600 dark:text-purple-400",
      width: "24%",
    },
  ];

  return (
    <section className="w-full p-4">
      {/* Header with Gold Vertical Accent */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-[3px] h-6 bg-[#b89146]"></div>
        <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white font-serif">
          Market Pulse
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-[#ece7d9] dark:border-slate-800 p-8 shadow-sm bg-white dark:bg-[#111827] transition-colors"
          >
            {/* The subtle decorative circle in the top right corner */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-slate-50 dark:bg-slate-800/40 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                {/* Icon wrapper with very light background */}
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                  {stat.label}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-5">
                <span className={`text-5xl font-bold tracking-tighter ${stat.textColor}`}>
                  {stat.value}
                </span>
                <span className={`text-2xl font-medium opacity-60 ${stat.textColor}`}>
                  %
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="h-[6px] w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full ${stat.barColor} transition-all duration-1000 ease-out`}
                  style={{ width: stat.width }}
                ></div>
              </div>

              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketPulse;