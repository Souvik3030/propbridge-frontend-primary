import api from './apiClient';

const PROPERTY_FINDER_BASE = '/auth/propertyfinder';

const getNestedCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const getResource = (payload) => {
  if (Array.isArray(payload?.data)) return payload;
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload;
};

const sanitizeParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

const propertyFinderApi = {
  endpoints: {
    listings: `${PROPERTY_FINDER_BASE}/listings`,
    listing: (id) => `${PROPERTY_FINDER_BASE}/listings/${id}`,
    publish: (id) => `${PROPERTY_FINDER_BASE}/listings/${id}/publish`,
    unpublish: (id) => `${PROPERTY_FINDER_BASE}/listings/${id}/unpublish`,
    compliance: (id) => `${PROPERTY_FINDER_BASE}/listings/${id}/compliance`,
    validate: (id) => `${PROPERTY_FINDER_BASE}/listings/${id}/validate`,
    agents: `${PROPERTY_FINDER_BASE}/agents`,
    locations: `${PROPERTY_FINDER_BASE}/locations`,
    emirates: `${PROPERTY_FINDER_BASE}/emirates`,
    emirateRules: (id) => `${PROPERTY_FINDER_BASE}/emirate-rules/${id}`,
    complianceVerify: (permit) => `${PROPERTY_FINDER_BASE}/compliances/${permit}`,
  },

  extractCollection: getNestedCollection,
  extractResource: getResource,

  async getListings(params = {}) {
    const response = await api.get(this.endpoints.listings, { params: sanitizeParams(params) });
    return {
      raw: response,
      items: getNestedCollection(response),
      meta: response?.meta || response?.pagination || null,
      count: response?.count ?? response?.meta?.total ?? getNestedCollection(response).length,
    };
  },

  async getListing(id) {
    return getResource(await api.get(this.endpoints.listing(id)));
  },

  async createListing(data) {
    return getResource(await api.post(this.endpoints.listings, data));
  },

  async updateListing(id, data) {
    return getResource(await api.patch(this.endpoints.listing(id), data));
  },

  async deleteListing(id) {
    return getResource(await api.delete(this.endpoints.listing(id)));
  },

  async publishListing(id) {
    return getResource(await api.post(this.endpoints.publish(id)));
  },

  async unpublishListing(id, reason) {
    const payload = reason ? { reason } : undefined;
    return getResource(await api.post(this.endpoints.unpublish(id), payload));
  },

  async getCompliance(id) {
    return getResource(await api.get(this.endpoints.compliance(id)));
  },

  async validateListing(id) {
    return getResource(await api.get(this.endpoints.validate(id)));
  },

  async getAgents(params = {}) {
    const response = await api.get(this.endpoints.agents, { params: sanitizeParams(params) });
    return getNestedCollection(response);
  },

  async getEmirates() {
    const response = await api.get(this.endpoints.emirates);
    return getNestedCollection(response);
  },

  async getLocations(params = {}) {
    const response = await api.get(this.endpoints.locations, { params: sanitizeParams(params) });
    return getNestedCollection(response);
  },

  async searchLocations(query, extraParams = {}) {
    return this.getLocations({ query: query?.trim(), ...extraParams });
  },

  async searchPFLocations(query) {
    if (!query || query.trim().length < 2) return [];
    try {
      const response = await api.get('auth/propertyfinder/locations', {
        params: { search: query.trim() },
      });
      return Array.isArray(response) ? response : getNestedCollection(response);
    } catch (error) {
      console.error('[PF API] searchPFLocations failed:', error);
      return [];
    }
  },

  /**
   * Verify permit with Property Finder API
   * GET /api/auth/propertyfinder/compliances/{permit_number}?permitType={type}
   */
  async getComplianceDetails(permitNumber, permitType = 'dld') {
    try {
      const response = await api.get(this.endpoints.complianceVerify(permitNumber), {
        params: { permitType }
      });
      return getResource(response);
    } catch (error) {
      console.error('[PF API] getComplianceDetails failed:', error);
      throw error;
    }
  },

  async getEmirateRules(emirateId) {
    try {
      const response = await api.get(this.endpoints.emirateRules(emirateId));
      return getResource(response);
    } catch (error) {
      console.error('[PF API] getEmirateRules failed:', error);
      throw error;
    }
  }
};

export default propertyFinderApi;
