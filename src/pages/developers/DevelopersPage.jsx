import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, Type, Filter, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeveloperCard from '../../components/features/developers/DeveloperCard';
import { useProjects } from '../../context/ProjectContext';

const DevelopersPage = () => {
  const navigate = useNavigate();
  const { developers, loadingProjects, loadProgress, error } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('projects'); // 'projects' or 'name'

  const filteredDevelopers = useMemo(() => {
    return developers
      .filter(dev => 
        dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dev.projects.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'projects') return b.projectCount - a.projectCount;
        return a.name.localeCompare(b.name);
      });
  }, [developers, searchQuery, sortBy]);

  return (
    <div className="flex flex-col gap-8 py-4 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[40px] font-serif font-bold text-slate-800 dark:text-white leading-tight tracking-tight">
          Developers
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-[14px] text-slate-400 font-medium">
            {developers.length} developers found
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-[800px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search developers..."
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#1a1c2e] border border-slate-100 dark:border-slate-800 rounded-2xl text-[14px] text-slate-700 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all shadow-sm"
          />
        </div>

        {/* Sort Toggles */}
        <div className="flex items-center p-1 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl">
          <button 
            onClick={() => setSortBy('projects')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[13px] font-bold transition-all ${
              sortBy === 'projects' 
                ? 'bg-white dark:bg-[#1a1c2e] text-[#ccab59] shadow-md' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            By Projects
          </button>
          <button 
            onClick={() => setSortBy('name')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[13px] font-bold transition-all ${
              sortBy === 'name' 
                ? 'bg-white dark:bg-[#1a1c2e] text-[#ccab59] shadow-md' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            By Name
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && filteredDevelopers.length === 0 && (
        <div className="text-center py-20 text-red-500">
          <p className="text-lg font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {filteredDevelopers.map((dev) => (
          <DeveloperCard 
            key={dev.id} 
            developer={dev} 
            onClick={() => navigate(`/developers/${dev.id}`)}
          />
        ))}
      </div>

      {/* Empty State */}
      {!loadingProjects && filteredDevelopers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4">
            <Filter size={32} className="text-slate-200 dark:text-slate-700" />
          </div>
          <h3 className="text-[18px] font-serif font-bold text-slate-800 dark:text-white mb-2">
            No developers found
          </h3>
          <p className="text-[14px] text-slate-400 font-medium">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default DevelopersPage;
