import React from 'react';

const DetailTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['Overview', 'Compliance', 'Portals', 'Timeline'];
  return (
    <div className="flex gap-[2px] bg-slate-200/50 dark:bg-[#1e2440] p-1 rounded-lg mb-2">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 px-3 py-2 rounded-md text-[12px] font-bold cursor-pointer transition-all font-['DM_Sans',_sans-serif] ${
            activeTab === tab
              ? 'bg-white dark:bg-[#c9a84c12] text-[#c9a84c] border-b-2 border-[#c9a84c] shadow-sm'
              : 'bg-transparent text-slate-500 dark:text-[#8892a4] border-b-2 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DetailTabs;
