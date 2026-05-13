import React, { useState } from 'react';

const fullProjectData = [
  { id: 1, project: "Maybach Six", area: "BUSINESS PARK", sales: "475", price: "AED 1.7M", sqft: "AED 3,687", config: "Studio" },
  { id: 2, project: "Binghatti Vintage", area: "MAJAN", sales: "470", price: "AED 0.8M", sqft: "AED 1,694", config: "Studio" },
  { id: 3, project: "Hado By Beyond", area: "Palm Deira", sales: "386", price: "AED 3.7M", sqft: "AED 3,287", config: "1 B/R" },
  { id: 4, project: "Shahrukhz by Danube", area: "TECOM SITE A", sales: "351", price: "AED 3.0M", sqft: "AED 4,172", config: "NA" },
  { id: 5, project: "DAMAC ISLANDS 2 – BAHAMAS 2", area: "Al Yelayiss 1", sales: "311", price: "AED 3.2M", sqft: "AED 1,799", config: "4 B/R" },
  { id: 6, project: "DAMAC ISLANDS 2 – BAHAMAS 1", area: "Al Yelayiss 1", sales: "305", price: "AED 3.2M", sqft: "AED 1,765", config: "4 B/R" },
  { id: 7, project: "Binghatti Cullinan", area: "SAMA AL JADAF", sales: "263", price: "AED 1.2M", sqft: "AED 2,184", config: "Studio" },
  { id: 8, project: "WINDSOR HOUSE", area: "Madinat Al Mataar", sales: "253", price: "AED 1.5M", sqft: "AED 1,467", config: "1 B/R" },
  { id: 9, project: "DAMAC ISLANDS 2 - BERMUDA", area: "Al Yelayiss 1", sales: "248", price: "AED 3.3M", sqft: "AED 1,821", config: "4 B/R" },
  { id: 10, project: "DAMAC ISLANDS 2 - CUBA", area: "Al Yelayiss 1", sales: "236", price: "AED 3.4M", sqft: "AED 1,754", config: "4 B/R" },
  { id: 11, project: "DAMAC ISLANDS 2 - MAUI", area: "Al Yelayiss 1", sales: "224", price: "AED 3.5M", sqft: "AED 1,866", config: "4 B/R" },
  { id: 12, project: "Creek Haven", area: "Al Khairan First", sales: "212", price: "AED 2.7M", sqft: "AED 2,754", config: "1 B/R" },
  { id: 13, project: "Breez by Danube", area: "DUBAI MARITIME CITY", sales: "201", price: "AED 2.0M", sqft: "AED 3,509", config: "Studio" },
  { id: 14, project: "Creek Bay", area: "Al Khairan First", sales: "192", price: "AED 3.3M", sqft: "AED 2,831", config: "1 B/R" },
  { id: 15, project: "SIERRA BY IMAN", area: "MOTOR CITY", sales: "192", price: "AED 1.5M", sqft: "AED 1,576", config: "1 B/R" },
  { id: 16, project: "DAMAC ISLANDS 2 - BARBADOS 1", area: "Al Yelayiss 1", sales: "191", price: "AED 3.4M", sqft: "AED 1,861", config: "4 B/R" },
  { id: 17, project: "Samana Boulevard Heights", area: "DUBAI LAND RESIDENCE COMPLEX", sales: "184", price: "AED 0.9M", sqft: "AED 1,585", config: "Studio" },
  { id: 18, project: "Nourelle", area: "Um Suqaim Third", sales: "183", price: "AED 4.3M", sqft: "AED 2,860", config: "2 B/R" },
  { id: 19, project: "DAMAC ISLANDS 2 - BARBADOS 2", area: "Al Yelayiss 1", sales: "172", price: "AED 3.4M", sqft: "AED 1,827", config: "4 B/R" },
  { id: 20, project: "Kanyon By Beyond", area: "Madinat Dubai Almelaheyah", sales: "167", price: "AED 3.1M", sqft: "AED 2,960", config: "1 B/R" },
  { id: 21, project: "DAMAC RIVERSIDE VIEWS - AZURE 2", area: "Dubai Investment Park Second", sales: "167", price: "AED 1.1M", sqft: "AED 1,466", config: "1 B/R" },
  { id: 22, project: "Terra Gardens", area: "Madinat Al Mataar", sales: "162", price: "AED 2.1M", sqft: "AED 2,088", config: "2 B/R" },
  { id: 23, project: "DAMAC ISLANDS 2 - TAHITI 2", area: "Al Yelayiss 1", sales: "161", price: "AED 3.7M", sqft: "AED 1,802", config: "4 B/R" },
  { id: 24, project: "Palace Residences Hillside A", area: "Hadaeq Sheikh Mohammed Bin Rashid", sales: "153", price: "AED 2.6M", sqft: "AED 2,527", config: "2 B/R" },
  { id: 25, project: "DAMAC ISLANDS 2 - TAHITI 1", area: "Al Yelayiss 1", sales: "125", price: "AED 3.8M", sqft: "AED 1,824", config: "5 B/R" },
  { id: 26, project: "Palm Central Private Residences - Frond M", area: "Palm Jabal Ali", sales: "123", price: "AED 6.4M", sqft: "AED 3,467", config: "2 B/R" },
  { id: 27, project: "Avarra by Palace", area: "BUSINESS BAY", sales: "122", price: "AED 4.8M", sqft: "AED 3,398", config: "1 B/R" },
  { id: 28, project: "Lyvia by Palace", area: "Al Khairan First", sales: "119", price: "AED 2.8M", sqft: "AED 2,599", config: "1 B/R" },
  { id: 29, project: "City Walk Crestlane 4", area: "Al Wasl", sales: "110", price: "AED 4.4M", sqft: "AED 3,343", config: "2 B/R" },
  { id: 30, project: "Franck Muller Yachting", area: "DUBAI MARITIME CITY", sales: "104", price: "AED 2.0M", sqft: "AED 2,423", config: "Studio" },
];

