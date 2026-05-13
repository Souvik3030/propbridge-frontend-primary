import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentlyViewedBar from '../../components/features/projects/RecentlyViewedBar';
import ProjectsHeader    from '../../components/features/projects/ProjectsHeader';
import SearchAndFilters  from '../../components/features/projects/SearchAndFilters';
import StatsBar          from '../../components/features/projects/StatsBar';
import SortAndViewBar    from '../../components/features/projects/SortAndViewBar';
import ProjectCard       from '../../components/features/projects/ProjectCard';
import ProjectListRow    from '../../components/features/projects/ProjectListRow';
import MapView           from '../../components/features/projects/MapView';
import DLDAnalytics      from '../../components/features/projects/DLDAnalytics';
import InvestmentTools from '../../components/features/projects/investementTool/InvestmentTools';
import HotAreasAndDeals from '../../components/features/projects/hotArea/HotAreasAndDeals';
import { useFetchProjects }   from '../../hooks/useFetchProjects';
import CompareBar    from '../../components/features/projects/CompareBar';
import CompareModal  from '../../components/features/projects/CompareModal';
import GenerateBrochureModal from '../../components/features/listings/modals/GenerateBrochureModal';
import { useProjects } from '../../context/ProjectContext';
import Loader from '../../components/ui/Loader';

/* ── sort helpers ───────────────────────────────────────────── */
const CATEGORY_MAP = {
  Villas:     'Villas',
  Apartments: 'Apartments',
  Townhouses: 'Townhouses',
  Penthouses: 'Penthouse',
};

const PRICE_MAP = {
  'Under AED 1M': { min: 0,         max: 1_000_000 },
  'AED 1M–3M':    { min: 1_000_000, max: 3_000_000 },
  'AED 3M–5M':    { min: 3_000_000, max: 5_000_000 },
  'AED 5M+':      { min: 5_000_000, max: Infinity   },
};

const BEDS_MAP = {
  Studio:  [0],
  '1 BR':  [1],
  '2 BR':  [2],
  '3 BR':  [3],
  '4 BR':  [4],
  '5+ BR': [5, 6, 7],
};

