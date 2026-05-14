import React from 'react';
import { ChevronLeft } from 'lucide-react';

const DetailHeader = ({ onBack }) => (
  <button 
    onClick={onBack}
    className="flex items-center gap-1.5 text-[14px] font-bold text-[#c9a84c] bg-none border-none cursor-pointer mb-3.5 transition-opacity hover:opacity-80 font-['DM_Sans',_sans-serif]"
  >
    <ChevronLeft size={15} />
    Back to Listings
  </button>
);

export default DetailHeader;
