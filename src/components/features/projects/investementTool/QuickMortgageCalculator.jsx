import React from 'react';

const mortgageData = [
  { price: "1.0M", monthly: "4,447", down: "200K", dld: "40K" },
  { price: "1.5M", monthly: "6,670", down: "300K", dld: "60K" },
  { price: "2.0M", monthly: "8,893", down: "400K", dld: "80K" },
  { price: "3.0M", monthly: "13,340", down: "600K", dld: "120K" },
  { price: "5.0M", monthly: "22,233", down: "1000K", dld: "200K" },
  { price: "10.0M", monthly: "44,467", down: "2000K", dld: "400K" },
];

const QuickMortgageCalculator = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8">Quick Mortgage Calculator</h2>
        
        <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-6">
          {mortgageData.map((item, index) => (
            <div 
              key={index} 
              className="flex-1 min-w-[160px] bg-[#FFFCF5] dark:bg-slate-800/50 border border-[#F5EEDC] dark:border-slate-700 rounded-xl p-6 text-center transition-all hover:shadow-md dark:hover:shadow-amber-900/10"
            >
              <p className="text-[14px] text-gray-400 dark:text-slate-500 font-medium mb-2">
                AED {item.price} Property
              </p>
              
              <h3 className="text-[24px] font-bold text-[#C5A048] dark:text-amber-400 mb-1">
                AED {item.monthly}
              </h3>
              
              <p className="text-[11px] text-gray-400 dark:text-slate-500 mb-4">
                per month (20% down, 25yr)
              </p>
              
              <div className="space-y-1">
                <p className="text-[12px] text-gray-500 dark:text-slate-400">
                  Down: <span className="font-medium text-slate-700 dark:text-slate-200">AED {item.down}</span>
                </p>
                <p className="text-[12px] text-gray-500 dark:text-slate-400">
                  DLD: <span className="font-medium text-slate-700 dark:text-slate-200">AED {item.dld}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-gray-400 dark:text-slate-500 italic">
          Based on 4.5% interest. Agent 2% + DLD 4% in upfront.
        </p>
      </div>
    </div>
  );
};

export default QuickMortgageCalculator;