import React from 'react';
import { Building2, Globe, Layers, CreditCard } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, subValue, subColor }) => (
  <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700/30 rounded-[16px] p-4 flex flex-col gap-3 transition-all hover:translate-y-1 hover:shadow-xl group">
    <div className="w-9 h-9 rounded-lg bg-[#fdf8e9] dark:bg-[#2a2d42] flex items-center justify-center text-[#ccab59] group-hover:scale-110 transition-transform">
      <Icon size={18} strokeWidth={1.5} />
    </div>
    
    <div className="flex flex-col gap-0">
      <div className="text-[28px] font-serif font-bold text-slate-900 dark:text-white leading-none">
        {value}
      </div>
      <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
        {label}
      </div>
      {subValue && (
        <div className={`text-[9px] font-bold uppercase tracking-wider ${subColor || 'text-slate-500'}`}>
          {subValue}
        </div>
      )}
    </div>
  </div>
);

const OwnerDashboard = () => {
  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header bar */}
      <div className="bg-[#f9f5eb] dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-700/30 rounded-[16px] px-5 py-4 flex items-center gap-4 shadow-sm dark:shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccab59]/5 dark:bg-[#ccab59]/10 -rotate-45 translate-x-16 -translate-y-16 rounded-full pointer-events-none" />
        
        <div className="w-10 h-10 rounded-lg bg-[#fdf8e9] dark:bg-[#2a2d42] flex items-center justify-center text-[#ccab59] shadow-sm dark:shadow-inner">
           <Building2 size={20} strokeWidth={1.5} />
        </div>
        
        <div className="flex flex-col gap-0">
          <h1 className="text-[20px] font-serif font-bold text-slate-900 dark:text-white leading-tight">
            Owner Dashboard
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.1em]">
            Welcome back, <span className="text-[#ccab59]">Mohammad Ali</span> • 14 properties managed
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Building2}
          value="14"
          label="My Listings"
          subValue="9 live"
          subColor="text-red-500"
        />
        <StatCard 
          icon={Globe}
          value="9"
          label="Live on Portals"
          subValue="3 pending"
          subColor="text-red-500"
        />
        <StatCard 
          icon={Layers}
          value="—"
          label="Off-Plan Projects"
          subValue="Bayut Live"
          subColor="text-red-500"
        />
        <StatCard 
          icon={CreditCard}
          value="3"
          label="Pending Approval"
          subValue="Pending Approval"
          subColor="text-slate-400 dark:text-slate-500"
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
      `}} />
    </div>
  );
};

export default OwnerDashboard;
