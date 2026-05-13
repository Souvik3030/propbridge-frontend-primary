import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const RejectListingModal = ({ isOpen, onClose, listing, onReject }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-[#12161F] w-full max-w-[440px] rounded-[1.5rem] shadow-2xl overflow-hidden animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="p-6 pb-0 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
            <AlertCircle className="text-red-500" size={24} strokeWidth={2.5} />
          </div>
          <div className="flex-1 pt-0.5">
            <h2 className="text-[20px] font-black text-slate-900 dark:text-white leading-tight">Reject Listing</h2>
            <p className="text-[12px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">
              {listing.id} — {listing.title}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Section */}
        <div className="p-6">
          <label className="block text-[12px] font-black text-slate-500 dark:text-slate-400 mb-2 ml-0.5 uppercase tracking-wider">
            Rejection Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for rejection (e.g., Images not clear, Missing title deed, Price too low...)"
            className="w-full h-24 p-4 bg-white dark:bg-[#0a0d18] border-2 border-[#ece7d9] dark:border-slate-800 rounded-xl text-[13px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-[#ccab59] focus:ring-4 focus:ring-[#ccab59]/10 transition-all outline-none resize-none"
          />
        </div>

        {/* Footer Section */}
        <div className="px-6 pb-6 pt-1 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-[#ece7d9] dark:border-slate-800 text-[#ccab59] font-black text-[13px] hover:bg-[#faf8f2] dark:hover:bg-slate-800/50 transition-all"
          >
            Cancel
          </button>
          <button
            disabled={!reason.trim()}
            onClick={() => onReject(reason)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-[13px] transition-all
              ${reason.trim() 
                ? 'bg-[#ccab59] text-white shadow-lg shadow-[#ccab59]/20 hover:bg-[#b89a4f]' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}
            `}
          >
            <X size={16} strokeWidth={3} />
            Reject Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectListingModal;
