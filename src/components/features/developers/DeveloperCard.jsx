import React from 'react';

const DeveloperCard = ({ developer, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[20px] p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Logo Placeholder */}
        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-[#ccab59]/30 transition-colors">
          {developer.logo ? (
            <img src={developer.logo} alt={developer.name} className="w-full h-full object-contain p-2" />
          ) : (
            <span className="text-[18px] font-bold text-[#ccab59] opacity-40">
              {developer.name.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="flex flex-col min-w-0">
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-white truncate group-hover:text-[#ccab59] transition-colors leading-tight">
            {developer.name}
          </h3>
          <span className="text-[12px] text-slate-400 font-medium mt-1">
            {developer.projectCount} projects
          </span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-dashed border-slate-100 dark:border-slate-800/50">
        <p className="text-[12px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed italic">
          {developer.projects.join(', ')} {developer.projectCount > 3 ? `+${developer.projectCount - 3} more` : ''}
        </p>
      </div>
    </div>
  );
};

export default DeveloperCard;
