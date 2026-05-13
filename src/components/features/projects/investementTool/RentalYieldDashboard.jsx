import React from 'react';

const yieldData = [
  { area: "JUMEIRAH VILLAGE CIRCL...", yield: "17.9%", rent: "220,737", price: "1.2M", sales: "2246", contracts: "625" },
  { area: "DUBAI STUDIO CITY", yield: "17.6%", rent: "145,728", price: "0.8M", sales: "363", contracts: "3234" },
  { area: "JUMEIRAH VILLAGE TRIAN...", yield: "16.2%", rent: "220,737", price: "1.4M", sales: "768", contracts: "625" },
  { area: "DUBAI LAND RESIDENCE C...", yield: "12.9%", rent: "145,728", price: "1.1M", sales: "1463", contracts: "3234" },
  { area: "DUBAI SPORTS CITY", yield: "11.9%", rent: "145,728", price: "1.2M", sales: "684", contracts: "3234" },
  { area: "DUBAI PRODUCTION CITY", yield: "11.6%", rent: "145,728", price: "1.3M", sales: "736", contracts: "3234" },
  { area: "JUMEIRAH LAKES TOWERS", yield: "10.4%", rent: "220,737", price: "2.1M", sales: "532", contracts: "625" },
  { area: "DUBAI SCIENCE PARK", yield: "8.6%", rent: "145,728", price: "1.7M", sales: "359", contracts: "3234" },
];

const RentalYieldDashboard = () => {
  return (
    <div className="bg-[#FCFCFA] dark:bg-slate-900 p-8 font-sans text-[#4A4A4A]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Top Rental Yield Areas</h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
            Ranked by estimated gross yield — min 50 DLD sales
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {yieldData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-[#E8EEE9] dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md dark:hover:shadow-emerald-900/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-tight pr-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.area}
                </h3>
                <span className="text-[#2DBF7C] dark:text-emerald-400 font-bold text-lg">
                  {item.yield}
                </span>
              </div>
              
              <div className="space-y-1">
                <p className="text-[12px] text-gray-400 dark:text-slate-500">
                  Rent: <span className="text-gray-500 dark:text-slate-300">AED {item.rent}/yr</span> • Price: <span className="text-gray-500 dark:text-slate-300">AED {item.price}</span>
                </p>
                <p className="text-[11px] text-gray-400 dark:text-slate-500 italic">
                  {item.sales} DLD sales • {item.contracts} contracts
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalYieldDashboard;