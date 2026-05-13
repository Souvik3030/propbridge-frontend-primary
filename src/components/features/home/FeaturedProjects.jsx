import React from 'react';
import { MapPin } from 'lucide-react';

const FeaturedProjects = () => {
  const projects = [
    { name: 'Creek Bay', location: 'Dubai Creek Harbour', price: 'AED 1.8M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800' },
    { name: 'Creek Haven', location: 'Dubai Creek Harbour', price: 'AED 1.9M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800' },
    { name: 'Silva', location: 'Dubai Creek Harbour', price: 'AED 1.8M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800' },
    { name: 'Greencrest', location: 'Dubai Hills Estate', price: 'AED 1.6M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800' },
    { name: 'Parkside Hills', location: 'Dubai Hills Estate', price: 'AED 1.5M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800' },
    { name: 'Club Drive Tower B', location: 'Dubai Hills Estate', price: 'AED 1.5M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800' },
    { name: 'Address Residences', location: 'Dubai Creek Harbour', price: 'AED 2.0M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800' },
    { name: 'Arlo at Creek Beach', location: 'Dubai Creek Harbour', price: 'AED 1.7M', developer: 'Emaar', points: '75 pts', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800' },
  ];

  return (
    <section className="py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-[3px] h-6 bg-[#b89146]"></div>
          <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white font-serif">Featured Projects</h2>
        </div>
        <button className="px-5 py-1.5 text-xs font-semibold text-[#b89146] bg-[#fdfcf8] border border-[#f3eee0] rounded-lg hover:bg-[#f3eee0] transition-colors">
          View All
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="group bg-white dark:bg-[#111827] rounded-2xl border border-[#ece7d9] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            {/* Image Container */}
            <div className="relative h-44 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Points Badge */}
              <div className="absolute top-3 right-3">
                <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md border border-gray-100 flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#b89146]">{project.points.split(' ')[0]}</span>
                  <span className="text-[9px] font-medium text-gray-400 uppercase">{project.points.split(' ')[1]}</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4">
              <h3 className="text-[15px] font-bold text-slate-800 dark:text-white mb-1 tracking-tight">
                {project.name}
              </h3>
              
              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 mb-6">
                <MapPin className="w-3 h-3" />
                <span className="text-[11px] font-medium">{project.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[14px] font-bold text-[#ccab59] tracking-wide">
                  {project.price}
                </p>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                  {project.developer}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;