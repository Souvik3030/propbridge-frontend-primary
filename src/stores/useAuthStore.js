import { create } from 'zustand';

const SESSION_KEY = 'impersonation_active';

export const useAuthStore = create(
  (set) => ({
    // Initialise from sessionStorage so the flag survives the page reload that
    // occurs immediately after the impersonation API call succeeds.
    isImpersonating: sessionStorage.getItem(SESSION_KEY) === 'true',

    setImpersonating: (status) => {
      // Keep sessionStorage in sync with Zustand state.
      if (status) {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
      set({ isImpersonating: status });
    },

    // Called on logout or session expiry — clears both layers.
    clearAuth: () => {
      sessionStorage.removeItem(SESSION_KEY);
      set({ isImpersonating: false });
    },
  })
);

