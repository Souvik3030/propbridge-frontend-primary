import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '../../../services';
import { useToast } from '../../../context/NotificationContext';


const QUERY_KEYS = {
  LISTINGS: ['property-finder', 'listings'],
  LISTING: (id) => ['property-finder', 'listing', id],
  LOCATIONS: (query) => ['property-finder', 'locations', query],
};

const normalizeListing = (input) => {
  if (!input) return input;
  
  // Unwrap Laravel 'data' wrapper if present
  const listing = input.data || input;

  return {
    ...listing,
    id: listing.id,
    reference: listing.pf_reference || listing.reference || listing.reference_no || (listing.id && typeof listing.id === 'string' ? listing.id.substring(0, 8).toUpperCase() : `PF-${listing.id}`),
  };
};

const updateListingCollection = (existingData, updater) => {
  if (!existingData) return existingData;

  const items = Array.isArray(existingData.data)
    ? existingData.data
    : Array.isArray(existingData.items)
      ? existingData.items
      : [];

  const nextItems = updater(items.map(normalizeListing));

  if (Array.isArray(existingData.data)) {
    return { ...existingData, data: nextItems };
  }

  if (Array.isArray(existingData.items)) {
    return { ...existingData, items: nextItems };
  }

  return { ...existingData, items: nextItems };
};

/**
 * Fetch all Property Finder listings for the current user's company.
 */
export const usePFListings = (params = { page: 1 }) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.LISTINGS, params],
    queryFn: async () => {
      const result = await listingService.fetchListings(params);
      const items = result.data || result.items || [];
      return {
        ...result,
        data: items.map(normalizeListing),
        items: items.map(normalizeListing), // Maintain items for backward compatibility
      };
    },
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Fetch a single listing's details.
 */
export const usePFListing = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.LISTING(id),
    queryFn: async () => normalizeListing(await listingService.fetchListing(id)),
    enabled: !!id,
  });
};

/**
 * Mutation: Create a new Property Finder listing.
 */
export const useCreatePFListing = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (data) => listingService.createListing(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTINGS });

      const previousLists = queryClient.getQueriesData({ queryKey: QUERY_KEYS.LISTINGS });
      const optimisticListing = normalizeListing({
        ...data,
        id: `temp-${Date.now()}`,
        publication_status: 'draft',
      });

      previousLists.forEach(([key, existing]) => {
        queryClient.setQueryData(key, updateListingCollection(existing, (items) => [optimisticListing, ...items]));
      });

      return { previousLists };
    },
    onSuccess: (createdListing) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTINGS });
      if (createdListing?.id) {
        queryClient.setQueryData(QUERY_KEYS.LISTING(createdListing.id), normalizeListing(createdListing));
      }
      addToast('Listing created successfully. Compliance check initiated.', 'success');
    },
    onError: (error, _variables, context) => {
      context?.previousLists?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      addToast(error.message || 'Error creating listing', 'error');
    },
  });
};

/**
 * Mutation: Update an existing listing.
 */
export const useUpdatePFListing = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }) => listingService.updateListing(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTING(id) });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTINGS });

      const previousListing = queryClient.getQueryData(QUERY_KEYS.LISTING(id));
      const previousLists = queryClient.getQueriesData({ queryKey: QUERY_KEYS.LISTINGS });

      queryClient.setQueryData(QUERY_KEYS.LISTING(id), (current) => normalizeListing({ ...(current || {}), ...data, id }));
      previousLists.forEach(([key, existing]) => {
        queryClient.setQueryData(
          key,
          updateListingCollection(existing, (items) =>
            items.map((item) => (String(item.id) === String(id) ? normalizeListing({ ...item, ...data, id }) : item))
          )
        );
      });

      return { previousListing, previousLists };
    },
    onSuccess: (updatedListing, variables) => {
      queryClient.setQueryData(QUERY_KEYS.LISTING(variables.id), normalizeListing(updatedListing));
      addToast('Listing updated successfully.', 'success');
    },
    onError: (error, variables, context) => {
      if (context?.previousListing) {
        queryClient.setQueryData(QUERY_KEYS.LISTING(variables.id), context.previousListing);
      }
      context?.previousLists?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      addToast(error.message || 'Error updating listing', 'error');
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTINGS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTING(variables.id) });
    }
  });
};

