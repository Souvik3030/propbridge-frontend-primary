import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2, XCircle, Send, Edit3 } from 'lucide-react';
import ActionDropdown from '../ActionDropdown';
import RejectListingModal from '../modals/RejectListingModal';

const TopInfoCard = ({ listing }) => {
  const navigate = useNavigate();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const handleReject = (reason) => {
    console.log(`Listing ${listing.id} rejected. Reason: ${reason}`);
    setIsRejectModalOpen(false);
    // Add additional logic here (e.g., API call)
  };

  return (
    <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-[1.5rem] p-6 mb-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-[#576273] uppercase tracking-widest">{listing.reference || listing.id}</span>
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
              {listing.status}
            </span>
          </div>
          <div>
            <h1 className="text-[22px] font-black text-slate-900 dark:text-white leading-tight mb-1">{listing.title}</h1>
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
              <MapPin size={14} className="text-[#ccab59]" />
              <span className="text-[13px] font-medium">{listing.community} - {listing.subCommunity}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#10b981] text-white rounded-lg font-black text-[13px] hover:bg-[#059669] transition-all shadow-md shadow-emerald-500/10">
            <CheckCircle2 size={16} /> Approve
          </button>
          <button 
            onClick={() => setIsRejectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-800 text-red-500 rounded-lg font-bold text-[13px] border border-red-200 dark:border-red-900/30 hover:bg-red-50 transition-all"
          >
            <XCircle size={16} /> Reject
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#ccab59] text-white rounded-lg font-black text-[13px] hover:bg-[#b89a4f] transition-all shadow-md shadow-[#ccab59]/10">
            <Send size={16} /> Publish All
          </button>
          <button 
            onClick={() => navigate(`/listings/edit/${listing.id}`)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-[13px] border border-[#ece7d9] dark:border-slate-700 hover:bg-slate-50 transition-all"
          >
            <Edit3 size={16} /> Edit
          </button>
          
          <ActionDropdown listingId={listing.id} align="right" />
        </div>
      </div>

      <RejectListingModal 
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        listing={listing}
        onReject={handleReject}
      />
    </div>
  );
};

export default TopInfoCard;
