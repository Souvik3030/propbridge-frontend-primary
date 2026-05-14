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
    <div className="bg-white dark:bg-[#1a1f35] border border-black/5 dark:border-white/10 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500 transition-colors">
      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0.5 mb-4">
        {details.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-black/5 dark:border-white/5 last:border-none">
            <span className="text-[12px] text-slate-500 dark:text-[#8892a4]">{item.label}</span>
            <span className="text-[12px] font-bold text-slate-900 dark:text-[#f0f0f0]">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="pt-4 border-t border-black/5 dark:border-white/5">
        <h3 className="text-[11px] font-bold text-slate-400 dark:text-[#4d5a78] uppercase tracking-wider mb-2">Description</h3>
        <p className="text-[13px] leading-relaxed text-slate-600 dark:text-[#8892a4] whitespace-pre-line">
          {listing.desc}
        </p>
      </div>

      {/* Amenities Section */}
      <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
        <h3 className="text-[11px] font-bold text-slate-400 dark:text-[#4d5a78] uppercase tracking-wider mb-2">Amenities</h3>
        <div className="flex flex-wrap gap-1.5">
          {listing.amenities.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-[#c9a84c12] border border-[#c9a84c1e] text-slate-600 dark:text-[#8892a4] rounded-md text-[11px] font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
