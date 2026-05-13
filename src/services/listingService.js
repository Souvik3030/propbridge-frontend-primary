import propertyFinderApi from './propertyFinderApi';

/**
 * Listing Service
 * Handles CRUD and synchronization logic for property listings.
 */
const listingService = {
  createListing: async (listingData) => {
    try {
      return await propertyFinderApi.createListing(listingData);
    } catch (error) {
      console.error('[ListingService] Failed to create listing:', error);
      throw error;
    }
  },

  checkCompliance: async (listingId) => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.getCompliance(listingId);
    } catch (error) {
      console.error(`[ListingService] Compliance check failed for listing ${listingId}:`, error);
      throw error;
    }
  },

  publishListing: async (listingId) => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.publishListing(listingId);
    } catch (error) {
      console.error(`[ListingService] Publish failed for listing ${listingId}:`, error);
      throw error;
    }
  },

  updateListing: async (listingId, updateData) => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.updateListing(listingId, updateData);
    } catch (error) {
      console.error(`[ListingService] Update failed for listing ${listingId}:`, error);
      throw error;
    }
  },

  deleteListing: async (listingId) => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.deleteListing(listingId);
    } catch (error) {
      console.error(`[ListingService] Delete failed for listing ${listingId}:`, error);
      throw error;
    }
  },

  unpublishListing: async (listingId, reason = 'other') => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.unpublishListing(listingId, reason);
    } catch (error) {
      console.error(`[ListingService] Unpublish failed for listing ${listingId}:`, error);
      throw error;
    }
  },

  fetchListings: async (params = {}) => {
    try {
      return await propertyFinderApi.getListings(params);
    } catch (error) {
      console.error('[ListingService] Failed to fetch listings:', error);
      throw error;
    }
  },

  fetchListing: async (listingId) => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.getListing(listingId);
    } catch (error) {
      console.error(`[ListingService] Failed to fetch listing ${listingId}:`, error);
      throw error;
    }
  },

  validateListing: async (listingId) => {
    if (!listingId) throw new Error('Listing ID is required');
    try {
      return await propertyFinderApi.validateListing(listingId);
    } catch (error) {
      console.error(`[ListingService] Validation failed for listing ${listingId}:`, error);
      throw error;
    }
  },

  searchLocations: async (query) => {
    try {
      return await propertyFinderApi.searchLocations(query);
    } catch (error) {
      console.error(`[ListingService] Location search failed for "${query}":`, error);
      throw error;
    }
  },
};

export default listingService;
