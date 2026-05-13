import React from 'react';

const MarketHeader = ({ title, subtitle }) => {
  return (
    <div className="space-y-3 py-2">
      <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-slate-950 dark:text-white">
        {title}
      </h1>
      <p className="text-base text-slate-500 max-w-3xl dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  );
};

export default MarketHeader;
