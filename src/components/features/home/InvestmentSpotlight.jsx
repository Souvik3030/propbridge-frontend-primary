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
      progressColor: 'bg-[#d2ab51]',
      rankBg: 'bg-[#fcf8ec]',
      rankText: 'text-[#d2ab51]',
      scoreText: 'text-[#d2ab51]'
    },
    {
      name: 'Al Hebiah Fifth',
      sales: 293,
      rank: 2,
      score: 80,
      avgPrice: 'AED 3.0M',
      growth: '+5%',
      progressColor: 'bg-[#3b82f6]',
      rankBg: 'bg-[#eff6ff]',
      rankText: 'text-[#3b82f6]',
      scoreText: 'text-[#3b82f6]'
    },
    {
      name: 'Business Bay',
      sales: 124,
      rank: 3,
      score: 80,
      avgPrice: 'AED 3.1M',
      growth: '+105%',
      progressColor: 'bg-[#8b5cf6]',
      rankBg: 'bg-[#f3e8ff]',
      rankText: 'text-[#8b5cf6]',
      scoreText: 'text-[#8b5cf6]'
    }
  ];

  return (
    <section className="mb-12">
      {/* Custom Title matching the design */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#6366f1] rounded-full"></div>
        <h2 className="text-[26px] font-serif font-bold text-[#111424] dark:text-white transition-colors tracking-wide">
          Investment Spotlight
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topAreas.map((area, idx) => (
          <div key={idx} className="bg-white dark:bg-[#141929] rounded-2xl border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm transition-colors">
            
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[17px] font-bold text-[#111424] dark:text-white transition-colors">{area.name}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold leading-none flex items-center justify-center ${area.rankBg} ${area.rankText} transition-colors`}>
                #{area.rank}
              </span>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-8 transition-colors">{area.sales} sales</p>
            
            <div className="mb-8">
              <div className="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 mb-2 font-medium transition-colors">
                <span>Investment Score</span>
                <span className={`font-bold ${area.scoreText}`}>{area.score}/100</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px] transition-colors relative">
                <div className={`absolute left-0 top-0 h-full rounded-full ${area.progressColor} transition-colors`} style={{ width: `${area.score}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 font-medium transition-colors">Avg Price</span>
                <span className="text-[13px] font-bold text-[#ccab59] transition-colors">{area.avgPrice}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 font-medium transition-colors">Growth</span>
                <span className="text-[13px] font-bold text-emerald-500 transition-colors">{area.growth}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentSpotlight;

