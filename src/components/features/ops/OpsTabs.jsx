import React from 'react';
import { CheckCircle, Globe, Users, Repeat, AlertCircle } from 'lucide-react';

const tabs = [
  { id: 'compliance', label: 'Compliance', Icon: CheckCircle },
  { id: 'portal', label: 'Portal Health', Icon: Globe },
  { id: 'performance', label: 'Agent Performance', Icon: Users },
  { id: 'automation', label: 'Automation Rules', Icon: Repeat },
  { id: 'alerts', label: 'Alerts', Icon: AlertCircle },
];

const OpsTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-1.5 mb-6 overflow-x-auto no-scrollbar pb-1">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-[18px] py-[10px] rounded-[10px] text-[13px] whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'border-2 border-[#c9a84c] bg-[#c9a84c12] text-[#c9a84c] font-[700]'
                : 'border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#1a1f33] text-slate-500 dark:text-[#8892a4] font-[500] hover:bg-slate-50 dark:hover:bg-white/10'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c9a84c]' : 'text-slate-400 dark:text-[#8892a4]'}`} />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default OpsTabs;
