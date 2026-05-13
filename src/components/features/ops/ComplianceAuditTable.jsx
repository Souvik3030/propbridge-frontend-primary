import React from 'react';
import { ExternalLink, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';

const auditData = [
  { id: 1, ref: 'DXB-L-1024', title: 'Premium 3BR Villa in Marina', score: 94, errors: 0, warnings: 1, status: 'pass' },
  { id: 2, ref: 'DXB-L-9921', title: 'Studio Apartment - Downtown', score: 42, errors: 3, warnings: 2, status: 'fail' },
  { id: 3, ref: 'DXB-L-4410', title: 'Luxury Penthouse Palm Jumeirah', score: 88, errors: 0, warnings: 2, status: 'pass' },
  { id: 4, ref: 'DXB-L-7712', title: '2BR Apartment - Business Bay', score: 65, errors: 1, warnings: 4, status: 'warning' },
];

const ComplianceAuditTable = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[20px] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-800 dark:text-white">Listing Compliance Audit</h3>
          <p className="text-[10px] text-slate-400 font-medium">Real-time validation against portal rules</p>
        </div>
        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
          <ExternalLink size={14} className="text-[#ccab59]" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-transparent text-[10px] font-black text-slate-300 dark:text-slate-500 tracking-widest uppercase">
              <th className="px-5 py-2.5">Reference ID</th>
              <th className="px-5 py-2.5">Listing Title</th>
              <th className="px-5 py-2.5">Score</th>
              <th className="px-5 py-2.5">Issues</th>
              <th className="px-5 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
            {auditData.map((row) => (
              <tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-[#ccab59]/5 transition-colors">
                <td className="px-5 py-2.5 text-[11px] font-bold text-[#ccab59] group-hover:underline cursor-pointer">
                  {row.ref}
                </td>
                <td className="px-5 py-2.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 block truncate max-w-[200px]">
                    {row.title}
                  </span>
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          row.score > 80 ? 'bg-emerald-500' : row.score > 50 ? 'bg-[#ccab59]' : 'bg-red-500'
                        }`} 
                        style={{ width: `${row.score}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{row.score}%</span>
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-3">
                    <IssueBadge count={row.errors} type="error" />
                    <IssueBadge count={row.warnings} type="warning" />
                  </div>
                </td>
                <td className="px-5 py-2.5 text-right">
                  <button className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={14} className="text-slate-400" />
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

const IssueBadge = ({ count, type }) => {
  if (count === 0) return <div className="w-4 h-4 rounded bg-slate-50 dark:bg-white/5 opacity-20" />;
  const isError = type === 'error';
  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${
      isError 
        ? 'bg-red-50 border-red-100 text-red-500 dark:bg-red-500/10 dark:border-red-500/20' 
        : 'bg-[#fdfaf3] border-[#ccab59]/20 text-[#ccab59] dark:bg-[#ccab59]/10'
    }`}>
      {isError ? <AlertCircle size={10} /> : <CheckCircle2 size={10} />}
      <span className="text-[9px] font-black">{count}</span>
    </div>
  );
};

export default ComplianceAuditTable;
