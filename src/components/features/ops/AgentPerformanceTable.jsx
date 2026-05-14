import React from 'react';
import { User, MoreVertical, Mail, TrendingUp } from 'lucide-react';

const agentData = [
  { id: 1, name: 'Ahmed Khan', email: 'ahmed.k@vortex.ae', brn: 'BRN-11202', live: 142, views: '12.4K', conversion: '4.2%', revenue: '1.2M', score: 94 },
  { id: 2, name: 'Sara Smith', email: 'sara.s@vortex.ae', brn: 'BRN-99421', live: 98, views: '8.1K', conversion: '3.8%', revenue: '840K', score: 88 },
  { id: 3, name: 'John Doe', email: 'john.d@vortex.ae', brn: 'BRN-44102', live: 76, views: '5.2K', conversion: '2.1%', revenue: '420K', score: 65 },
  { id: 4, name: 'Elena Gilbert', email: 'elena.g@vortex.ae', brn: 'BRN-77123', live: 42, views: '3.8K', conversion: '1.8%', revenue: '210K', score: 52 },
];

const AgentPerformanceTable = () => {
  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[14px] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
      {/* Table Header Section */}
      <div className="p-[16px_20px] border-b border-slate-200/60 dark:border-white/5 flex justify-between items-center bg-white dark:bg-[#1a1f33]">
        <div className="flex flex-col">
          <h3 className="text-[16px] font-[700] text-[#1a1a2e] dark:text-[#f0f0f0] transition-colors leading-tight">
            Agent Performance Leaderboard
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-[#8892a4] mt-1 font-medium">Monthly productivity and conversion metrics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-[#c9a84c12] text-[#c9a84c] text-[11px] font-[700] rounded-[8px] hover:bg-[#c9a84c20] transition-all uppercase tracking-tight">
          <TrendingUp className="w-3.5 h-3.5" />
          Full Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#f3f0e8] dark:bg-[#1e2440] transition-colors">
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Rank</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Agent Details</th>
              <th className="p-[12px_14px] text-center text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Live</th>
              <th className="p-[12px_14px] text-center text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Conv.</th>
              <th className="p-[12px_14px] text-center text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Revenue</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Efficiency</th>
              <th className="p-[12px_14px] text-right text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {agentData.map((agent, index) => (
              <tr key={agent.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                <td className="p-[12px_14px] font-[800] font-serif text-[#c9a84c] text-[15px]">
                  #{index + 1}
                </td>
                <td className="p-[12px_14px]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[10px] bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/5">
                      <User size={16} className="text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-[700] text-[#1a1a2e] dark:text-[#f0f0f0] leading-none transition-colors">
                        {agent.name}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-[#8892a4] mt-1.5 transition-colors font-medium">
                        {agent.brn}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-[12px_14px] text-center font-[800] font-mono text-[#1a1a2e] dark:text-white">{agent.live}</td>
                <td className="p-[12px_14px] text-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[#10b981] text-[10px] font-[800] uppercase tracking-tight">
                    {agent.conversion}
                  </span>
                </td>
                <td className="p-[12px_14px] text-center font-[800] font-mono text-[#c9a84c]">{agent.revenue}</td>
                <td className="p-[12px_14px]">
                  <div className="flex items-center gap-2">
                    <div className="w-[60px] h-[6px] rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${agent.score}%`, 
                          backgroundColor: agent.score >= 90 ? '#10b981' : agent.score >= 70 ? '#f59e0b' : '#ef4444' 
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-[700]" style={{ color: agent.score >= 90 ? '#10b981' : agent.score >= 70 ? '#f59e0b' : '#ef4444' }}>
                      {agent.score}
                    </span>
                  </div>
                </td>
                <td className="p-[12px_14px] text-right">
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400">
                    <MoreVertical size={16} />
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
