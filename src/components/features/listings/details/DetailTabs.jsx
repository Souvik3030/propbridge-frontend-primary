import React from 'react';

const DetailTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['Overview', 'Compliance', 'Portals', 'Timeline'];
  return (
    <div className="flex bg-[#f3efe6] dark:bg-slate-900 p-1 rounded-xl mb-6 w-fit gap-1">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-1.5 rounded-lg text-[13px] font-black transition-all ${
            activeTab === tab
              ? 'bg-white dark:bg-[#ccab59] shadow-sm text-slate-900 dark:text-white'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DetailTabs;
