import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCollectionStore = create(
  persist(
    (set, get) => ({
      collections: [],

      createCollection: (name) => {
        const newCollection = {
          id: Date.now().toString(),
          name,
          createdAt: new Date().toLocaleDateString(),
          projectIds: [],
        };
        set({ collections: [...get().collections, newCollection] });
        return newCollection;
      },

      deleteCollection: (id) => {
        set({ collections: get().collections.filter(c => c.id !== id) });
      },

      renameCollection: (id, newName) => {
        set({
          collections: get().collections.map(c => 
            c.id === id ? { ...c, name: newName } : c
          )
        });
      },

      addToCollection: (collectionId, projectId) => {
        set({
          collections: get().collections.map(c => {
            if (c.id === collectionId && !c.projectIds.includes(projectId)) {
              return { ...c, projectIds: [...c.projectIds, projectId] };
            }
            return c;
          })
        });
      },

      removeFromCollection: (collectionId, projectId) => {
        set({
          collections: get().collections.map(c => {
            if (c.id === collectionId) {
              return { ...c, projectIds: c.projectIds.filter(id => id !== projectId) };
            }
            return c;
          })
        });
      }
    }),
    {
      name: 'vortex_collections', // Natively handles cross-tab localStorage syncing safely
    }
  )
);
