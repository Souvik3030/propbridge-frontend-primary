import React from 'react';

const listings = [
  {
    id: 'VW-2462',
    title: '2BR for Rent - Palm Jumeirah',
    location: 'Palm Jumeirah',
    views: '5,600',
    leads: 42,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=100'
  },
  {
    id: 'VW-2458',
    title: 'Studio Apartment in JVC - High',
    location: 'Jumeirah Village Circle (JVC)',
    views: '4,120',
    leads: 32,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=100'
  },
  {
    id: 'VW-2460',
    title: '1BR Investment Apartment Busin',
    location: 'Business Bay',
    views: '3,200',
    leads: 25,
    image: 'https://images.unsplash.com/photo-1460317442991-0ec239387146?q=80&w=100'
  },
  {
    id: 'VW-2456',
    title: 'Luxury 2BR in Marina Gate Towe',
    location: 'Dubai Marina',
    views: '2,340',
    leads: 18,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=100'
  },
  {
    id: 'VW-2463',
    title: 'Off-Plan 2BR Al Furjan',
    location: 'Al Furjan',
    views: '2,100',
    leads: 15,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=100'
  }
];

const TopListings = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-3 shadow-sm h-full">
      <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
        Top Performing Listings
      </h3>
      
      <div className="flex flex-col gap-3.5">
        {listings.map((item) => (
          <div key={item.id} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-105">
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-slate-900 dark:text-white truncate leading-tight">{item.title}</p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{item.location} • {item.id}</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="text-right">
                <p className="text-[12px] font-bold text-[#ccab59] leading-none">{item.views}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Views</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-slate-900 dark:text-white leading-none">{item.leads}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Leads</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopListings;
