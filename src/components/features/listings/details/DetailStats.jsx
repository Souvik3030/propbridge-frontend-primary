import React from 'react';
import { BedDouble, Bath, Maximize2, DollarSign, Star, Eye } from 'lucide-react';

const DetailStats = ({ listing }) => {
  const stats = [
    { label: 'Beds', value: listing.beds, icon: BedDouble },
    { label: 'Baths', value: listing.baths, icon: Bath },
    { label: 'Size', value: listing.sqft.replace(' sq.ft', ''), icon: Maximize2 },
    { label: 'Price', value: listing.price.replace('AED', '').trim(), subValue: 'AED', icon: DollarSign },
    { label: 'Score', value: `${listing.score}/100`, icon: Star },
    { label: 'Views', value: listing.views, icon: Eye },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-[#1e2440] border border-black/5 dark:border-white/5 rounded-lg p-2 text-center transition-all hover:border-[#c9a84c]/30 shadow-sm">
          <div className="flex justify-center mb-0.5">
            <stat.icon size={14} className="text-[#c9a84c]" />
          </div>
          <div className="text-[14px] font-extrabold text-slate-900 dark:text-[#f0f0f0] font-['Playfair_Display',_serif] mt-0.5">{stat.value}</div>
          <div className="text-[9px] text-slate-500 dark:text-[#4d5a78] uppercase font-bold tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DetailStats;
