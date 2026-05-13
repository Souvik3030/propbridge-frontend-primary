import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, ShieldAlert, Info, X } from 'lucide-react';

/**
 * ConfirmDialog — Sleek, premium confirmation modal.
 *
 * @param {object}   props
 * @param {boolean}  props.isOpen       - Whether the dialog is visible.
 * @param {Function} props.onConfirm    - Called when the user clicks the confirm button.
 * @param {Function} props.onCancel     - Called when the user clicks cancel or presses Escape.
 * @param {string}   props.title        - Bold dialog heading.
 * @param {string}   props.description  - Descriptive body text.
 * @param {'danger'|'warning'|'info'} props.variant - Visual variant (determines icon).
 * @param {string}   props.confirmLabel - Label for the confirm button.
 * @param {string}   props.cancelLabel  - Label for the cancel button.
 * @param {boolean}  props.isLoading    - Disables buttons when true.
 */
const VARIANTS = {
  danger: { icon: AlertTriangle, iconColor: 'text-[#ccab59]' },
  warning: { icon: ShieldAlert, iconColor: 'text-[#ccab59]' },
  info: { icon: Info, iconColor: 'text-[#ccab59]' },
};

const ConfirmDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  variant = 'danger',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
}) => {
  const v = VARIANTS[variant] || VARIANTS.danger;
  const Icon = v.icon;

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onCancel}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/50 dark:border-white/10
          animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-4 duration-200 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`mt-0.5 w-10 h-10 rounded-full bg-[#ccab59]/10 flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${v.iconColor}`} strokeWidth={2.5} />
            </div>

            <div className="flex-1">
              <h2
                id="confirm-dialog-title"
                className="text-[15px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-2"
              >
                {title}
              </h2>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Close Cross */}
            <button
              onClick={onCancel}
              className="flex-shrink-0 p-1.5 -mr-1.5 -mt-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2 text-[12px] font-bold text-white bg-[#ccab59] hover:bg-[#b0944d] rounded-xl shadow-md shadow-[#ccab59]/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDialog;
