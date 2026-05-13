import React from 'react';
import { Search, Layers, LayoutGrid, DollarSign, BarChart3, Globe } from 'lucide-react';
import CountUp from '../../ui/CountUp';

const MarketIntelligence = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#fdfcf8] to-[#eedfb9] dark:from-[#131525] dark:to-[#0a0d18] border border-[#e5dfce]/60 dark:border-gray-800/40 px-4 py-16 mb-8 flex flex-col items-center text-center transition-colors">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(205,171,92,0.12)_0,transparent_60%)]"></div>
      
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#ccab59]/30 bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59] text-[10px] font-bold tracking-[0.15em] mb-8 z-10 transition-colors uppercase">
        <Globe className="w-3.5 h-3.5 opacity-80" />
        Live Market Intelligence
      </div>

      <h1 className="text-4xl md:text-[56px] leading-[1.1] font-serif font-bold text-[#111424] dark:text-white mb-6 z-10 transition-colors">
        Dubai Real Estate<br/><span className="text-[#ccab59]">Intelligence</span>
      </h1>
      
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-12 z-10 transition-colors">
        Powered by <span className="text-[#ccab59] font-bold"><CountUp end={44144} duration={800} /></span> DLD transactions across <span className="text-[#ccab59] font-bold"><CountUp end={1109} duration={800} /></span> tracked projects
      </p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 z-10 w-full max-w-[850px]">
        {/* Card 1 */}
        <div className="flex-1 min-w-[180px] bg-[#f8f2e2]/60 dark:bg-[#1a1d2e]/40 backdrop-blur-md border border-[#e5dfce]/40 dark:border-gray-700/30 rounded-[20px] p-6 transition-colors">
          <Layers className="w-5 h-5 text-[#ccab59] mx-auto mb-3 opacity-90" />
          <h3 className="text-[26px] font-bold text-[#ccab59] mb-1">
            <CountUp end={44144} />
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Transactions</p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 min-w-[180px] bg-[#f8f2e2]/60 dark:bg-[#1a1d2e]/40 backdrop-blur-md border border-[#e5dfce]/40 dark:border-gray-700/30 rounded-[20px] p-6 transition-colors">
          <LayoutGrid className="w-5 h-5 text-[#ccab59] mx-auto mb-3 opacity-90" />
          <h3 className="text-[26px] font-bold text-[#ccab59] mb-1">
            <CountUp end={100} />
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Areas Tracked</p>
        </div>

        {/* Card 3 */}
        <div className="flex-1 min-w-[180px] bg-[#f8f2e2]/60 dark:bg-[#1a1d2e]/40 backdrop-blur-md border border-[#e5dfce]/40 dark:border-gray-700/30 rounded-[20px] p-6 transition-colors">
          <DollarSign className="w-5 h-5 text-[#ccab59] mx-auto mb-3 opacity-90" />
          <div className="flex flex-col items-center mb-1">
            <span className="text-sm font-bold text-[#ccab59] leading-none mb-1">AED</span>
            <h3 className="text-[26px] font-bold text-[#ccab59] leading-none">
              <CountUp end={3865000} />
            </h3>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium pt-1">Avg Price/sqft</p>
        </div>

        {/* Card 4 */}
        <div className="flex-1 min-w-[180px] bg-[#f8f2e2]/60 dark:bg-[#1a1d2e]/40 backdrop-blur-md border border-[#e5dfce]/40 dark:border-gray-700/30 rounded-[20px] p-6 transition-colors">
          <BarChart3 className="w-5 h-5 text-[#ccab59] mx-auto mb-3 opacity-90" />
          <div className="flex flex-col items-center mb-1">
            <span className="text-sm font-bold text-[#ccab59] leading-none mb-1">AED</span>
            <h3 className="text-[26px] font-bold text-[#ccab59] leading-none">
              <CountUp end={133.0} decimals={1} suffix="B" />
            </h3>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium pt-1">Total Volume</p>
        </div>
      </div>

      <div className="w-full max-w-[650px] relative z-10 flex flex-col items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-[#161a29]/70 backdrop-blur-md border border-[#e5dfce] dark:border-gray-700/50 rounded-2xl text-[#111424] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#ccab59] focus:ring-1 focus:ring-[#ccab59] transition-colors text-sm shadow-sm"
            placeholder="Search areas, projects, developers..."
          />
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
