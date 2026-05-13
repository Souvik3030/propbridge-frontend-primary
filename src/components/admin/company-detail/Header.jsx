import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = ({ company, isActive, status, isSubAdminView = false }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div className="flex items-center gap-5">
        {!isSubAdminView && (
          <Link 
            to="/admin" 
            className="p-3.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 hover:border-[#ccab59]/40 transition-all text-slate-500 dark:text-slate-400 hover:text-[#ccab59] shadow-sm hover:shadow-md group"
          >
            <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </Link>
        )}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2 py-0.5 bg-[#ccab59]/10 text-[#ccab59] text-[9px] font-black uppercase tracking-widest rounded-md border border-[#ccab59]/20">
              {isSubAdminView ? 'Your Brokerage' : 'Enterprise Entity'}
            </span>
            <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${
              isActive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
            }`}>
              {status}
            </div>
          </div>
          <h1 className="text-4xl font-serif font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {company.name}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 p-2 rounded-2xl border border-slate-200/50 dark:border-white/5 backdrop-blur-sm">
        <div className="px-4 py-2 text-right border-r border-slate-200/50 dark:border-white/5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Tier</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{company.plan} Plan</p>
        </div>
        <div className="px-4 py-2 text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">ID Hash</p>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">#{company.id.toString().substring(0,8)}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
