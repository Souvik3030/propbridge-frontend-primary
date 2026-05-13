import React from 'react';
import { FolderPlus } from 'lucide-react';

const CollectionEmptyState = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-24 h-24 mb-6 relative">
        <div className="absolute inset-0 bg-[#ccab59]/10 rounded-3xl blur-xl" />
        <div className="relative flex items-center justify-center w-full h-full bg-white dark:bg-[#1a1c2e] rounded-[32px] border border-[#ccab59]/20">
          <FolderPlus size={40} className="text-[#ccab59]" />
        </div>
      </div>
      
      <h2 className="text-[20px] font-serif font-bold text-slate-800 dark:text-white mb-2">
        No collections yet
      </h2>
      <p className="text-[14px] text-slate-400 font-medium mb-8">
        Create a collection to organize your favorite properties
      </p>
      
      <button 
        onClick={onCreateClick}
        className="flex items-center gap-2 px-8 py-3.5 bg-[#ccab59] text-white rounded-2xl font-bold shadow-lg shadow-[#ccab59]/20 hover:scale-[1.02] transition-all"
      >
        + Create Collection
      </button>
    </div>
  );
};

export default CollectionEmptyState;
