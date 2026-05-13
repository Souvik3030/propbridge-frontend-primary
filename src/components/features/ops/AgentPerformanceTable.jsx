import React from 'react';
import { User, MoreHorizontal, Mail } from 'lucide-react';

const agentData = [
  { id: 1, name: 'Ahmed Khan', email: 'ahmed.k@vortex.ae', brn: 'BRN-11202', live: 142, views: '12.4K', conversion: '4.2%', revenue: '1.2M', score: 94 },
  { id: 2, name: 'Sara Smith', email: 'sara.s@vortex.ae', brn: 'BRN-99421', live: 98, views: '8.1K', conversion: '3.8%', revenue: '840K', score: 88 },
  { id: 3, name: 'John Doe', email: 'john.d@vortex.ae', brn: 'BRN-44102', live: 76, views: '5.2K', conversion: '2.1%', revenue: '420K', score: 65 },
  { id: 4, name: 'Elena Gilbert', email: 'elena.g@vortex.ae', brn: 'BRN-77123', live: 42, views: '3.8K', conversion: '1.8%', revenue: '210K', score: 52 },
];

const AgentPerformanceTable = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[20px] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-800 dark:text-white">Agent Performance Leaderboard</h3>
          <p className="text-[10px] text-slate-400 font-medium">Monthly productivity and conversion metrics</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-3 py-1 bg-[#ccab59] text-white text-[10px] font-bold rounded-lg shadow-lg shadow-[#ccab59]/20">
             Export CSV
           </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-transparent text-[10px] font-black text-slate-300 dark:text-slate-500 tracking-widest uppercase">
              <th className="px-5 py-2.5">Rank</th>
              <th className="px-5 py-2.5">Agent Details</th>
              <th className="px-5 py-2.5 text-center">Live</th>
              <th className="px-5 py-2.5 text-center">Views</th>
              <th className="px-5 py-2.5 text-center">Conv.</th>
              <th className="px-5 py-2.5 text-center">Revenue</th>
              <th className="px-5 py-2.5">Efficiency</th>
              <th className="px-5 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
            {agentData.map((agent, index) => (
              <tr key={agent.id} className="group hover:bg-slate-50 dark:hover:bg-[#ccab59]/5 transition-colors">
                <td className="px-5 py-2.5">
                  <span className={`text-[12px] font-black ${index === 0 ? 'text-[#ccab59]' : 'text-slate-400'}`}>
                    #{index + 1}
                  </span>
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-slate-700/50">
                      <User size={14} className="text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight truncate max-w-[120px]">
                        {agent.name}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium flex items-center gap-1">
                        <Mail size={8} /> {agent.brn}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-2.5 text-center font-bold text-[11px] text-slate-600 dark:text-slate-400">{agent.live}</td>
                <td className="px-5 py-2.5 text-center font-bold text-[11px] text-slate-600 dark:text-slate-400">{agent.views}</td>
                <td className="px-5 py-2.5 text-center">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border border-emerald-100 dark:border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">
                    {agent.conversion}
                  </span>
                </td>
                <td className="px-5 py-2.5 text-center font-bold text-[11px] text-[#ccab59]">{agent.revenue}</td>
                <td className="px-5 py-2.5">
                   <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ccab59] rounded-full" style={{ width: `${agent.score}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{agent.score}</span>
                  </div>
                </td>
                <td className="px-5 py-2.5 text-right">
                  <button className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-all opacity-0 group-hover:opacity-100 text-slate-400">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentPerformanceTable;
