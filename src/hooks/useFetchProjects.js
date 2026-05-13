import React,{ useState, useEffect, useCallback } from 'react';
import { searchNewProjects } from '../services/projectsApi';


export const transformProjectData = (raw) => {
  if (!raw) return null;

  return {
    id: raw.id,
    title: raw.name || raw.title || 'Unnamed Project',
    price: raw.price?.min ? parseFloat(raw.price.min) : (typeof raw.price === 'number' ? raw.price : 0),
    priceMax: raw.price?.max ? parseFloat(raw.price.max) : null,
    
    type: {
      main: raw.category?.main || raw.type?.main || 'Residential',
      sub: raw.category?.sub || raw.type?.sub || '',
    },

    area: {
      builtUp: raw.area?.min ?? raw.area?.built_up ?? 0,
      unit: raw.area?.unit || 'sqft',
    },

    rooms: raw.rooms || [],
    unitsCount: raw.units_count || 0,

    location: {
      community: raw.location?.community?.name || raw.location?.sub_community?.name || '',
      city: raw.location?.city?.name || '',
      coordinates: raw.location?.coordinates || null,
    },

    developer: {
      id: raw.developer?.id || null,
      name: raw.developer?.name || '',
      logo: raw.developer?.logo_url || '',
    },

    media: {
      coverImage: raw.media?.cover_photo || 
                  (Array.isArray(raw.media?.photos) ? raw.media.photos[0] : null) || '',
      photos: Array.isArray(raw.media?.photos) ? raw.media.photos : [],
    },

    status: {
      completionStatus: raw.completion_status || 'under-construction',
      completionDate: raw.completion_date || null,
    },

    paymentPlan: Array.isArray(raw.payment_plan) 
      ? raw.payment_plan.map(plan => ({
          downPayment: plan.down_payment_percent ?? '-',
          preHandover: plan.pre_handover_percent ?? '-',
          handover: plan.handover_percent ?? '-',
          postHandover: plan.post_handover_percent ?? '-',
        }))
      : (raw.payment_plan ? [{
          downPayment: raw.payment_plan.down_payment_percent ?? '-',
          preHandover: raw.payment_plan.pre_handover_percent ?? '-',
          handover: raw.payment_plan.handover_percent ?? '-',
          postHandover: raw.payment_plan.post_handover_percent ?? '-',
        }] : []),

    amenities: raw.amenities || [],
    _raw: raw
  };
};

export const useFetchProjects = (initialParams = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const paramsRef = React.useRef(initialParams);
  useEffect(() => {
    paramsRef.current = initialParams;
  }, [initialParams]);

  const fetchProjects = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const requestedPage = params.page !== undefined ? params.page : 0; 

      const fetchParams = { 
        page: requestedPage, 
        ...paramsRef.current, 
        ...params 
      };
      
      const data = await searchNewProjects(fetchParams);
      console.log("data", data);
      const results = data.results || [];
      
      const transformed = results.map(transformProjectData);
      
      setProjects(transformed);
      setTotalCount(data.count || 0);
      
      if (params.page !== undefined) {
        setCurrentPage(params.page);
      }
      
      console.log('[useFetchProjects] Results:', transformed.length, 'Total:', data.count);
      return transformed;
    } catch (err) {
      console.error('[useFetchProjects] Error:', err);
      setError(err.message || 'Failed to fetch projects');
      return [];
    } finally {
      setLoading(false);
    }
  }, []); // Fully stable function

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    totalCount,
    currentPage,
    setCurrentPage,
    refetch: useCallback((newParams) => {
      // If it's just a number, treat as page
      if (typeof newParams === 'number') {
        return fetchProjects({ page: newParams });
      }
      return fetchProjects(newParams);
    }, [fetchProjects])
  };
};
