import React from 'react';

const AgentRow = ({ name, listings, views, leads }) => (
  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-[4px] py-[6px] border-b border-black/5 dark:border-white/5 last:border-0">
    <div className="text-[12px] font-semibold text-[#1a1a2e] dark:text-white">{name}</div>
    <div className="text-[12px] text-gray-500 dark:text-gray-400">{listings}</div>
    <div className="text-[12px] text-[#c9a84c] font-semibold">{views}</div>
    <div className="text-[12px] text-gray-500 dark:text-gray-400">{leads}</div>
  </div>
);

const AgentPerformance = () => {
  const agents = [
    { name: "Fatima Ali", listings: 1, views: "5,600", leads: 42 },
    { name: "Ahmed Khan", listings: 3, views: "5,330", leads: 38 },
    { name: "Omar Syed", listings: 2, views: "5,100", leads: 40 },
    { name: "Sara Ahmed", listings: 2, views: "4,760", leads: 37 },
  ];

  return (
    <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px]">
      <div className="text-[16px] font-bold text-[#1a1a2e] dark:text-white font-serif mb-[12px]">
        Agent Performance
      </div>
      <div>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-[4px] mb-[8px]">
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Agent</div>
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Listings</div>
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Views</div>
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Leads</div>
        </div>
        <div>
          {agents.map((agent, index) => (
            <AgentRow key={index} {...agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentPerformance;

