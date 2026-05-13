import React from 'react';

const agents = [
  { name: 'Fatima Ali', listings: 1, views: '5,600', leads: 42 },
  { name: 'Ahmed Khan', listings: 3, views: '5,330', leads: 38 },
  { name: 'Omar Syed',  listings: 2, views: '5,100', leads: 40 },
  { name: 'Sara Ahmed', listings: 2, views: '4,760', leads: 37 },
];

const AgentPerformance = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-3 shadow-sm h-full">
      <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
        Agent Performance
      </h3>
      
      <div className="overflow-auto pb-1 custom-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Agent</th>
              <th className="py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Listings</th>
              <th className="py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Views</th>
              <th className="py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Leads</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {agents.map((agent) => (
              <tr key={agent.name} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                <td className="py-2 text-[12px] font-bold text-slate-800 dark:text-slate-200">
                  {agent.name}
                </td>
                <td className="py-2 text-[12px] font-bold text-slate-500 dark:text-slate-400 text-center">
                  {agent.listings}
                </td>
                <td className="py-2 text-[12px] font-bold text-[#ccab59] text-center">
                  {agent.views}
                </td>
                <td className="py-2 text-[12px] font-bold text-slate-500 dark:text-slate-400 text-center">
                  {agent.leads}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentPerformance;
