import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

const ComplianceContent = ({ listing }) => {
  const score = listing.score || 0;
  
  return (
    <div className="bg-white dark:bg-[#1a1f35] border border-black/5 dark:border-white/10 rounded-[14px] p-[22px] animate-in fade-in slide-in-from-bottom-2 duration-500 transition-colors shadow-sm">
      <div className="flex items-center gap-[20px] mb-[20px]">
        {/* Progress Circle Wrapper */}
        <div className="relative w-[80px] h-[80px] shrink-0">
          <svg width="80" height="80" viewBox="0 0 36 36" className="transform -rotate-90 overflow-visible">
            {/* Background Path */}
            <circle 
              cx="18" 
              cy="18" 
              r="15.9" 
              fill="none" 
              className="stroke-slate-100 dark:stroke-white/10"
              strokeWidth="2.5"
            />
            {/* Progress Path */}
            <circle 
              cx="18" 
              cy="18" 
              r="15.9" 
              fill="none" 
              stroke={listing.isCompliant ? "#10b981" : "#f59e0b"}
              strokeWidth="2.5" 
              strokeDasharray={`${score} 100`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-['Playfair_Display',_serif] text-[20px] font-extrabold" style={{ color: listing.isCompliant ? "#10b981" : "#f59e0b" }}>
            {score}
          </div>
        </div>

        {/* Header Info */}
        <div>
          <div className="text-[18px] font-extrabold text-slate-900 dark:text-[#f0f0f0] font-['Playfair_Display',_serif]">
            Compliance Score: {score}/100
          </div>
          <div className={`text-[14px] font-bold ${listing.isCompliant ? "text-[#10b981]" : "text-rose-500"}`}>
            {listing.isCompliant ? "[OK] Listing is publishable" : "[FAILED] Action Required"}
          </div>
        </div>
      </div>

      {/* Issues / Success Section */}
      <div className="space-y-1.5">
        {listing.validationDiffs && listing.validationDiffs.length > 0 ? (
          listing.validationDiffs.map((issue, idx) => (
            <div key={idx} className="p-[12px] rounded-[10px] flex items-center gap-[10px] bg-blue-500/[0.03] dark:bg-blue-500/[0.05] border border-blue-500/10">
              <Info size={16} className="text-[#3b82f6] shrink-0" />
              <span className="text-[14px] font-semibold text-slate-700 dark:text-[#f0f0f0]">{issue}</span>
            </div>
          ))
        ) : (
          <div className="p-[12px] rounded-[10px] flex items-center gap-[10px] bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] border border-emerald-500/10">
            <CheckCircle2 size={16} className="text-[#10b981] shrink-0" />
            <span className="text-[14px] font-semibold text-slate-700 dark:text-[#f0f0f0]">Perfect Compliance. Listing is live ready.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceContent;
