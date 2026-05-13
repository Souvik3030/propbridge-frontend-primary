import React from 'react';
import { CheckCircle2, Globe, BarChart3, RefreshCw, Bell } from 'lucide-react';

const tabs = [
  { id: 'compliance', label: 'Compliance', icon: CheckCircle2 },
  { id: 'portal', label: 'Portal Health', icon: Globe },
  { id: 'agent', label: 'Agent Performance', icon: BarChart3 },
  { id: 'automation', label: 'Automation Rules', icon: RefreshCw },
  { id: 'alerts', label: 'Alerts', icon: Bell },
];

const OpsTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold transition-all whitespace-nowrap ${
              isActive 
                ? 'bg-[#ccab59] text-white shadow-lg shadow-[#ccab59]/20 translate-y-[-1px]' 
                : 'text-slate-500 hover:bg-[#ccab59]/5 hover:text-[#ccab59] dark:text-slate-400'
            }`}
          >
            <tab.icon size={14} className={isActive ? 'text-white' : ''} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default OpsTabs;
