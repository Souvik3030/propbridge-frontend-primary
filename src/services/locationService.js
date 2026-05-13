import propertyFinderApi from './propertyFinderApi';

const locationService = {
  fetchEmirates: async () => {
    try {
      return await propertyFinderApi.getEmirates();
    } catch (error) {
      console.error('[LocationService] Failed to fetch emirates:', error);
      throw error;
    }
  },

  fetchLocations: async (params = {}) => {
    try {
      return await propertyFinderApi.getLocations(params);
    } catch (error) {
      console.error('[LocationService] Failed to fetch locations:', error);
      throw error;
    }
  },

  fetchCities: async (emirateId) => {
    if (!emirateId) return [];
    try {
      return await propertyFinderApi.getLocations({ emirate_id: emirateId, level: 2 });
    } catch (error) {
      console.error(`[LocationService] Failed to fetch cities for emirate ${emirateId}:`, error);
      throw error;
    }
  },

  fetchCommunities: async (cityId) => {
    if (!cityId) return [];
    try {
      return await propertyFinderApi.getLocations({ level: 3, parent_id: cityId });
    } catch (error) {
      console.error(`[LocationService] Failed to fetch communities for city ${cityId}:`, error);
      throw error;
    }
  },

 
  fetchSubCommunities: async (communityId) => {
    if (!communityId) return [];
    try {
      return await propertyFinderApi.getLocations({ level: 4, parent_id: communityId });
    } catch (error) {
      console.error(`[LocationService] Failed to fetch sub-communities for community ${communityId}:`, error);
      throw error;
    }
  },

  fetchBuildings: async (parentId) => {
    if (!parentId) return [];
    try {
      return await propertyFinderApi.getLocations({ level: 5, parent_id: parentId });
    } catch (error) {
      console.error(`[LocationService] Failed to fetch buildings for parent ${parentId}:`, error);
      throw error;
    }
  },

  searchLocations: async (query) => {
    if (!query || query.trim().length < 2) return [];
    
    try {
      return await propertyFinderApi.searchLocations(query);
    } catch (error) {
      console.error(`[LocationService] Search failed for query "${query}":`, error);
      throw error;
    }
  }
};

export default locationService;
