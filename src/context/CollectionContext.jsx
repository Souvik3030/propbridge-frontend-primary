import { useCollectionStore } from '../stores/useCollectionStore';

export const useCollections = () => {
  return useCollectionStore();
};

// Deprecated Provider that passes through children cleanly
export const CollectionProvider = ({ children }) => {
  return children;
};

