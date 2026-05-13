import React from 'react';
import { 
  CheckCircle2, Info, AlertCircle, X, ShieldAlert, Zap, 
  HelpCircle, AlertTriangle 
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const Toast = ({ id, message, type, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#ccab59]" />
  };

  const bgStyles = {
    success: 'bg-emerald-50/90 dark:bg-emerald-900/10 border-emerald-500/20',
    info: 'bg-blue-50/90 dark:bg-blue-900/10 border-blue-500/20',
    error: 'bg-red-50/90 dark:bg-red-900/10 border-red-500/20',
    warning: 'bg-[#ccab59]/5 dark:bg-[#ccab59]/10 border-[#ccab59]/20'
  };

  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-12 duration-500 pointer-events-auto ${bgStyles[type]}`}>
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 w-10 h-10 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center">
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-[12px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest mb-0.5">{type}</p>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{message}</p>
      </div>
      <button 
        onClick={() => onClose(id)}
        className="ml-auto p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-400"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ConfirmModal = ({ dialog, onClose }) => {
  if (!dialog) return null;

  const {
      title,
      message,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      type = 'primary',
      onConfirm,
      onCancel
  } = dialog;

  const typeColor = {
      danger: 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20',
      primary: 'bg-[#ccab59] hover:bg-[#b0944d] shadow-[#ccab59]/20',
      warning: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
  };

  const IconMap = {
      danger: <ShieldAlert className="w-8 h-8 text-rose-500" />,
      primary: <Zap className="w-8 h-8 text-[#ccab59]" />,
      warning: <AlertTriangle className="w-8 h-8 text-amber-500" />
  };

  return (
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={onCancel || onClose} />
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-[400px] rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
              <div className="p-8">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 flex-shrink-0 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/5">
                        {IconMap[type] || IconMap.primary}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-serif font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                          {title}
                      </h3>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed mt-2 italic pr-4">
                          "{message}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                      <button 
                          onClick={onCancel || onClose}
                          className="flex-1 py-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                      >
                          {cancelText}
                      </button>
                      <button 
                          onClick={onConfirm}
                          className={`flex-[1.5] py-3.5 ${typeColor[type]} text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
                      >
                          {confirmText}
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
};

const NotificationContainer = () => {
  const { toasts, removeToast, confirmDialog, closeConfirm } = useNotifications();

  return (
    <>
      <ConfirmModal dialog={confirmDialog} onClose={closeConfirm} />
      
      <div className="fixed bottom-8 right-8 z-[99999] flex flex-col-reverse gap-4 pointer-events-none max-w-sm w-full">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </>
  );
};

export default NotificationContainer;
