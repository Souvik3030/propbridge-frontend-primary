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
  };

  const btnBase = "display-inline-flex items-center gap-1 px-3 py-1.5 font-bold text-[12px] rounded-lg cursor-pointer transition-all duration-150 active:scale-95 font-['DM_Sans',_sans-serif] tracking-tight border-none";

  return (
    <div className="bg-white dark:bg-[#1a1f35] border border-black/5 dark:border-white/10 rounded-xl p-4 mb-2 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#c9a84c]">{listing.reference}</span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap bg-blue-500/10 text-blue-500 border border-blue-500/20`}>
              {listing.status}
            </span>
          </div>
          <div>
            <h1 className="text-[18px] font-extrabold text-slate-900 dark:text-[#f0f0f0] font-['Playfair_Display',_serif] mb-0.5">{listing.title}</h1>
            <div className="flex items-center gap-1 text-[12px] text-slate-500 dark:text-[#8892a4] font-medium">
              <MapPin size={12} strokeWidth={2.5} />
              {listing.community} · {listing.subCommunity}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className={`${btnBase} bg-[#10b981] text-[#0a0e1a]`}>
            <CheckCircle2 size={13} /> Approve
          </button>
          <button 
            onClick={() => setIsRejectModalOpen(true)}
            className={`${btnBase} bg-transparent text-[#ef4444] border border-[#ef4444]`}
          >
            <XCircle size={13} /> Reject
          </button>
          <button className={`${btnBase} bg-gradient-to-br from-[#c9a84c] to-[#a88a3e] text-[#0a0e1a]`}>
            <Send size={13} /> Publish All
          </button>
          <button 
            onClick={() => navigate(`/listings/edit/${listing.id}`)}
            className={`${btnBase} bg-transparent text-[#c9a84c] border border-[#c9a84c]/20`}
          >
            <Edit3 size={13} /> Edit
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
