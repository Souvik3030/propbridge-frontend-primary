import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from './ToastContext';
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { addToast } = useToast();
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // API Data State (NOW FETCHED FROM public/data/projects.json)
  const [allProjects, setAllProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);

  const refreshProjects = useCallback(async (silent = false) => {
    if (!silent) setLoadingProjects(true);
    try {
      const response = await fetch('/data/projects.json');
      if (!response.ok) throw new Error('Data file not found or sync pending');
      const data = await response.json();
      setAllProjects(data.projects || []);
      setError(null);
    } catch (err) {
      console.warn('Sync data load failed:', err.message);
      if (!silent) setError('Unable to load project data. Please run "npm run sync"');
    } finally {
      if (!silent) setLoadingProjects(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  // Compare list (max 4, not persisted)
  const [compareList, setCompareList] = useState([]);

  // Persist Recently Viewed
  useEffect(() => {
    localStorage.setItem('recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const addToRecentlyViewed = useCallback((project) => {
    if (!project) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== project.id);
      return [project, ...filtered].slice(0, 10);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    addToast("Recently viewed history cleared", "info");
  }, [addToast]);

  const toggleFavorite = useCallback((projectId) => {
    let wasAdded = false;
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
        wasAdded = true;
      }
      return next;
    });
    addToast(wasAdded ? "Added to favorites" : "Removed from favorites", wasAdded ? "success" : "info");
  }, [addToast]);

  const isFavorited = useCallback((projectId) => favorites.has(projectId), [favorites]);

  // Compare actions
  const toggleCompare = useCallback((project) => {
    let message = '';
    let type = 'success';
    let changed = false;

    setCompareList(prev => {
      const exists = prev.find(p => p.id === project.id);
      if (exists) {
        message = `Removed ${project.title} from compare`;
        type = 'info';
        changed = true;
        return prev.filter(p => p.id !== project.id);
      }
      if (prev.length >= 4) {
        message = "Max 4 projects can be compared";
        type = "warning";
        changed = true;
        return prev;
      }
      message = `Added ${project.title} to compare`;
      type = "success";
      changed = true;
      return [...prev, project];
    });

    if (changed) addToast(message, type);
  }, [addToast]);

  const isInCompare = useCallback((projectId) => {
    return compareList.some(p => p.id === projectId);
  }, [compareList]);

  const removeFromCompare = useCallback((projectId) => {
    let projName = '';
    setCompareList(prev => {
      const proj = prev.find(p => p.id === projectId);
      if (proj) projName = proj.title;
      return prev.filter(p => p.id !== projectId);
    });
    if (projName) addToast(`Removed ${projName} from compare`, "info");
  }, [addToast]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    addToast("Comparison list cleared", "info");
  }, [addToast]);

  // Derived Developers List (Memoized)
  const developers = useMemo(() => {
    const devMap = new Map();
    
    allProjects.forEach(project => {
      const devId = project.developer?.id || project.developer?.name; 
      if (!devId) return;

      if (!devMap.has(devId)) {
        devMap.set(devId, {
          id: devId,
          name: project.developer?.name || 'Unknown Developer',
          logo: project.developer?.logo || '',
          projectCount: 0,
          projects: new Set()
        });
      }

      const dev = devMap.get(devId);
      dev.projectCount++;
      if (dev.projects.size < 5) { // Only keep first few project names for display
        dev.projects.add(project.title);
      }
    });

    return Array.from(devMap.values()).map(dev => ({
      ...dev,
      projects: Array.from(dev.projects)
    })).sort((a, b) => b.projectCount - a.projectCount);
  }, [allProjects]);

  return (
    <ProjectContext.Provider value={{ 
      recentlyViewed, 
      favorites, 
      compareList,
      allProjects,
      loadingProjects,
      error,
      developers,
      addToRecentlyViewed, 
      clearRecentlyViewed, 
      toggleFavorite,
      isFavorited,
      toggleCompare,
      isInCompare,
      removeFromCompare,
      clearCompare,
      refreshProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
