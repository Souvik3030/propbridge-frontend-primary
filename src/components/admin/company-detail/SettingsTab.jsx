import React from 'react';
import { Shield, Globe, Settings, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/Button';

const SettingsTab = ({ company }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="bg-white dark:bg-slate-900/60 rounded-[2rem] p-10 border border-slate-200/60 dark:border-white/10">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#ccab59]" /> Core Integrations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                <Globe className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">Property Finder</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Portal Syncing</p>
              </div>
            </div>
            {company.integrations?.has_property_finder ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : (
              <span className="text-[9px] font-black uppercase text-slate-400 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md">Not Linked</span>
            )}
          </div>

          <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                <Settings className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">Bitrix CRM</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Lead Automation</p>
              </div>
            </div>
            {company.integrations?.has_bitrix ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : (
              <span className="text-[9px] font-black uppercase text-slate-400 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-md">Not Linked</span>
            )}
          </div>
        </div>
        
        <Button variant="outline" className="mt-10 border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-widest h-11 px-8 rounded-xl shadow-sm">
          <Settings className="w-4 h-4 mr-2" /> Synchronize External Platforms
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;
