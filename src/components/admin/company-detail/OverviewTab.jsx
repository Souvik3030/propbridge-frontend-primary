import React, { useState } from 'react';
import { Globe, ExternalLink, Calendar, Mail, MapPin } from 'lucide-react';
import PlanUsageCard from './PlanUsageCard';
import { useAuth } from '../../../context/AuthContext';

const OverviewTab = ({ company, onOpenChangePlan, isSubAdmin = false, usersCount, invitesCount }) => {
  const { user: currentUser } = useAuth();
  const isSuperadmin = currentUser?.role?.toLowerCase() === 'superadmin' && !isSubAdmin;
  const [logoError, setLogoError] = useState(false);
  
  // Helper to extract initials from the naming convention (e.g., Golden Falcon -> GF)
  const getInitials = (name) => {
    if (!name) return '??';
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const hasLogo = company.logo_url && 
                  company.logo_url !== 'null' && 
                  company.logo_url !== 'undefined' && 
                  company.logo_url !== '' &&
                  !logoError;

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8">
      {/* Plan & Quota Management Card */}
      <PlanUsageCard 
        company={company} 
        onOpenChangePlan={onOpenChangePlan}
        isSuperadmin={isSuperadmin}
        usersCount={usersCount}
        invitesCount={invitesCount}
      />

      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccab59]/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex-1 space-y-8 w-full">
            <div className="flex items-center gap-6">
              {hasLogo ? (
                <div className="w-24 h-24 rounded-[1.5rem] bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg shadow-black/5">
                  <img 
                    src={company.logo_url} 
                    alt={company.name} 
                    className="w-full h-full object-contain transition-opacity duration-300"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-[#ccab59] to-[#b0944d] text-white flex items-center justify-center font-serif font-black text-3xl tracking-tighter flex-shrink-0 shadow-lg shadow-[#ccab59]/20 border-2 border-white/20">
                  {getInitials(company.name)}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{company.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-slate-400">{company.slug}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#ccab59]">
                    {isSubAdmin ? 'Brokerage Identity' : 'Registered Identity'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200/50 dark:border-white/5 transition-colors group-hover:border-[#ccab59]/30">
                    <Globe className="w-4 h-4 text-[#ccab59]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Official Domain</p>
                    <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#ccab59] transition-colors flex items-center gap-1.5">
                      {company.domain} <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200/50 dark:border-white/5 transition-colors group-hover:border-[#ccab59]/30">
                    <Calendar className="w-4 h-4 text-[#ccab59]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Registration Date</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {new Date(company.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-72 bg-slate-50/50 dark:bg-white/[0.03] rounded-3xl p-6 border border-slate-100 dark:border-white/5 backdrop-blur-md">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Direct Channels
            </h5>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Support Email</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 break-all">support@{company.domain}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Headquarters</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ccab59] mt-0.5 flex-shrink-0" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed uppercase">
                    {company.address || 'Business Bay, Dubai, UAE'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
