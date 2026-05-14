import React from 'react';
import { Search, Layers, LayoutGrid, DollarSign, BarChart3, Globe } from 'lucide-react';
import CountUp from '../../ui/CountUp';

const MarketIntelligence = () => {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-[#fdfcf8] to-[#eedfb9] dark:bg-[linear-gradient(160deg,rgb(8,13,30)_0%,rgb(15,26,61)_30%,rgb(26,15,46)_60%,rgb(13,21,41)_100%)] px-[36px] pt-[56px] pb-[48px] text-center mb-8 border border-[#e5dfce]/60 dark:border-[#c9a84c1f] transition-colors duration-300">
      {/* Background Decorations */}
      <div className="absolute -top-[80px] -right-[60px] w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.063)_0%,transparent_70%)] pointer-events-none opacity-50 dark:opacity-100"></div>
      <div className="absolute -bottom-[40px] -left-[40px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.03)_0%,transparent_70%)] pointer-events-none opacity-50 dark:opacity-100"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#c9a84c0a] dark:border-[#c9a84c06] pointer-events-none"></div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#c9a84c12] border border-[#c9a84c2e] mb-5 text-[11px] font-bold text-[#a38847] dark:text-[#c9a84c] font-['JetBrains_Mono',_monospace] tracking-[1.2px] uppercase">
        <Globe className="w-[13px] h-[13px]" />
        Live Market Intelligence
      </div>

      <h1 className="text-3xl md:text-[48px] font-extrabold font-serif text-[#111424] dark:text-[#f0f0f0] mb-[14px] relative leading-[1.15] tracking-[-0.5px]">
        Dubai Real Estate<br />
        <span className="bg-[linear-gradient(135deg,rgb(201,168,76),rgb(223,192,110))] bg-clip-text text-transparent">Intelligence</span>
      </h1>

      <p className="text-[15px] md:text-[17px] text-slate-500 dark:text-[#8892a4] mx-auto mb-9 relative max-w-[560px] leading-[1.6]">
        Powered by <span className="text-[#a38847] dark:text-[#c9a84c] font-bold font-['JetBrains_Mono',_monospace]"><CountUp end={44144} /></span> DLD transactions across <span className="text-[#a38847] dark:text-[#c9a84c] font-bold font-['JetBrains_Mono',_monospace]"><CountUp end={1109} /></span> tracked projects
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mx-auto mb-9 relative max-w-[700px]">
        {[
          { icon: Layers, val: 44144, label: "Transactions" },
          { icon: LayoutGrid, val: 100, label: "Areas Tracked" },
          { icon: DollarSign, val: 3865000, label: "Avg Price/sqft", prefix: "AED ", sep: "," },
          { icon: BarChart3, val: 133.0, label: "Total Volume", prefix: "AED ", dec: 1, suf: "B" }
        ].map((item, i) => (
          <div key={i} className="text-center p-4 rounded-2xl bg-white/40 dark:bg-[#c9a84c0a] border border-[#e5dfce]/40 dark:border-[#c9a84c0a] backdrop-blur-sm">
            <div className="mb-2">
              <item.icon className="w-4 h-4 inline-block align-middle shrink-0 stroke-[#a3884780] dark:stroke-[#c9a84c80]" />
            </div>
            <div className="text-xl md:text-2xl font-extrabold text-[#a38847] dark:text-[#c9a84c] font-['JetBrains_Mono',_monospace] leading-[1.1]">
              {item.prefix}<CountUp end={item.val} decimals={item.dec} suffix={item.suf} separator={item.sep} />
            </div>
            <div className="text-[10px] md:text-[11px] text-slate-500 dark:text-[#8892a4] mt-1.5 font-medium tracking-[0.3px]">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Search Container */}
      <div className="max-w-[520px] mx-auto relative px-4 md:px-0">
        <div className="absolute left-8 md:left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Search className="w-[18px] h-[18px] inline-block align-middle shrink-0 stroke-slate-400 dark:stroke-[#8892a4]" />
        </div>
        <input 
          placeholder="Search areas, projects, developers..." 
          type="text" 
          className="w-full pl-11 pr-5 py-3.5 md:py-4 rounded-2xl border border-[#e5dfce] dark:border-[#c9a84c2e] bg-white/80 dark:bg-[#0b1229b3] text-[#111424] dark:text-[#f0f0f0] text-[14px] md:text-[15px] font-sans box-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all outline-none focus:border-[#c9a84c50]"
        />
      </div>
    </div>
  );
};

export default MarketIntelligence;