const HottestProjectsTable = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? fullProjectData : fullProjectData.slice(0, 7);

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm font-sans">
      <div className=" mx-auto">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Hottest Projects by Actual DLD Sales</h2>
            <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
              Ranked by real transaction count — not listings, but actual registered sales
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 text-[13px] text-gray-400 dark:text-slate-500 font-medium">
                <th className="pb-4 font-normal w-12">#</th>
                <th className="pb-4 font-normal">Project</th>
                <th className="pb-4 font-normal">Area</th>
                <th className="pb-4 font-normal text-right px-4">DLD Sales</th>
                <th className="pb-4 font-normal text-right px-4">Avg Price</th>
                <th className="pb-4 font-normal text-right px-4">Price/sqft</th>
                <th className="pb-4 font-normal text-right">Top Config</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {displayedData.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 dark:border-slate-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 text-amber-500 dark:text-amber-400 font-medium">{item.id}</td>
                  <td className="py-4 font-bold text-slate-800 dark:text-slate-200">{item.project}</td>
                  <td className="py-4 text-gray-400 dark:text-slate-500 uppercase tracking-tight text-[11px]">{item.area}</td>
                  <td className="py-4 text-right px-4">
                    <span className={`inline-block px-3 py-1 rounded-full font-bold text-[12px] 
                      ${item.id <= 3 
                        ? 'bg-[#FDF6E3] dark:bg-amber-900/20 text-[#C5A048] dark:text-amber-500' 
                        : 'bg-[#E6F6EF] dark:bg-emerald-900/20 text-[#2DBF7C] dark:text-emerald-500'}`}>
                      {item.sales}
                    </span>
                  </td>
                  <td className="py-4 text-right px-4 font-medium text-amber-500 dark:text-amber-400">{item.price}</td>
                  <td className="py-4 text-right px-4 text-slate-600 dark:text-slate-400 font-medium">{item.sqft}</td>
                  <td className="py-4 text-right text-gray-300 dark:text-slate-600 font-medium">{item.config}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors border border-gray-200 dark:border-slate-700 px-6 py-2 rounded-lg bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800"
          >
            {showAll ? "Show Less" : `View All ${fullProjectData.length} Projects`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HottestProjectsTable;