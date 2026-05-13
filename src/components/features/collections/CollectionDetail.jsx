import React, { useState } from 'react';
import { ArrowLeft, Folder, Search, Share2, Trash2, Package } from 'lucide-react';

const CollectionDetail = ({ collection, onBack, onShare, onDelete, onRemoveProject }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-[#1a1c2e] border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm flex items-center gap-2 text-[13px] font-bold text-slate-600 dark:text-slate-400"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ccab59]/10 flex items-center justify-center">
              <Folder size={24} className="text-[#ccab59]" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[24px] font-serif font-bold text-slate-800 dark:text-white leading-tight">
                {collection.name}
              </h2>
              <div className="flex items-center gap-2 text-[12px] text-slate-400 font-medium">
                <span>{collection.projectIds.length} projects</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>Created {collection.createdAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-[#1a1c2e] border border-slate-100 dark:border-slate-800 rounded-xl text-[14px] text-slate-700 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all w-[240px]"
            />
          </div>
          
          <button 
            onClick={() => onShare(collection)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#ccab59]/10 text-[#ccab59] rounded-xl text-[14px] font-bold hover:scale-[1.02] transition-all"
          >
            <Share2 size={16} />
            Share
          </button>
          
          <button 
            onClick={() => onDelete(collection.id)}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl text-[14px] font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/20"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Content Section (Empty State shown in screenshot) */}
      <div className="bg-white/50 dark:bg-[#1a1c2e]/20 border border-slate-100 dark:border-slate-800 rounded-[32px] p-24 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
        <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
          <Package size={32} className="text-slate-300 dark:text-slate-700" />
        </div>
        <p className="text-[16px] text-slate-500 dark:text-slate-400 font-medium max-w-[400px]">
          This collection is empty. Add projects from the Favorites or Projects page.
        </p>
      </div>
    </div>
  );
};

export default CollectionDetail;
