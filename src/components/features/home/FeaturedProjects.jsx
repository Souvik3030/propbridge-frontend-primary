import React from 'react';
import { MapPin } from 'lucide-react';

const FeaturedProjects = () => {
  const projects = [
    { name: 'Creek Bay', location: 'Dubai Creek Harbour', price: 'AED 1.8M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/809900237/f6d56604ba684ae3bccdec57b3ff943e' },
    { name: 'Creek Haven', location: 'Dubai Creek Harbour', price: 'AED 1.9M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/808562989/a6ca95a2f6314384aa7dd26f439bfa0c' },
    { name: 'Silva', location: 'Dubai Creek Harbour', price: 'AED 1.8M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/781213566/b48564fd089c47a1ab0480247e3db354' },
    { name: 'Greencrest', location: 'Dubai Hills Estate', price: 'AED 1.6M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/816168383/c16298ffc2554e4f96028ba6b072edf9' },
    { name: 'Parkside Hills', location: 'Dubai Hills Estate', price: 'AED 1.5M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/706575954/9f99b2d9fc5c42628a8cf1981a50711e' },
    { name: 'Club Drive Tower B', location: 'Dubai Hills Estate', price: 'AED 1.5M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/698364758/0974d48718f34975ba43e9576de4c9e0' },
    { name: 'Address Residences', location: 'Dubai Creek Harbour', price: 'AED 2.0M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/737532101/3958d6877ee040cdabf5cd8f7ae398c1' },
    { name: 'Arlo at Creek Beach Harbour', location: 'Dubai Creek Harbour', price: 'AED 1.7M', developer: 'Emaar', points: '75', image: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/710392656/6e28b93bea9d407cbb0a1b2974cc7a04' },
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-[18px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-1 h-6 rounded-[2px] bg-[linear-gradient(rgb(201,168,76),rgb(245,158,11))]"></div>
          <h2 className="text-[22px] font-bold font-serif text-[#111424] dark:text-[#f0f0f0] m-0 transition-colors">Featured Projects</h2>
        </div>
        <button className="px-4 py-2 rounded-[10px] border border-[#c9a84c2e] bg-transparent text-[#a38847] dark:text-[#c9a84c] text-[12px] font-semibold cursor-pointer transition-all hover:bg-[#c9a84c10] hover:border-[#c9a84c50]">
          View All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project, idx) => (
          <div 
            key={idx}
            className="group bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[16px] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-none dark:hover:border-white/10"
          >
            {/* Image Container */}
            <div className="relative h-[170px] overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Points Badge */}
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-[8px] bg-white/90 dark:bg-[#0a0e1ab3] backdrop-blur-md border border-slate-200 dark:border-[#c9a84c2e] flex items-center gap-1 transition-colors">
                <span className="text-[11px] font-extrabold text-[#a38847] dark:text-[#c9a84c] font-mono">{project.points}</span>
                <span className="text-[9px] font-medium text-slate-400 dark:text-[#8892a4]">pts</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4">
              <h3 className="text-[14px] font-bold text-[#111424] dark:text-[#f0f0f0] mb-1.5 truncate leading-snug transition-colors">
                {project.name}
              </h3>
              
              <div className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-[#8892a4] mb-2.5 transition-colors">
                <MapPin className="w-3 h-3 stroke-slate-400 dark:stroke-[#8892a4]" />
                <span className="truncate">{project.location}</span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-white/5 transition-colors">
                <span className="text-[15px] font-bold text-[#a38847] dark:text-[#c9a84c] font-mono transition-colors">
                  {project.price}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-[#8892a4] font-medium transition-colors uppercase">
                  {project.developer}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;