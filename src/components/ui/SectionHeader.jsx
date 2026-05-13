import React from 'react';

const SectionHeader = ({ title }) => {
  return (
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-3xl font-serif font-bold text-[#111424] dark:text-white transition-colors">
        {title}
      </h2>
      <button className="text-[#a38847] dark:text-[#ccab59] text-sm font-medium hover:text-[#8a7238] dark:hover:text-[#e0c482] transition-colors">
        View All →
      </button>
    </div>
  );
};

export default SectionHeader;
