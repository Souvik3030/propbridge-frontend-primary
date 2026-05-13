import React from 'react';

const areaData = [
  { id: 1, area: "JUMEIRAH VILLAGE CIRCLE", sales: "2,246", offPlan: "1,317", price: "AED 1.2M", sqft: "AED 1,395", mortgage: "21%", room: "1 B/R", yield: "17.9%" },
  { id: 2, area: "AL YELAYISS 1", sales: "2,020", offPlan: "1,973", price: "AED 5.0M", sqft: "AED 437", mortgage: "0%", room: "4 B/R", yield: "3.2%" },
  { id: 3, area: "MADINAT AL MATAAR", sales: "1,612", offPlan: "1,441", price: "AED 2.1M", sqft: "AED 721", mortgage: "7%", room: "1 B/R", yield: "4%" },
  { id: 4, area: "DUBAI LAND RESIDENCE COMPLEX", sales: "1,463", offPlan: "1,335", price: "AED 1.1M", sqft: "AED 1,331", mortgage: "5%", room: "Studio", yield: "12.9%" },
  { id: 5, area: "MAJAN", sales: "1,095", offPlan: "888", price: "AED 1.1M", sqft: "AED 1,335", mortgage: "15%", room: "Studio", yield: "—" },
  { id: 6, area: "JUMEIRAH VILLAGE TRIANGLE", sales: "768", offPlan: "609", price: "AED 1.4M", sqft: "AED 1,434", mortgage: "11%", room: "1 B/R", yield: "16.2%" },
  { id: 7, area: "DUBAI PRODUCTION CITY", sales: "736", offPlan: "580", price: "AED 1.3M", sqft: "AED 1,259", mortgage: "20%", room: "1 B/R", yield: "11.6%" },
  { id: 8, area: "ARJAN", sales: "721", offPlan: "409", price: "AED 1.1M", sqft: "AED 1,555", mortgage: "43%", room: "Studio", yield: "—" },
];

const AreaComparisonTable = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm font-sans text-[#4A4A4A] overflow-x-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Area Comparison — <span className="text-slate-800 dark:text-blue-400">Investment Metrics</span>
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
            Compare DLD sales, pricing, and estimated rental yields across top Dubai areas
          </p>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 text-[13px] text-gray-400 dark:text-slate-500 font-medium">
              <th className="pb-4 font-normal px-2">#</th>
              <th className="pb-4 font-normal">Area</th>
              <th className="pb-4 font-normal text-right px-4">Sales</th>
              <th className="pb-4 font-normal text-right px-4">Off-Plan</th>
              <th className="pb-4 font-normal text-right px-4">Avg Price</th>
              <th className="pb-4 font-normal text-right px-4">AED/sqft</th>
              <th className="pb-4 font-normal text-right px-4">Mortgage%</th>
              <th className="pb-4 font-normal text-right px-4">Top Room</th>
              <th className="pb-4 font-normal text-right">Est. Yield</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {areaData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors border-b border-gray-50/50 dark:border-slate-800/30 last:border-0">
                <td className="py-4 text-gray-300 dark:text-slate-700">{item.id}</td>
                <td className="py-4 font-bold text-slate-700 dark:text-slate-200">{item.area}</td>
                <td className="py-4 text-right px-4 font-medium text-blue-500 dark:text-blue-400">{item.sales}</td>
                <td className="py-4 text-right px-4 font-medium text-emerald-500 dark:text-emerald-400">{item.offPlan}</td>
                <td className="py-4 text-right px-4 font-medium text-amber-500 dark:text-amber-400">{item.price}</td>
                <td className="py-4 text-right px-4 text-slate-600 dark:text-slate-400">{item.sqft}</td>
                <td className="py-4 text-right px-4 font-medium text-purple-400 dark:text-purple-300">{item.mortgage}</td>
                <td className="py-4 text-right px-4 text-gray-500 dark:text-slate-500">{item.room}</td>
                <td className={`py-4 text-right font-bold ${item.yield === '—' ? 'text-gray-300 dark:text-slate-700' : 'text-emerald-500 dark:text-emerald-400'}`}>
                  {item.yield}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreaComparisonTable;