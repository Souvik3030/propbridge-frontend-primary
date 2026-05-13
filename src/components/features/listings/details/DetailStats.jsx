import React from 'react';
import { BedDouble, Bath, Maximize2, DollarSign, Star, Eye } from 'lucide-react';

const DetailStats = ({ listing }) => {
  const stats = [
    { label: 'Beds', value: listing.beds, icon: BedDouble },
    { label: 'Baths', value: listing.baths, icon: Bath },
    { label: 'Size', value: listing.sqft.replace(' sqft', ''), icon: Maximize2 },
    { label: 'Price', value: listing.price, subValue: 'AED', icon: DollarSign },
    { label: 'Score', value: `${listing.score}/100`, icon: Star },
    { label: 'Views', value: listing.views, icon: Eye },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-[1rem] p-4 flex flex-col items-center justify-center text-center group hover:border-[#ccab59] transition-colors relative">
          <div className="p-1.5 rounded-lg bg-[#fdfaf3] dark:bg-slate-800 mb-2 group-hover:scale-110 transition-transform">
            <stat.icon size={18} className="text-[#ccab59]" />
          </div>
          <span className="text-[17px] font-black text-slate-900 dark:text-white leading-none mb-1">{stat.value}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</span>
          {stat.subValue && <span className="absolute top-2 right-4 text-[8px] font-black text-[#ccab59] tracking-tighter opacity-60">{stat.subValue}</span>}
        </div>
      ))}
    </div>
  );
};

export default DetailStats;
