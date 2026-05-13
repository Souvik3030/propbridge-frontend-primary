import React from 'react';
import { ShieldCheck, Building2, AlertCircle, Loader2 } from 'lucide-react';

const EcosystemSidebar = ({ company, userCount, isActive, status, onToggleStatus, isToggling }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-slate-200/60 dark:border-white/10 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[40px] rounded-full -mr-12 -mt-12 pointer-events-none" />
      
      <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#ccab59]" /> Ecosystem Stats
      </h3>
      
      <div className="space-y-5">
        <div className="flex justify-between items-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Agents</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{userCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        <div className="flex justify-between items-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Subscription</p>
            <p className="text-sm font-black text-[#ccab59] uppercase tracking-widest">{company.plan} Tier</p>
          </div>
          <ShieldCheck className="w-5 h-5 text-[#ccab59] opacity-40" />
        </div>
        
        <div className="flex justify-between items-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Entity Status</p>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-500' : 'text-red-500'}`}>
              {status}
            </p>
          </div>
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-red-500'} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
        <button
          onClick={onToggleStatus}
          disabled={isToggling}
          className={`w-full text-xs font-black uppercase tracking-widest h-12 rounded-xl transition-all border shadow-sm flex items-center justify-center gap-2 ${
            isActive
              ? 'text-red-600 border-red-200 bg-white hover:bg-red-50 dark:bg-transparent dark:border-red-500/30 dark:hover:bg-red-500/20' 
              : 'text-emerald-600 border-emerald-200 bg-white hover:bg-emerald-50 dark:bg-transparent dark:border-emerald-500/30 dark:hover:bg-emerald-500/20' 
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            isActive ? <AlertCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />
          )}
          {isToggling ? 'Processing...' : (isActive ? 'Suspend Entity' : 'Reactivate Record')}
        </button>
      </div>
    </div>
  );
};

export default EcosystemSidebar;
