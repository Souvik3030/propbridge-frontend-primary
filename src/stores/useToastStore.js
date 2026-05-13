import { create } from 'zustand';

export const useToastStore = create((set, get) => ({
  toasts: [],
  confirmDialog: null,

  addToast: (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const currentToasts = get().toasts;

    if (currentToasts.some(t => t.message === message)) {
      return;
    }

    set({ toasts: [...currentToasts, { id, message, type, duration }] });

    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.id !== id)
      }));
    }, duration);
  },

  removeToast: (id) => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }));
  },

  showConfirm: (options) => {
    set({
      confirmDialog: {
        title: options.title || 'System Notice',
        message: options.message || 'Are you sure you want to proceed?',
        confirmText: options.confirmText || 'Proceed',
        cancelText: options.cancelText || 'Keep Original',
        type: options.type || 'primary',
        onConfirm: () => {
          if (options.onConfirm) options.onConfirm();
          set({ confirmDialog: null });
        },
        onCancel: () => {
          if (options.onCancel) options.onCancel();
          set({ confirmDialog: null });
        }
      }
    });
  },

  closeConfirm: () => {
    const currentDialog = get().confirmDialog;
    if (currentDialog?.onCancel) currentDialog.onCancel();
    set({ confirmDialog: null });
  }
}));
