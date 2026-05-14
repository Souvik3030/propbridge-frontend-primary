import React from 'react';

const InvestmentSpotlight = () => {
  const topAreas = [
    {
      name: 'Dubai Hills',
      sales: 302,
      rank: 1,
      score: 80,
      avgPrice: 'AED 4.5M',
      growth: '+12%',
      accentColor: 'text-[#c9a84c]',
      badgeBg: 'bg-[#c9a84c15]',
      scoreColor: 'text-[#c9a84c]',
      progressGradient: 'bg-[linear-gradient(90deg,rgba(201,168,76,0.376),rgb(201,168,76))]',
      badgeTextColor: 'text-[#c9a84c]'
    },
    {
      name: 'Al Hebiah Fifth',
      sales: 293,
      rank: 2,
      score: 80,
      avgPrice: 'AED 3.0M',
      growth: '+5%',
      accentColor: 'text-[#3b82f6]',
      badgeBg: 'bg-[#3b82f615]',
      scoreColor: 'text-[#3b82f6]',
      progressGradient: 'bg-[linear-gradient(90deg,rgba(59,130,246,0.376),rgb(59,130,246))]',
      badgeTextColor: 'text-[#3b82f6]'
    },
    {
      name: 'Business Bay',
      sales: 124,
      rank: 3,
      score: 80,
      avgPrice: 'AED 3.1M',
      growth: '+105%',
      accentColor: 'text-[#8b5cf6]',
      badgeBg: 'bg-[#8b5cf615]',
      scoreColor: 'text-[#8b5cf6]',
      progressGradient: 'bg-[linear-gradient(90deg,rgba(139,92,246,0.376),rgb(139,92,246))]',
      badgeTextColor: 'text-[#8b5cf6]'
    }
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <div className="w-1 h-6 rounded-[2px] bg-[linear-gradient(rgb(139,92,246),rgb(59,130,246))]"></div>
        <h2 className="text-[22px] font-bold font-serif text-[#111424] dark:text-[#f0f0f0] m-0 transition-colors">Investment Spotlight</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topAreas.map((area, idx) => (
          <div 
            key={idx}
            className="group bg-white dark:bg-[#1a1f35] border border-slate-200/60 dark:border-white/5 rounded-[16px] p-[22px] cursor-pointer relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-none hover:border-[#c9a84c30] dark:hover:bg-[#1e2440] dark:hover:border-white/10"
          >
            {/* Rank Badge */}
            <div className={`absolute top-3.5 right-3.5 w-7 h-7 rounded-full ${area.badgeBg} flex items-center justify-center text-[12px] font-extrabold ${area.badgeTextColor} font-mono transition-transform group-hover:scale-110 opacity-70 dark:opacity-100`}>
              #{area.rank}
            </div>

            {/* Area Info */}
            <div className="text-[15px] font-bold text-[#111424] dark:text-[#f0f0f0] mb-1.5 pr-10 transition-colors">{area.name}</div>
            <div className="text-[12px] text-slate-500 dark:text-[#8892a4] mb-[14px] transition-colors">{area.sales} sales</div>

            {/* Score Section */}
            <div className="mb-[14px]">
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#8892a4] mb-1 transition-colors">
                <span>Investment Score</span>
                <span className={`font-bold ${area.scoreColor} font-mono`}>{area.score}/100</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden transition-colors">
                <div 
                  className={`h-full rounded-full ${area.progressGradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${area.score}%` }}
                ></div>
              </div>
            </div>

            {/* Stats Footer */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[10px] text-slate-400 dark:text-[#8892a4] mb-0.5 transition-colors">Avg Price</div>
                <div className="text-[13px] font-bold text-[#a38847] dark:text-[#c9a84c] font-mono transition-colors">{area.avgPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 dark:text-[#8892a4] mb-0.5 transition-colors">Growth</div>
                <div className="text-[13px] font-bold font-mono text-[#10b981] transition-colors">{area.growth}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentSpotlight;

