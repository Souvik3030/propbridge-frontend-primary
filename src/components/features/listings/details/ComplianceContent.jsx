import React from 'react';
import { Info } from 'lucide-react';

const ComplianceContent = ({ listing }) => (
  <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-[1.5rem] p-7 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className="flex items-center gap-6 mb-8">
      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#f3f4f6" strokeWidth="4" />
          <circle cx="32" cy="32" r="28" fill="none" stroke={listing.isCompliant ? "#10b981" : "#f59e0b"} strokeWidth="4" strokeDasharray="176" strokeDashoffset={176 * (1 - (listing.score || 0)/100)} strokeLinecap="round" />
        </svg>
        <span className={`absolute text-[16px] font-black ${listing.isCompliant ? "text-[#10b981]" : "text-[#f59e0b]"}`}>{listing.score}</span>
      </div>
      <div>
        <h3 className="text-[16px] font-black text-slate-900 dark:text-white mb-1">Compliance Score: {listing.score}/100</h3>
        <p className={`text-[13px] font-bold ${listing.canPublish ? "text-[#10b981]" : "text-rose-500"}`}>
          {listing.canPublish ? "[OK] Listing is publishable" : "[FAILED] Listing cannot be published"}
        </p>
      </div>
    </div>

    {listing.validationDiffs && listing.validationDiffs.length > 0 && (
      <div className="space-y-3">
        <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2">Identified Issues</h4>
        {listing.validationDiffs.map((issue, idx) => (
          <div key={idx} className="bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100/50 dark:border-rose-900/20 rounded-xl p-4 flex items-center gap-3">
            <Info size={16} className="text-rose-500 shrink-0" />
            <span className="text-[13px] font-bold text-rose-600 dark:text-rose-400">{issue}</span>
          </div>
        ))}
      </div>
    )}

    {listing.validationDiffs?.length === 0 && (
      <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-900/20 rounded-xl p-4 flex items-center gap-3">
        <Info size={16} className="text-emerald-500 shrink-0" />
        <span className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400">Perfect Compliance. No issues found.</span>
      </div>
    )}
  </div>
);

export default ComplianceContent;
