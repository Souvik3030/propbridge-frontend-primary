import { useQuery } from '@tanstack/react-query';
import { agentService } from '../../services';

const QUERY_KEYS = {
  AGENTS: ['agents'],
  AGENT: (id) => ['agents', id],
};

/**
 * Hook for fetching all active agents.
 * Optimized with shared cache and stale time.
 */
export const useAgentsQuery = (page = 1, perPage = 100) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.AGENTS, { page, perPage }],
    queryFn: () => agentService.fetchAgents(page, perPage),
    staleTime: 10 * 60 * 1000, // 10 minutes (agents list is fairly static)
    placeholderData: (previousData) => previousData,
  });
};

/**
 * Hook for fetching a single agent's details.
 */
export const useAgentQuery = (agentId) => {
  return useQuery({
    queryKey: QUERY_KEYS.AGENT(agentId),
    queryFn: () => agentService.getAgent(agentId),
    enabled: !!agentId,
    staleTime: 5 * 60 * 1000,
  });
};
