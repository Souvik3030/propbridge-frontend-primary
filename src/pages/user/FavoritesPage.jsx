import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentlyViewedBar from '../../components/features/projects/RecentlyViewedBar';
import { useProjects }   from '../../context/ProjectContext';
import { Heart, Search, FileDown, FileText, Loader2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { 
    recentlyViewed, 
    addToRecentlyViewed, 
    clearRecentlyViewed, 
    toggleFavorite, 
    favorites,
    allProjects,
    loadingProjects
  } = useProjects();

  const [searchQuery, setSearchQuery] = useState('');

  const favoriteProjects = useMemo(() => {
    return allProjects.filter(p => favorites.has(p.id));
  }, [allProjects, favorites]);

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favoriteProjects;
    const q = searchQuery.toLowerCase();
    return favoriteProjects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.developer?.name.toLowerCase().includes(q) ||
      (p.location?.community && p.location.community.toLowerCase().includes(q))
    );
  }, [favoriteProjects, searchQuery]);

  const handleProjectClick = (project) => {
    addToRecentlyViewed(project);
    navigate(`/projects/${project.id}`);
  };

  const handleToggleFavorite = (id) => toggleFavorite(id);

  const renderProjectCard = (project) => (
    <div 
      key={project.id}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-[#ece7d9] dark:border-slate-800 overflow-hidden group hover:shadow-lg transition-all"
    >
      <div 
        className="relative h-[160px] cursor-pointer bg-slate-50 dark:bg-slate-800 flex items-center justify-center"
        onClick={() => handleProjectClick(project)}
      >
        <img 
          src={project.media?.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800'; }}
        />
        
        {/* Heart badge top right */}
        <button 
          onClick={(e) => { e.stopPropagation(); handleToggleFavorite(project.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-red-500/90 flex items-center justify-center text-white shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className="w-4 h-4 fill-white" />
        </button>
        
        {/* Fallback icon if no image */}
        {!project.media?.coverImage && <span className="text-4xl opacity-20">🏢</span>}
      </div>

      <div className="p-4">
        <h3 
          className="text-[16px] font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-[#ccab59]"
          onClick={() => handleProjectClick(project)}
        >
          {project.title}
        </h3>
        <p className="text-[11px] text-slate-400 mb-2 truncate">
          by <span className="text-[#ccab59] font-semibold">{project.developer?.name}</span> · {project.location?.community}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-[14px] font-black text-slate-900 dark:text-white">
            AED {project.price?.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded">
            {[...new Set(project.rooms || [])].sort().join(', ')} BR
          </span>
        </div>

        <button 
          onClick={() => handleToggleFavorite(project.id)}
          className="w-full py-2 rounded-xl bg-orange-50 text-orange-500 text-[12px] font-bold hover:bg-orange-100 transition-colors border border-orange-100"
        >
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Recently Viewed */}
      <RecentlyViewedBar
        items={recentlyViewed}
        onClear={clearRecentlyViewed}
        onProjectClick={handleProjectClick}
      />

      {/* Header Area matching screenshot */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[32px] font-serif font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="text-red-500">❤️</span> Favorites
          </h1>
          <p className="text-[13px] text-slate-400 font-medium">
            {favoriteProjects.length} saved {favoriteProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ccab59] w-[200px]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#fdf8e9] border border-[#f3e8c1] text-[#a38847] rounded-lg text-[13px] font-bold hover:bg-[#f9f1d0] transition-colors">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 text-slate-500 rounded-lg text-[13px] font-bold hover:bg-slate-100 transition-colors">
            <FileText className="w-4 h-4 text-purple-400" /> Portfolio PDF
          </button>
        </div>
      </div>

      {loadingProjects && favoriteProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#ccab59] mb-4" />
          <p className="text-slate-500 font-medium">Loading favorites...</p>
        </div>
      ) : favoriteProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFavorites.map(project => renderProjectCard(project))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 opacity-20" />
          </div>
          <p className="text-lg font-semibold mb-2">No favorites yet</p>
          <button onClick={() => navigate('/projects')} className="text-[#ccab59] font-bold hover:underline">Browse Projects</button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