/* ── component ─────────────────────────────────────────────── */
const PAGE_SIZE = 50;

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { 
    recentlyViewed, 
    addToRecentlyViewed, 
    clearRecentlyViewed, 
    toggleFavorite, 
    favorites,
  } = useProjects();

  const {
    projects: allProjects,
    loading,
    error,
    totalCount,
    currentPage,
    setCurrentPage,
    refetch: refreshProjects
  } = useFetchProjects();

  const [activeTab,      setActiveTab]      = useState('projects');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [filters,        setFilters]        = useState({});
  const [activeSort,     setActiveSort]     = useState('default');
  const [viewMode,       setViewMode]       = useState('grid');
  
  const [showStats,      setShowStats]      = useState(true);
  const [showCompare,    setShowCompare]    = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [selectedProjectForBrochure, setSelectedProjectForBrochure] = useState(null);

  /* ── filtered + sorted projects ────────────────────────── */
  const filtered = useMemo(() => {
    let data = [...allProjects];

    /* text search */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.developer?.name.toLowerCase().includes(q) ||
        (p.location?.community && p.location.community.toLowerCase().includes(q)) ||
        (p.location?.city && p.location.city.toLowerCase().includes(q))
      );
    }

    /* type filter */
    if (filters.type && CATEGORY_MAP[filters.type]) {
      data = data.filter(p => p.type?.sub === CATEGORY_MAP[filters.type]);
    }

    /* status filter */
    if (filters.status && filters.status !== 'All Status') {
      const map = { 'Under Construction': 'under-construction', Ready: 'ready' };
      if (map[filters.status]) data = data.filter(p => p.status?.completionStatus === map[filters.status]);
    }

    /* price filter */
    if (filters.price && PRICE_MAP[filters.price]) {
      const { min, max } = PRICE_MAP[filters.price];
      data = data.filter(p => p.price >= min && p.price <= max);
    }

    /* beds filter */
    if (filters.beds && BEDS_MAP[filters.beds]) {
      const allowed = BEDS_MAP[filters.beds];
      data = data.filter(p => p.rooms.some(b => allowed.includes(b)));
    }

    /* developer filter */
    if (filters.developer && filters.developer !== 'All Developers') {
      data = data.filter(p => p.developer?.name === filters.developer);
    }

    /* area filter */
    if (filters.area && filters.area !== 'All Areas') {
      data = data.filter(p =>
        (p.location?.community && p.location.community.toLowerCase().includes(filters.area.toLowerCase())) ||
        (p.location?.city && p.location.city.toLowerCase().includes(filters.area.toLowerCase()))
      );
    }

    /* ── advanced filters ────────────────────────────────── */
    const adv = filters.advanced;
    if (adv) {
      // Price chips
      if (adv.priceChips?.length > 0) {
        const PRICE_CHIP_MAP = {
          'Under 500K': { min: 0,        max: 500000 },
          '500K–1M':    { min: 500000,   max: 1000000 },
          '1M–2M':      { min: 1000000,  max: 2000000 },
          '2M–5M':      { min: 2000000,  max: 5000000 },
          '5M–10M':     { min: 5000000,  max: 10000000 },
          '10M+':       { min: 10000000, max: Infinity },
        };
        data = data.filter(p =>
          adv.priceChips.some(chip => {
            const r = PRICE_CHIP_MAP[chip];
            return r && p.price >= r.min && p.price <= r.max;
          })
        );
      }
      // Price custom min/max
      if (adv.priceMin) data = data.filter(p => p.price >= Number(adv.priceMin));
      if (adv.priceMax) data = data.filter(p => p.price <= Number(adv.priceMax));

      // Area sqft chips
      if (adv.areaChips?.length > 0) {
        const AREA_CHIP_MAP = {
          'Studio (<500)':  { min: 0,    max: 500 },
          '1BR (500–800)':  { min: 500,  max: 800 },
          '2BR (800–1200)': { min: 800,  max: 1200 },
          '3BR+ (1200+)':   { min: 1200, max: Infinity },
        };
        data = data.filter(p =>
          adv.areaChips.some(chip => {
            const r = AREA_CHIP_MAP[chip];
            return r && (p.area?.builtUp || 0) >= r.min && (p.area?.builtUp || 0) <= r.max;
          })
        );
      }
      if (adv.areaMin) data = data.filter(p => (p.area?.builtUp || 0) >= Number(adv.areaMin));
      if (adv.areaMax) data = data.filter(p => (p.area?.builtUp || 0) <= Number(adv.areaMax));

      // Advanced beds
      if (adv.beds?.length > 0) {
        data = data.filter(p => {
          const beds = p.rooms || [];
          return adv.beds.some(b => {
            if (b === 'Studio') return beds.includes(0);
            if (b === '5+') return beds.some(br => br >= 5);
            return beds.includes(Number(b));
          });
        });
      }

      // Advanced location
      if (adv.location) {
        data = data.filter(p =>
          (p.location?.city && p.location.city.toLowerCase().includes(adv.location.toLowerCase())) ||
          (p.location?.community && p.location.community.toLowerCase().includes(adv.location.toLowerCase()))
        );
      }

      // Advanced developer
      if (adv.developer) {
        data = data.filter(p => p.developer?.name === adv.developer);
      }

      // Property types
      if (adv.propTypes?.length > 0) {
        data = data.filter(p => adv.propTypes.some(t => p.type?.sub?.toLowerCase() === t.toLowerCase()));
      }

      // Handover years
      if (adv.handoverYears?.length > 0) {
        data = data.filter(p => {
          const year = p.status?.completionDate ? new Date(p.status.completionDate).getFullYear().toString() : null;
          return adv.handoverYears.some(y => {
            if (y === 'Ready Now') return p.status?.completionStatus === 'ready';
            if (y === '2028+') return year && parseInt(year) >= 2028;
            return year === y;
          });
        });
      }

      // Investment score
      if (adv.investScore) {
        const scoreMap = { 'Excellent (90+)': 90, 'Great (80+)': 80, 'Good (70+)': 70 };
        const minScore = scoreMap[adv.investScore];
        if (minScore) data = data.filter(p => (p.score || 0) >= minScore);
      }

      // Completion status
      if (adv.status && adv.status !== 'All') {
        const statusMap = { 'Under Construction': 'under-construction', 'Completed': 'ready' };
        const cs = statusMap[adv.status];
        if (cs) data = data.filter(p => p.status?.completionStatus === cs);
      }
    }

    /* sort */
    switch (activeSort) {
      case 'price_asc':   data.sort((a, b) => a.price - b.price);                             break;
      case 'price_desc':  data.sort((a, b) => b.price - a.price);                             break;
      case 'most_units':  data.sort((a, b) => b.unitsCount - a.unitsCount);                   break;
      case 'name_az':     data.sort((a, b) => a.title.localeCompare(b.title));                break;
      case 'hottest':     data.sort((a, b) => (b.score || 0) - (a.score || 0));               break;
      case 'area_asc':    data.sort((a, b) => (a.area?.builtUp || 0) - (b.area?.builtUp || 0)); break;
      case 'area_desc':   data.sort((a, b) => (b.area?.builtUp || 0) - (a.area?.builtUp || 0)); break;
      case 'newest':      data.sort((a, b) => (b.status?.completionDate || '').localeCompare(a.status?.completionDate || '')); break;
      default:            break;
    }

    return data;
  }, [allProjects, searchQuery, filters, activeSort]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(0);
    refreshProjects({ page: 0 });
  }, [searchQuery, filters, activeSort, refreshProjects]);

  // Server-side pagination logic
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  
  const goToPage = (page) => {
    if (page < 0 || page >= totalPages || page === currentPage) return;
    refreshProjects({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  /* ── handlers ───────────────────────────────────────────── */
  const handleProjectClick = (project) => {
    addToRecentlyViewed(project);
    navigate(`/projects/${project.id}`);
  };

  const handleToggleFavorite = (id) => toggleFavorite(id);

  const handleGenerateBrochure = (e, project) => {
    e.stopPropagation();
    setSelectedProjectForBrochure(project);
    setIsBrochureModalOpen(true);
  };

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="w-full pb-24">

      {/* Recently Viewed */}
      <RecentlyViewedBar
        items={recentlyViewed}
        onClear={clearRecentlyViewed}
        onProjectClick={handleProjectClick}
      />

      {/* Header + Tab switcher */}
      <ProjectsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalProjects={allProjects.length}
        dldCount={21744}
        onRefresh={refreshProjects}
      />

      {/* ── DLD Analytics tab ── */}
      {activeTab === 'dld' && <div className="pt-6"><DLDAnalytics /></div>}

      {activeTab === 'investment' && <div className="pt-6"><InvestmentTools /></div>}

      {activeTab === 'hotareas' && <div className="pt-6"><HotAreasAndDeals /></div>}

      {/* ── Projects tab ── */}
      {activeTab === 'projects' && (
        <>
          {/* Search & Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
          />

          {/* Stats bar */}
          <StatsBar
            projects={filtered}
            showStats={showStats}
            setShowStats={setShowStats}
            totalCount={totalCount}
          />

          {/* Sort + View toggle */}
          <SortAndViewBar
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            viewMode={viewMode}
            setViewMode={setViewMode}
            showStats={showStats}
            setShowStats={setShowStats}
            favorites={favorites.size}
            totalShowing={filtered.length}
          />

          {/* Loading State */}
          {loading && <Loader text="Searching for amazing projects..." />}

          {/* Grid */}
          {!loading && !error && viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onProjectClick={handleProjectClick}
                  isFavorited={favorites.has(project.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onGenerateBrochure={(e) => handleGenerateBrochure(e, project)}
                />
              ))}
            </div>
          )}

          {/* List */}
          {!loading && !error && viewMode === 'list' && (
            <div className="flex flex-col gap-3">
              {filtered.map(project => (
                <ProjectListRow
                  key={project.id}
                  project={project}
                  onProjectClick={handleProjectClick}
                  isFavorited={favorites.has(project.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onGenerateBrochure={(e) => handleGenerateBrochure(e, project)}
                />
              ))}
            </div>
          )}

          {/* Map */}
          {!loading && !error && viewMode === 'map' && (
            <MapView projects={filtered} onProjectClick={handleProjectClick} />
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400 dark:text-slate-500">
              <p className="text-lg font-semibold mb-2">No projects found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalCount > PAGE_SIZE && (
            <div className="flex flex-col items-center gap-3 mt-10">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Page {currentPage + 1} of {totalPages} • {totalCount} total projects
              </p>
              <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all
                             disabled:opacity-30 disabled:cursor-not-allowed
                             bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                             hover:bg-primary-50 dark:hover:bg-primary-900/20
                             text-slate-700 dark:text-slate-300"
                >
                  ← Prev
                </button>

                {/* Page numbers */}
                {(() => {
                  const pages = [];
                  const maxVisible = 7;
                  let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
                  let end = Math.min(totalPages, start + maxVisible);
                  if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

                  if (start > 0) {
                    pages.push(
                      <button key={0} onClick={() => goToPage(0)}
                        className="w-9 h-9 rounded-lg text-sm font-medium transition-all
                                   bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                                   hover:bg-primary-50 dark:hover:bg-primary-900/20
                                   text-slate-700 dark:text-slate-300">
                        1
                      </button>
                    );
                    if (start > 1) {
                      pages.push(<span key="start-dots" className="px-1 text-slate-400">…</span>);
                    }
                  }

                  for (let i = start; i < end; i++) {
                    pages.push(
                      <button key={i} onClick={() => goToPage(i)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all
                          ${i === currentPage
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300'
                          }`}>
                        {i + 1}
                      </button>
                    );
                  }

                  if (end < totalPages) {
                    if (end < totalPages - 1) {
                      pages.push(<span key="end-dots" className="px-1 text-slate-400">…</span>);
                    }
                    pages.push(
                      <button key={totalPages - 1} onClick={() => goToPage(totalPages - 1)}
                        className="w-9 h-9 rounded-lg text-sm font-medium transition-all
                                   bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                                   hover:bg-primary-50 dark:hover:bg-primary-900/20
                                   text-slate-700 dark:text-slate-300">
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all
                             disabled:opacity-30 disabled:cursor-not-allowed
                             bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                             hover:bg-primary-50 dark:hover:bg-primary-900/20
                             text-slate-700 dark:text-slate-300"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Compare Bar */}
      <CompareBar onCompareNow={() => setShowCompare(true)} />

       {/* Compare Modal */}
       {showCompare && <CompareModal onClose={() => setShowCompare(false)} />}

       <GenerateBrochureModal 
         isOpen={isBrochureModalOpen} 
         onClose={() => setIsBrochureModalOpen(false)} 
         data={selectedProjectForBrochure ? {
           title: selectedProjectForBrochure.title,
           developer: selectedProjectForBrochure.developer?.name,
           image: selectedProjectForBrochure.media?.coverImage
         } : {}}
       />
    </div>
  );
};

export default ProjectsPage;
