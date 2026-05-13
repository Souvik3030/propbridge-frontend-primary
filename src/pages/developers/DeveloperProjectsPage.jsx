import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Building2, LayoutGrid, List } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import ProjectCard from '../../components/features/projects/ProjectCard';
import ProjectListRow from '../../components/features/projects/ProjectListRow';

const DeveloperProjectsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProjects, loadingProjects, developers, toggleFavorite, favorites } = useProjects();
  const [viewMode, setViewMode] = React.useState('grid');

  // Find the developer info from the shared list
  const developer = useMemo(() => {
    return developers.find(d => String(d.id) === String(id));
  }, [developers, id]);

  // Filter projects for this developer
  const developerProjects = useMemo(() => {
    return allProjects.filter(p => String(p.developer_id || p.d) === String(id));
  }, [allProjects, id]);

  if (loadingProjects && developerProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ccab59]"></div>
        <p className="mt-4 text-slate-500">Loading portfolio...</p>
      </div>
    );
  }

  if (!developer && !loadingProjects) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Developer not found</h2>
        <button 
          onClick={() => navigate('/developers')}
          className="mt-4 text-[#ccab59] hover:underline"
        >
          Back to Developers
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-4 animate-in fade-in duration-700">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => navigate('/developers')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors w-fit"
        >
          <ChevronLeft size={18} />
          <span className="text-[14px] font-medium">Back to Developers</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-sm">
            {developer?.logo ? (
              <img src={developer.logo} alt={developer.name} className="w-full h-full object-contain p-3" />
            ) : (
              <Building2 size={32} className="text-slate-200 dark:text-slate-700" />
            )}
          </div>
          <div>
            <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-slate-800 dark:text-white leading-tight">
              {developer?.name || 'Developer Portfolio'}
            </h1>
            <p className="text-[14px] text-slate-400 font-medium">
              {developerProjects.length} Projects in UAE
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-[18px] font-bold text-slate-800 dark:text-white">
          Portfolio Projects
        </h2>
        
        <div className="flex items-center p-1 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-[#1a1c2e] text-[#ccab59] shadow-sm' : 'text-slate-400'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-[#1a1c2e] text-[#ccab59] shadow-sm' : 'text-slate-400'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {developerProjects.map(project => (
            <ProjectCard 
              key={project.i} 
              project={project} 
              onProjectClick={() => navigate(`/projects/${project.i}`)}
              isFavorited={favorites.has(project.i)}
              onToggleFavorite={() => toggleFavorite(project.i)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {developerProjects.map(project => (
            <ProjectListRow 
              key={project.i} 
              project={project} 
              onProjectClick={() => navigate(`/projects/${project.i}`)}
              isFavorited={favorites.has(project.i)}
              onToggleFavorite={() => toggleFavorite(project.i)}
            />
          ))}
        </div>
      )}

      {developerProjects.length === 0 && !loadingProjects && (
        <div className="py-20 text-center text-slate-400">
          No projects found for this developer.
        </div>
      )}
    </div>
  );
};

export default DeveloperProjectsPage;
