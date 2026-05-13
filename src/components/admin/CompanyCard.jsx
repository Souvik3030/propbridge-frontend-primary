import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Calendar, CheckCircle2, Building2, Crown } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

const CompanyCard = ({ company }) => {
  const { user } = useAuth();
  
  const userCount = company.metrics?.users_count || 0;
  const isActive = company.is_active !== undefined ? company.is_active : (company.status === 'Active');
  const status = company.status || (isActive ? 'Active' : 'Suspended');
  
  // Intelligent Super Admin recognition: Direct ID relation to the logged-in Super Admin establishing identity truth
  const isSuperAdminCompany = company.id === user?.company_id || company.id === user?.company?.id;

  return (
    <Link to={`/admin/companies/${company.slug}`} state={{ company }} className="block group h-full">
      <Card className={`overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full hover:-translate-y-1
        ${isActive
          ? 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800'
          : 'bg-slate-50/80 dark:bg-[#0f172a] border-red-200/60 dark:border-red-900/30'
        }`}>
        {/* Header Visual */}
        <div className={`relative h-[80px] flex items-center px-6 overflow-hidden border-b ${isActive ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/50' : 'bg-red-50/40 dark:bg-red-900/10 border-red-100 dark:border-red-900/20'}`}>
          <div className={`absolute top-0 left-0 w-full h-1 ${isActive ? 'bg-[#ccab59]/20' : 'bg-red-400/30'}`} />
          
          {company.logo_url ? (
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm z-10 transition-transform group-hover:scale-105">
              <img src={company.logo_url} alt={company.name} className={`w-full h-full object-contain ${!isActive ? 'opacity-50 grayscale' : ''}`} />
            </div>
          ) : (
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-serif font-black text-2xl flex-shrink-0 shadow-sm z-10 transition-transform group-hover:scale-105 ${isActive ? 'bg-[#ccab59]/10 text-[#ccab59] border border-[#ccab59]/20' : 'bg-red-100/50 text-red-400 border border-red-200 dark:bg-red-900/20 dark:text-red-500 dark:border-red-800'}`}>
              {company.name.charAt(0)}
            </div>
          )}
          
          <Building2 className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-200 dark:text-white/5 opacity-50 transform rotate-12" />

          {/* Superadmin Host Badge Overlay */}
          {isSuperAdminCompany && (
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-amber-200 to-amber-400 dark:from-amber-600/30 dark:to-orange-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest rounded-md flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.3)] z-20">
              <Crown className="w-2.5 h-2.5" />
              Super Admin Core
            </span>
          )}

          {/* Suspended badge overlay */}
          {!isActive && (
            <span className={`absolute ${isSuperAdminCompany ? 'top-10' : 'top-3'} right-3 px-2 py-0.5 bg-red-500/10 border border-red-300/50 dark:border-red-800 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-md z-20`}>
              Suspended
            </span>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="p-5 flex flex-col flex-1">
          {/* Name & Domain */}
          <div className="mb-4">
            <h3 className={`text-[17px] font-bold mb-0.5 leading-tight transition-colors ${isActive ? 'text-slate-900 dark:text-white group-hover:text-[#ccab59]' : 'text-slate-500 dark:text-slate-400'}`}>{company.name}</h3>
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[11px] font-medium italic">
              <Globe className="w-3 h-3 text-[#ccab59]" />
              {company.domain}
            </div>
          </div>

          {/* Metric Pills Row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-md border border-blue-100/50 dark:border-blue-900/40 flex items-center gap-1">
              <Users className="w-2.5 h-2.5" /> {userCount} Users
            </span>
            <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold rounded-md border border-purple-100/50 dark:border-purple-900/40 flex items-center gap-1 uppercase tracking-tight">
              {company.plan}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border flex items-center gap-1 uppercase tracking-tight ${
              isActive
                ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-500 border-emerald-100 dark:border-emerald-900/20'
                : 'bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 border-red-100 dark:border-red-900/20'
            }`}>
              {status}
            </span>
          </div>

          {/* Integration Status Area */}
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 text-[10px] font-bold transition-opacity whitespace-nowrap ${company.integrations?.has_property_finder ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${company.integrations?.has_property_finder ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]' : 'bg-slate-200 dark:bg-slate-700'}`} />
                PF
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold transition-opacity whitespace-nowrap ${company.integrations?.has_bitrix ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${company.integrations?.has_bitrix ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]' : 'bg-slate-200 dark:bg-slate-700'}`} />
                BX
              </div>
            </div>
            
            <div className={`text-[10px] font-black uppercase tracking-widest transition-transform group-hover:translate-x-1 ${isActive ? 'text-[#ccab59]' : 'text-slate-400'}`}>
              Profiles →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CompanyCard;