/**
 * Mutation: Publish a listing to Property Finder.
 */
export const usePublishPFListing = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (id) => listingService.publishListing(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTING(id) });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTINGS });

      const previousListing = queryClient.getQueryData(QUERY_KEYS.LISTING(id));
      const previousLists = queryClient.getQueriesData({ queryKey: QUERY_KEYS.LISTINGS });

      queryClient.setQueryData(QUERY_KEYS.LISTING(id), (current) => current ? { ...current, publication_status: 'published' } : current);
      previousLists.forEach(([key, existing]) => {
        queryClient.setQueryData(
          key,
          updateListingCollection(existing, (items) =>
            items.map((item) => (String(item.id) === String(id) ? { ...item, publication_status: 'published' } : item))
          )
        );
      });

      return { previousListing, previousLists };
    },
    onSuccess: (updatedListing, id) => {
      if (updatedListing) {
        queryClient.setQueryData(QUERY_KEYS.LISTING(id), normalizeListing(updatedListing));
      }
      addToast('Listing published to Property Finder!', 'success');
    },
    onError: (error, id, context) => {
      if (context?.previousListing) {
        queryClient.setQueryData(QUERY_KEYS.LISTING(id), context.previousListing);
      }
      context?.previousLists?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      addToast(error.message || 'Publish failed', 'error');
    },
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTINGS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTING(id) });
    }
  });
};

/**
 * Mutation: Unpublish a listing from Property Finder.
 */
export const useUnpublishPFListing = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (id) => listingService.unpublishListing(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTING(id) });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTINGS });

      const previousListing = queryClient.getQueryData(QUERY_KEYS.LISTING(id));
      const previousLists = queryClient.getQueriesData({ queryKey: QUERY_KEYS.LISTINGS });

      queryClient.setQueryData(QUERY_KEYS.LISTING(id), (current) => current ? { ...current, publication_status: 'unpublished' } : current);
      previousLists.forEach(([key, existing]) => {
        queryClient.setQueryData(
          key,
          updateListingCollection(existing, (items) =>
            items.map((item) => (String(item.id) === String(id) ? { ...item, publication_status: 'unpublished' } : item))
          )
        );
      });

      return { previousListing, previousLists };
    },
    onSuccess: (updatedListing, id) => {
      if (updatedListing) {
        queryClient.setQueryData(QUERY_KEYS.LISTING(id), normalizeListing(updatedListing));
      }
      addToast('Listing withdrawn from Property Finder.', 'info');
    },
    onError: (error, id, context) => {
      if (context?.previousListing) {
        queryClient.setQueryData(QUERY_KEYS.LISTING(id), context.previousListing);
      }
      context?.previousLists?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      addToast(error.message || 'Unpublish failed', 'error');
    },
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTINGS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTING(id) });
    }
  });
};

/**
 * Mutation: Toggle publication status (Legacy).
 */
export const useTogglePFPublication = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ id, isPublished }) => {
      if (isPublished) {
        return listingService.unpublishListing(id);
      }
      return listingService.publishListing(id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTINGS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTING(variables.id) });
      const action = variables.isPublished ? 'withdrawn' : 'published';
      addToast(`Listing ${action} successfully.`, 'success');
    },
    onError: (error) => {
      addToast(error.message || 'Action failed', 'error');
    }
  });
};

/**
 * Mutation: Delete a listing.
 */
export const useDeletePFListing = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (id) => listingService.deleteListing(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LISTINGS });
      const previousLists = queryClient.getQueriesData({ queryKey: QUERY_KEYS.LISTINGS });

      previousLists.forEach(([key, existing]) => {
        queryClient.setQueryData(
          key,
          updateListingCollection(existing, (items) => items.filter((item) => String(item.id) !== String(id)))
        );
      });

      return { previousLists };
    },
    onSuccess: (_response, id) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.LISTING(id) });
      addToast('Listing deleted successfully.', 'info');
    },
    onError: (error, _id, context) => {
      context?.previousLists?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      addToast(error.message || 'Delete failed', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LISTINGS });
    }
  });
};

/**
 * Fetch locations/communities from Property Finder for mapping.
 */
export const usePFLocations = (query) => {
  return useQuery({
    queryKey: QUERY_KEYS.LOCATIONS(query),
    queryFn: () => listingService.searchLocations(query),
    enabled: !!query && query.length > 1,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
