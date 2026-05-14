import React from 'react';
import { Layers, CheckCircle2, Key } from 'lucide-react';

const MarketPulse = () => {
  const stats = [
    {
      label: "Off-Plan Share",
      value: "63",
      subtext: "21,744 transactions",
      icon: <Layers className="w-[17px] h-[17px] stroke-[#3b82f6]" />,
      color: "text-[#3b82f6]",
      symbolColor: "text-[#3b82f690]",
      bgColor: "bg-[#3b82f612]",
      barGradient: "bg-gradient-to-r from-[#3b82f6] to-[#3b82f690]",
      circleColor: "bg-[#3b82f608]",
      width: "63%",
    },
    {
      label: "Freehold Share",
      value: "98",
      subtext: "33,722 freehold txns",
      icon: <CheckCircle2 className="w-[17px] h-[17px] stroke-[#10b981]" />,
      color: "text-[#10b981]",
      symbolColor: "text-[#10b98190]",
      bgColor: "bg-[#10b98112]",
      barGradient: "bg-gradient-to-r from-[#10b981] to-[#10b98190]",
      circleColor: "bg-[#10b98108]",
      width: "98%",
    },
    {
      label: "Mortgage Share",
      value: "24",
      subtext: "8,146 financed",
      icon: <Key className="w-[17px] h-[17px] stroke-[#8b5cf6]" />,
      color: "text-[#8b5cf6]",
      symbolColor: "text-[#8b5cf690]",
      bgColor: "bg-[#8b5cf612]",
      barGradient: "bg-gradient-to-r from-[#8b5cf6] to-[#8b5cf690]",
      circleColor: "bg-[#8b5cf608]",
      width: "24%",
    },
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <div className="w-1 h-6 rounded-[2px] bg-[linear-gradient(rgb(201,168,76),rgb(168,138,62))]"></div>
        <h2 className="text-[22px] font-bold font-serif text-[#111424] dark:text-[#f0f0f0] m-0 transition-colors">Market Pulse</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="group bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[16px] p-6 relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-none hover:border-[#c9a84c30] dark:hover:bg-[#1e2440] dark:hover:border-white/10"
          >
            {/* Background Decoration */}
            <div className={`absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full ${stat.circleColor} pointer-events-none group-hover:scale-110 transition-transform opacity-40 dark:opacity-100`}></div>
            
            {/* Card Header */}
            <div className="flex items-center gap-[10px] mb-4 relative z-10">
              <div className={`w-9 h-9 rounded-[10px] ${stat.bgColor} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className="text-[12px] font-semibold text-slate-500 dark:text-[#8892a4] tracking-[0.3px] transition-colors">{stat.label}</span>
            </div>

            {/* Card Body */}
            <div className="mb-[10px] relative z-10">
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-[36px] font-extrabold ${stat.color} font-mono leading-none tracking-tighter`}>
                  {stat.value}
                </span>
                <span className={`text-[18px] font-bold ${stat.symbolColor} font-mono`}>%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="h-1.5 rounded-[3px] bg-slate-100 dark:bg-white/5 overflow-hidden transition-colors">
                <div 
                  className={`h-full rounded-[3px] ${stat.barGradient} transition-all duration-[0.8s] ease-out`}
                  style={{ width: stat.width }}
                ></div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="text-[12px] text-slate-400 dark:text-[#8892a4] font-medium relative z-10 transition-colors">{stat.subtext}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPulse;