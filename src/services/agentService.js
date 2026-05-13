import propertyFinderApi from './propertyFinderApi';

/**
 * @typedef {Object} Agent
 * @property {number|string} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} is_active
 * @property {string} [license_number]
 */

/**
 * Agent Service
 * Handles all agent-related data fetching with performance optimizations.
 */
const agentService = {
  /**
   * Helper to capitalize names (First Letter of Each Word)
   */
  capitalize: (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Fetch all active agents for the dropdown.
   */
  fetchAgents: async (page = 1, perPage = 100) => {
    try {
      const response = await propertyFinderApi.getAgents({
        page,
        per_page: perPage,
      });

      // Data normalization for PropertyFinder structure
      return response.map(agent => {
        // Handle both direct 'name' and nested 'publicProfile.name'
        const rawName = agent.name || agent.publicProfile?.name || `${agent.firstName} ${agent.lastName}`.trim();
        
        return {
          id: agent.id,
          publicProfile_id: agent.publicProfile?.id ?? null, // PF portal public agent ID (e.g. 310399)
          name: agentService.capitalize(rawName),
          email: agent.email,
          is_active: agent.status === 'active' || agent.is_active,
          // Extract BRN from root or compliances
          license_number: agent.license_number || agent.publicProfile?.compliances?.find(c => c.type === 'RERA')?.value || '',
          avatar: agent.avatar || agent.publicProfile?.imageVariants?.small || null
        };
      });
    } catch (error) {
      console.error('[AgentService] Failed to fetch agents:', error);
      throw error;
    }
  },

  getAgent: async (agentId) => {
    if (!agentId) throw new Error('Agent ID is required');
    
    try {
      const agents = await propertyFinderApi.getAgents({ id: agentId });
      const agent = agents.find((a) => String(a.id) === String(agentId)) || null;
      
      if (!agent) return null;

      const rawName = agent.name || agent.publicProfile?.name || `${agent.firstName} ${agent.lastName}`.trim();

      return {
        id: agent.id,
        publicProfile_id: agent.publicProfile?.id ?? null,
        name: agentService.capitalize(rawName),
        email: agent.email,
        is_active: agent.status === 'active' || agent.is_active,
        license_number: agent.license_number || agent.publicProfile?.compliances?.find(c => c.type === 'RERA')?.value || '',
      };
    } catch (error) {
      console.error(`[AgentService] Failed to fetch agent ${agentId}:`, error);
      throw error;
    }
  }
};

export default agentService;
