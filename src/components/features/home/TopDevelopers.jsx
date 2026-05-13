import React from 'react';

const TopDevelopers = () => {
  const developers = [
    { name: 'Emaar', projects: 189, initial: 'E', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { name: 'Aldar', projects: 113, initial: 'A', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'DAMAC Properties', projects: 107, initial: 'D', color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { name: 'Meraas', projects: 89, initial: 'M', color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { name: 'Sobha Realty', projects: 81, initial: 'S', color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { name: 'Binghatti Developers', projects: 67, initial: 'B', color: 'text-red-500', bgColor: 'bg-red-50' },
    { name: 'Azizi Developments', projects: 59, initial: 'A', color: 'text-yellow-700', bgColor: 'bg-stone-100' },
    { name: 'Ellington Properties', projects: 53, initial: 'E', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { name: 'Samana Developers', projects: 44, initial: 'S', color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { name: 'Arada Development', projects: 41, initial: 'A', color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { name: 'Reportage Properties', projects: 40, initial: 'R', color: 'text-orange-500', bgColor: 'bg-orange-50' },
  ];

  return (
    <section className="mb-12">
      {/* Header with Gold Accent */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-[3px] h-6 bg-[#b89146]"></div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-serif">
          Top Developers
        </h2>
      </div>

      {/* Main Scroll Container with Native Scrollbar */}
      <div 
        className="flex gap-4 overflow-x-auto pb-6 snap-x custom-default-scrollbar"
      >
        {developers.map((dev, idx) => (
          <div 
            key={idx} 
            className="min-w-[200px] bg-white dark:bg-[#111827] p-8 rounded-2xl border border-[#ece7d9] dark:border-slate-800 flex flex-col items-center justify-center text-center transition-all shadow-sm snap-start mb-2"
          >
            {/* Initial Badge */}
            <div className={`w-14 h-14 rounded-full ${dev.bgColor} dark:bg-opacity-20 flex items-center justify-center mb-4`}>
              <span className={`text-2xl font-serif font-bold ${dev.color}`}>
                {dev.initial}
              </span>
            </div>

            {/* Developer Name */}
            <h4 className="text-[15px] font-bold text-slate-800 dark:text-white mb-1 truncate w-full">
              {dev.name}
            </h4>

            {/* Project Count */}
            <p className={`text-[13px] font-medium ${dev.color}`}>
              {dev.projects} projects
            </p>
          </div>
        ))}
      </div>

      {/* Scoped CSS for the default scrollbar appearance */}
      <style jsx>{`
        .custom-default-scrollbar {
          /* Firefox */
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }

        /* Chrome, Edge, and Safari */
        .custom-default-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .custom-default-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-default-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
        }

        .dark .custom-default-scrollbar {
          scrollbar-color: #475569 #1e293b;
        }

        .dark .custom-default-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
        }

        .dark .custom-default-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
          border: 1px solid #1e293b;
        }
      `}</style>
    </section>
  );
};

export default TopDevelopers;