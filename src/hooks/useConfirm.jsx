import { useState, useCallback, useRef } from 'react';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const useConfirm = () => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    description: '',
    variant: 'danger',
    confirmLabel: undefined,
    cancelLabel: 'Cancel',
  });

  const resolverRef = useRef(null);

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialogState({
        isOpen: true,
        title: options.title || 'Are you sure?',
        description: options.description || 'This action cannot be undone.',
        variant: options.variant || 'danger',
        confirmLabel: options.confirmLabel,
        cancelLabel: options.cancelLabel || 'Cancel',
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolverRef.current?.(true);
    setDialogState((s) => ({ ...s, isOpen: false }));
  }, []);

  const handleCancel = useCallback(() => {
    resolverRef.current?.(false);
    setDialogState((s) => ({ ...s, isOpen: false }));
  }, []);

  const ConfirmDialogPortal = useCallback(() => (
    <ConfirmDialog
      isOpen={dialogState.isOpen}
      title={dialogState.title}
      description={dialogState.description}
      variant={dialogState.variant}
      confirmLabel={dialogState.confirmLabel}
      cancelLabel={dialogState.cancelLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ), [dialogState, handleConfirm, handleCancel]);

  return { confirm, ConfirmDialogPortal };
};

export default useConfirm;
