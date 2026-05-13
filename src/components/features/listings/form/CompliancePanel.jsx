import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';

/**
 * CompliancePanel Component
 * Displays the results of the Property Finder compliance check.
 * Highlights mandatory errors and optional warnings for the user.
 */
const CompliancePanel = ({ compliance, loading, onRecheck }) => {
  if (loading) {
    return (
      <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl animate-pulse flex items-center justify-center gap-3">
        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        <span className="text-[14px] font-bold text-blue-600 dark:text-blue-400 tracking-tight">Running compliance check...</span>
      </div>
    );
  }

  if (!compliance) return null;

  const { compliant, errors = [], warnings = [], permit_valid, permit_status } = compliance;

  return (
    <div className={`
      relative p-6 rounded-2xl border-2 transition-all duration-300
      ${compliant 
        ? 'border-green-400/50 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800' 
        : 'border-red-400/50 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800'}
    `}>
      {/* Decorative Icon Background */}
      <div className="absolute right-6 top-6 opacity-5 dark:opacity-10">
        {compliant ? <CheckCircle2 size={80} /> : <AlertCircle size={80} />}
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${compliant ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}>
              {compliant ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            </div>
            <div>
              <h3 className={`text-[18px] font-black tracking-tight ${compliant ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {compliant ? 'Compliance PASSED' : 'Compliance FAILED'}
              </h3>
              <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
                Permit Status: <span className="font-bold underline">{permit_status}</span> 
                {permit_valid ? ' (Valid)' : ' (Invalid/Expired)'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onRecheck}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-[13px] border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all active:scale-95 shadow-sm"
            type="button"
          >
            <RefreshCw size={14} />
            Re-check
          </button>
        </div>

        {/* Errors Section (Foundational) */}
        {errors.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-red-500" />
              <p className="font-black text-red-700 dark:text-red-400 text-[14px]">MODIFICATION REQUIRED (MUST FIX):</p>
            </div>
            <ul className="space-y-3 pl-2 border-l-2 border-red-200 dark:border-red-900 ml-2">
              {errors.map((err, i) => (
                <li key={i} className="text-[13px] text-red-600 dark:text-red-400 font-medium leading-relaxed group">
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 rounded-md text-[10px] font-black mr-2 uppercase tracking-widest">{err.code}</span>
                  {err.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings Section (Optional) */}
        {warnings.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-500" />
              <p className="font-black text-amber-700 dark:text-amber-400 text-[14px]">QUALITY WARNINGS (OPTIONAL):</p>
            </div>
            <ul className="space-y-2 pl-2 border-l-2 border-amber-200 dark:border-amber-900 ml-2">
              {warnings.map((w, i) => (
                <li key={i} className="text-[13px] text-amber-600 dark:text-amber-400 font-medium leading-relaxed">
                  • {w.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!compliant && errors.length === 0 && (
          <p className="text-[13px] font-medium text-red-600 dark:text-red-400 mt-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
            Internal sync error detected. Please contact support.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompliancePanel;
