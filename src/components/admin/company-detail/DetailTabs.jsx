import React from 'react';

const DetailTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex items-center gap-8 border-b border-slate-200 dark:border-white/10 mb-10 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2.5 pb-4 px-1 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
              isActive ? 'text-[#ccab59]' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-[#ccab59]' : 'text-slate-400'}`} />
            {tab.name}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ccab59] rounded-t-full animate-in fade-in slide-in-from-bottom-1" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DetailTabs;
