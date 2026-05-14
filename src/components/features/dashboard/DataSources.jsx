import React from 'react';

const DataSourceCard = ({ title, status, statusColor, details, actionLabel, actionLink, isButton }) => (
  <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-[10px]">
      <div className={`w-[10px] h-[10px] rounded-full ${statusColor}`}></div>
      <strong className="text-[14px] text-[#1a1a2e] dark:text-white">{title}</strong>
    </div>
    <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-[1.8]">
      {details.map((detail, index) => (
        <div key={index}>
          {detail.label}: <span className={detail.important ? 'font-bold text-[#1a1a2e] dark:text-gray-200' : ''}>{detail.value}</span>
        </div>
      ))}
    </div>
    {actionLabel && (
      isButton ? (
        <button className="mt-[10px] px-[14px] py-[6px] rounded-lg border border-[#c9a84c] dark:border-[#c9a84c]/50 bg-transparent text-[#c9a84c] text-[11px] font-bold cursor-pointer transition-colors hover:bg-[#c9a84c]/10">
          {actionLabel}
        </button>
      ) : (
        <a href={actionLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-[10px] text-[11px] text-[#c9a84c] font-bold no-underline transition-colors hover:text-[#c9a84c]/80">
          {actionLabel}
        </a>
      )
    )}
  </div>
);

const DataSources = () => {
  return (
    <div className="mt-[18px]">
      <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-5">
        <h3 className="text-[16px] font-extrabold font-serif text-[#1a1a2e] dark:text-white mb-4 flex items-center gap-2">
          📡 Data Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
          <DataSourceCard 
            title="Bayut API (RapidAPI)"
            status="Connected"
            statusColor="bg-emerald-500"
            details={[
              { label: "Status", value: "Connected", important: true },
              { label: "Projects", value: "2,181", important: true },
              { label: "API Today", value: "0 / 1,600", important: true },
              { label: "Last refresh", value: "Never", important: true },
            ]}
            actionLabel="Force Full Refresh"
            isButton={true}
          />
          <DataSourceCard 
            title="DLD Open Data"
            status="Not imported"
            statusColor="bg-gray-400"
            details={[
              { label: "Not imported — ", value: "Upload CSV", important: false },
            ]}
            actionLabel="Download CSV →"
            actionLink="https://dubailand.gov.ae/en/open-data/real-estate-data/"
          />
          <DataSourceCard 
            title="Storage Usage"
            status="Active"
            statusColor="bg-blue-500"
            details={[
              { label: "DLD Data", value: "0.00 MB", important: true },
              { label: "API Cache", value: "0.00 MB", important: true },
            ]}
            actionLabel="Clean Old Caches"
            isButton={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DataSources;

