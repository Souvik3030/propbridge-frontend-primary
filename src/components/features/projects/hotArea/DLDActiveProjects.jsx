import React from 'react';

const activeProjectsData = [
  { project: "Verdes by Haven 2", developer: "AURORA SPV 1 L.L.C", area: "Wadi Al Safa 5", units: "59", completed: 2.5, endDate: "2028-06-30", escrow: "VERIFIED" },
  { project: "INTERSTELLAR TOWER", developer: "BOUJEE REAL ESTATE DEVELOPMENT L.L.C", area: "Al Barsha South Fifth", units: "341", completed: 0.0, endDate: "2028-09-30", escrow: "VERIFIED" },
  { project: "Mayfair Nexus by Seven Mayfair", developer: "SEVEN MAYFAIR REAL ESTATE DEVELOPMENT L.L.C", area: "Wadi Al Safa 7", units: "473", completed: 0.0, endDate: "2028-12-31", escrow: "VERIFIED" },
  { project: "Symphony by Chaimaa", developer: "DEVAL REAL ESTATE DEVELOPMENT L.L.C", area: "Wadi Al Safa 3", units: "71", completed: 0.0, endDate: "2027-08-31", escrow: "VERIFIED" },
  { project: "Trump Tower", developer: "DAR GLOBAL LUXURY PROPERTY DEVELOPMENT L.L.C S.O.C", area: "Trade Center First", units: "574", completed: 0.0, endDate: "2031-12-31", escrow: "VERIFIED" },
  { project: "Olbia", developer: "NSHAMA PROPERTIES OWNED BY NSHMI DEVELOPMENT ONE PERSON COMPANY L.L.C", area: "Al Yelayiss 2", units: "156", completed: 0.0, endDate: "2028-05-31", escrow: "VERIFIED" },
  { project: "Hayat 2", developer: "DUBAI SOUTH PROPERTIES DWC LLC", area: "Madinat Al Mataar", units: "-", completed: 0.0, endDate: "2028-05-31", escrow: "VERIFIED" },
  { project: "Hayat 3", developer: "DUBAI SOUTH PROPERTIES DWC LLC", area: "Madinat Al Mataar", units: "-", completed: 0.0, endDate: "2028-05-31", escrow: "VERIFIED" },
  { project: "SERA 1", developer: "MINA RASHID PROPERTIES L.L.C", area: "Madinat Dubai Almelaheyah", units: "203", completed: 0.0, endDate: "2029-11-30", escrow: "VERIFIED" },
  { project: "SERA 2", developer: "MINA RASHID PROPERTIES L.L.C", area: "Madinat Dubai Almelaheyah", units: "183", completed: 0.0, endDate: "2029-11-30", escrow: "VERIFIED" },
];

const DLDActiveProjects = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 shadow-sm font-sans overflow-x-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            DLD Active Projects <span className="text-gray-400 dark:text-slate-500 font-normal">(72)</span>
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
            RERA-registered projects with official completion tracking & escrow accounts
          </p>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 text-[13px] text-gray-400 dark:text-slate-500 font-medium">
              <th className="pb-4 font-normal">Project</th>
              <th className="pb-4 font-normal">Developer</th>
              <th className="pb-4 font-normal">Area</th>
              <th className="pb-4 font-normal text-right px-4">Units</th>
              <th className="pb-4 font-normal px-4">Completed %</th>
              <th className="pb-4 font-normal px-4">End Date</th>
              <th className="pb-4 font-normal text-right">Escrow</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {activeProjectsData.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-50 dark:border-slate-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-4 font-bold text-slate-800 dark:text-slate-200">{item.project}</td>
                <td className="py-4 text-[11px] text-gray-400 dark:text-slate-500 pr-4 max-w-[200px] leading-tight uppercase font-medium">
                  {item.developer}
                </td>
                <td className="py-4 text-gray-400 dark:text-slate-500">{item.area}</td>
                <td className="py-4 text-right px-4 font-bold text-blue-600 dark:text-blue-400">
                  {item.units}
                </td>
                <td className="py-4 px-4 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    {/* Progress Bar Track */}
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" 
                        style={{ width: `${item.completed}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{item.completed}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-400 dark:text-slate-500">{item.endDate}</td>
                <td className="py-4 text-right">
                  <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 tracking-wider">
                    {item.escrow}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DLDActiveProjects;