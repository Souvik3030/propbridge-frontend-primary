import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, MoreVertical } from 'lucide-react';

const ComplianceAuditTable = () => {
  const listings = [
    { ref: 'VW-17708912', title: 'Canal-Facing Spacious 2BR | Ready to Move', score: 98, errors: 0, warnings: 0, status: 'pass' },
    { ref: 'VW-17716891', title: 'Modern 1BR | High ROI | Off-Plan Investment', score: 66, errors: 2, warnings: 1, status: 'warning' },
    { ref: 'VW-17715541', title: 'Brand New 2BR | Fully Fitted | Sea View', score: 100, errors: 0, warnings: 0, status: 'pass' },
    { ref: 'VW-17710298', title: 'Green Belt | Rented | 3BR + Maid Room', score: 93, errors: 0, warnings: 1, status: 'pass' },
    { ref: 'VW-17718513', title: 'Lagoon View | Genuine Resale | 3M Below OP', score: 100, errors: 0, warnings: 0, status: 'pass' },
    { ref: 'VW-17719234', title: 'Emaar Beachfront | 3BR | Full Sea View', score: 100, errors: 0, warnings: 0, status: 'pass' },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[14px] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
      {/* Table Header Section */}
      <div className="p-[16px_20px] border-b border-slate-200/60 dark:border-white/5 flex justify-between items-center bg-white dark:bg-[#1a1f33]">
        <h3 className="text-[16px] font-[700] text-[#1a1a2e] dark:text-[#f0f0f0] transition-colors">
          Listing Compliance Audit
        </h3>
        <span className="text-[11px] text-slate-400 dark:text-[#8892a4] font-mono font-bold uppercase tracking-tight">
          {listings.length} listings audited
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#f3f0e8] dark:bg-[#1e2440] transition-colors">
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Ref</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Listing</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Score</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Errors</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Warnings</th>
              <th className="p-[12px_14px] text-left text-[10px] font-[700] text-slate-400 dark:text-[#8892a4] uppercase tracking-[0.5px] border-b-2 border-[#c9a84c30]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {listings.map((row) => (
              <tr key={row.ref} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                <td className="p-[12px_14px] font-[700] text-[#c9a84c] whitespace-nowrap">{row.ref}</td>
                <td className="p-[12px_14px] font-[600] text-[#1a1a2e] dark:text-[#f0f0f0] transition-colors">{row.title}</td>
                <td className="p-[12px_14px]">
                  <div className="flex items-center gap-2">
                    <div className="w-[60px] h-[6px] rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${row.score}%`, 
                          backgroundColor: getScoreColor(row.score) 
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-[700]" style={{ color: getScoreColor(row.score) }}>
                      {row.score}
                    </span>
                  </div>
                </td>
                <td className="p-[12px_14px] font-[700] text-[#ef4444] font-mono">{row.errors}</td>
                <td className="p-[12px_14px] font-[700] text-[#f59e0b] font-mono">{row.warnings}</td>
                <td className="p-[12px_14px]">
                  {row.status === 'pass' ? (
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                  ) : row.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#ef4444]" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceAuditTable;
