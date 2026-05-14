import React from 'react';

const ListingItem = ({ image, title, id, location, views, leads }) => (
  <div className="flex items-center gap-[10px] py-2 border-b border-black/5 dark:border-white/5 last:border-0">
    <img src={image} alt={title} className="w-10 h-10 rounded-md object-cover" />
    <div className="flex-1">
      <div className="text-[12px] font-bold text-[#1a1a2e] dark:text-white truncate max-w-[200px]">{title}</div>
      <div className="text-[11px] text-gray-500 dark:text-gray-400">{id} · {location}</div>
    </div>
    <div className="text-right">
      <div className="text-[12px] font-bold text-[#c9a84c]">{views} views</div>
      <div className="text-[11px] text-gray-500 dark:text-gray-400">{leads} leads</div>
    </div>
  </div>
);

const TopListings = () => {
  const listings = [
    {
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      title: "2BR for Rent - Palm Jumeirah",
      id: "VW-2462",
      location: "Palm Jumeirah",
      views: "5,600",
      leads: "42"
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      title: "Studio Apartment in JVC - High",
      id: "VW-2458",
      location: "Jumeirah Village Circle (JVC)",
      views: "4,120",
      leads: "32"
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      title: "1BR Investment Apartment Busin",
      id: "VW-2460",
      location: "Business Bay",
      views: "3,200",
      leads: "25"
    },
    {
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      title: "Luxury 2BR in Marina Gate Towe",
      id: "VW-2456",
      location: "Dubai Marina",
      views: "2,340",
      leads: "18"
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      title: "Off-Plan 2BR Al Furjan",
      id: "VW-2463",
      location: "Al Furjan",
      views: "2,100",
      leads: "15"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px]">
      <div className="text-[16px] font-bold text-[#1a1a2e] dark:text-white font-serif mb-[12px]">
        Top Performing Listings
      </div>
      <div>
        {listings.map((listing, index) => (
          <ListingItem key={index} {...listing} />
        ))}
      </div>
    </div>
  );
};

export default TopListings;
