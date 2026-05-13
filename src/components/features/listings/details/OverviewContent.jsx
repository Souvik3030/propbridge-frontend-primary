import React from 'react';

const OverviewContent = ({ listing }) => {
  const details = [
    { label: 'Type', value: listing.type },
    { label: 'Purpose', value: listing.purpose },
    { label: 'Category', value: listing.category },
    { label: 'Furnished', value: listing.furnished },
    { label: 'Floor', value: listing.floor },
    { label: 'Developer', value: listing.developer },
    { label: 'Permit', value: listing.permit },
    { label: 'Permit Date', value: listing.permitDate },
    { label: 'Agent', value: listing.agent },
    { label: 'Owner', value: listing.owner },
    { label: 'City', value: listing.city },
    { label: 'Emirate', value: listing.emirate },
    { label: 'Off-Plan', value: listing.offPlan },
    { label: 'Status', value: listing.propertyStatus },
    { label: 'Parkings', value: listing.parkings },
  ];

  return (
    <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-[1.5rem] p-7 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-10 mb-8">
        {details.map((item, i) => (
          <div key={i} className="flex items-center justify-between border-b border-[#f3efe6] dark:border-slate-800/50 pb-3">
            <span className="text-[12px] font-bold text-slate-400 dark:text-[#576273]">{item.label}</span>
            <span className="text-[13px] font-black text-slate-800 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Description</h3>
        <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-4xl">
          {listing.desc}
        </p>
      </div>

      <div>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Amenities</h3>
        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-[#fdfaf3] dark:bg-slate-800 border border-[#ece7d9] dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[12px] font-bold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
