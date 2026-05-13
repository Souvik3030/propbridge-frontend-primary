import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Building2, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CompanyListRow = ({ company }) => {
  const { user } = useAuth();

  const userCount = company.metrics?.users_count || 0;
  const isActive = company.is_active !== undefined ? company.is_active : (company.status === 'Active');
  const status = company.status || (isActive ? 'Active' : 'Suspended');

  const isSuperAdminCompany = company.id === user?.company_id || company.id === user?.company?.id;

  return (
    // VULN-10 fix: Removed `state={{ company }}` from this Link.
    // Router state is client-writable via window.history.pushState, meaning
    // an attacker could inject a fake company object upstream of CompanyDetailPage.
    // CompanyDetailPage already re-fetches the company by slug from the API
    // (authoritative source), so passing state here was redundant and unsafe.
    <Link to={`/admin/companies/${company.slug}`} className="block group">
      <div className={`w-full flex items-center p-4 border rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
        isActive 
          ? 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-[#ccab59]/30 dark:hover:border-[#ccab59]/30' 
          : 'bg-red-50/40 dark:bg-red-900/10 border-red-100 dark:border-red-900/20'
      }`}>
        
        {/* Avatar/Logo */}
        <div className="flex-shrink-0 mr-4">
          {company.logo_url ? (
            <div className={`w-12 h-12 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-center p-1.5 overflow-hidden ${isActive ? 'bg-white dark:bg-slate-800' : 'bg-white dark:bg-slate-800 opacity-50 grayscale'}`}>
              <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif font-black text-xl shadow-sm ${
              isActive 
                ? 'bg-[#ccab59]/10 text-[#ccab59] border border-[#ccab59]/20' 
                : 'bg-red-100/50 text-red-400 border border-red-200 dark:bg-red-900/20 dark:text-red-500 dark:border-red-800'
            }`}>
              {company.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Core Details */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className={`text-[15px] font-bold truncate leading-none transition-colors ${isActive ? 'text-slate-900 dark:text-white group-hover:text-[#ccab59]' : 'text-slate-500 dark:text-slate-400'}`}>
              {company.name}
            </h3>
            {!isActive && (
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-red-200 dark:border-red-800">
                Suspended
              </span>
            )}
            {isSuperAdminCompany && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-amber-200 to-amber-400 dark:from-amber-600/30 dark:to-orange-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)] text-amber-900 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 text-[9px] font-black uppercase tracking-widest rounded-md flex items-center gap-1">
                <Crown className="w-2.5 h-2.5" />
                Super Admin
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 italic text-slate-400 dark:text-slate-500"><Globe className="w-3 h-3 text-[10px] text-[#ccab59]" /> {company.domain}</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap"><Users className="w-3 h-3 text-blue-500" /> {userCount} Users</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap uppercase tracking-widest text-[#ccab59]"><Building2 className="w-3 h-3 text-slate-400" /> {company.plan}</span>
          </div>
        </div>

        {/* Integrations & Go */}
        <div className="flex items-center gap-6 pl-4 border-l border-slate-100 dark:border-white/5">
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full transition-opacity ${company.integrations?.has_property_finder ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]' : 'bg-slate-200 dark:bg-slate-700'}`} />
              <span className={`text-[9px] font-bold uppercase tracking-widest ${company.integrations?.has_property_finder ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}>PF</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full transition-opacity ${company.integrations?.has_bitrix ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]' : 'bg-slate-200 dark:bg-slate-700'}`} />
              <span className={`text-[9px] font-bold uppercase tracking-widest ${company.integrations?.has_bitrix ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}>BX</span>
            </div>
          </div>
          
          <div className={`text-[10px] font-black uppercase tracking-widest transition-transform group-hover:translate-x-1 whitespace-nowrap ${isActive ? 'text-[#ccab59]' : 'text-slate-400'}`}>
            Profiles →
          </div>
        </div>

      </div>
    </Link>
  );
};

export default CompanyListRow;
