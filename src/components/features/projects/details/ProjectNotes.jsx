import React from 'react';

const ProjectNotes = ({ notes, setNotes, onSaveNotes, onClearNotes }) => {
  return (
    <div className="mt-8 bg-white dark:bg-[#111827] rounded-xl p-6 shadow-sm border border-[#ece7d9] dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
        <span>📝</span> My Notes
      </h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add private notes about this project... (saved locally)"
        className="w-full h-32 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#ccab59] dark:text-white resize-none"
      />
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-slate-400 font-medium">{notes.length} characters</span>
        <div className="flex gap-3">
          <button
            onClick={onClearNotes}
            className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={onSaveNotes}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-[#ccab59] text-white hover:bg-[#b0934c] transition-colors"
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectNotes;
