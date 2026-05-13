import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { locationService } from '../../services';

const QUERY_KEYS = {
  EMIRATES: ['locations', 'emirates'],
  CITIES: (parentId) => ['locations', 'cities', parentId],
  COMMUNITIES: (parentId) => ['locations', 'communities', parentId],
  SUB_COMMUNITIES: (parentId) => ['locations', 'sub-communities', parentId],
  BUILDINGS: (parentId) => ['locations', 'buildings', parentId],
  SEARCH: (query) => ['locations', 'search', query],
};

// Constant configuration for extremely stable location data
const STABLE_QUERY_CONFIG = {
  staleTime: 24 * 60 * 60 * 1000, // 24 hours
  gcTime: 48 * 60 * 60 * 1000,    // 48 hours (Cache persistent)
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
};

/**
 * Hook for fetching all Emirates (Top-level locations).
 */
export const useEmiratesQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.EMIRATES,
    queryFn: locationService.fetchEmirates,
    ...STABLE_QUERY_CONFIG
  });
};

/**
 * Hook for fetching cities filtered by an Emirate.
 */
export const useCitiesQuery = (emirateId) => {
  return useQuery({
    queryKey: QUERY_KEYS.CITIES(emirateId),
    queryFn: () => locationService.fetchCities(emirateId),
    enabled: !!emirateId,
    ...STABLE_QUERY_CONFIG
  });
};

/**
 * Hook for fetching communities filtered by a City.
 */
export const useCommunitiesQuery = (cityId) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMUNITIES(cityId),
    queryFn: () => locationService.fetchCommunities(cityId),
    enabled: !!cityId,
    ...STABLE_QUERY_CONFIG
  });
};

/**
 * Hook for fetching sub-communities filtered by a Community.
 */
export const useSubCommunitiesQuery = (communityId) => {
  return useQuery({
    queryKey: QUERY_KEYS.SUB_COMMUNITIES(communityId),
    queryFn: () => locationService.fetchSubCommunities(communityId),
    enabled: !!communityId,
    ...STABLE_QUERY_CONFIG
  });
};

/**
 * Hook for fetching buildings filtered by a Sub-community or Community.
 */
export const useBuildingsQuery = (parentId) => {
  return useQuery({
    queryKey: QUERY_KEYS.BUILDINGS(parentId),
    queryFn: () => locationService.fetchBuildings(parentId),
    enabled: !!parentId,
    ...STABLE_QUERY_CONFIG
  });
};

/**
 * Hook for searching locations by query string.
 */
export const useLocationSearchQuery = (query) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH(query),
    queryFn: () => locationService.searchLocations(query),
    enabled: !!query && query.length >= 2,
    staleTime: 10 * 60 * 1000, // 10 minutes for search results
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData
  });
};
