import React from 'react';
import { Edit3, Share2, Trash2, Building2 } from 'lucide-react';

const CollectionCard = ({ collection, onClick, onRename, onShare, onDelete }) => {
  return (
    <div 
      className="group bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[24px] overflow-hidden flex flex-col hover:shadow-xl transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
      onClick={onClick}
    >
      {/* 4-Square Project Grid (Placeholders) */}
      <div className="grid grid-cols-2 grid-rows-2 gap-[1px] bg-slate-100 dark:bg-slate-800 h-[160px]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-50/50 dark:bg-[#1a1c2e]/60 flex items-center justify-center">
            <Building2 size={24} className="text-slate-200 dark:text-slate-700 opacity-50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-[17px] font-bold text-slate-800 dark:text-white leading-tight">
              {collection.name}
            </h3>
            <span className="text-[11px] text-slate-400 font-medium mt-1">
              Created {collection.createdAt}
            </span>
          </div>
          <span className="text-[12px] font-bold text-slate-400">
            {collection.projectIds.length} projects
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onRename(collection); }}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl text-[12px] font-bold hover:scale-[1.02] transition-all"
          >
            <Edit3 size={14} />
            Rename
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onShare(collection); }}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#ccab59]/10 text-[#ccab59] rounded-xl text-[12px] font-bold hover:scale-[1.02] transition-all"
          >
            <Share2 size={14} />
            Share
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(collection.id); }}
            className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
