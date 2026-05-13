import React from 'react';
import { ChevronLeft } from 'lucide-react';

const DetailHeader = ({ onBack }) => (
  <button 
    onClick={onBack}
    className="flex items-center gap-1 text-[#ccab59] font-bold text-[13px] hover:opacity-80 transition-opacity mb-4"
  >
    <ChevronLeft size={16} />
    Back to Listings
  </button>
);

export default DetailHeader;
