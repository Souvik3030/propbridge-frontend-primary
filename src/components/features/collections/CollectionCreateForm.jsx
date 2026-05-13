import React, { useState } from 'react';
import { X } from 'lucide-react';

const CollectionCreateForm = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
    }
  };

  return (
    <div className="flex items-center gap-3 animate-in fade-in zoom-in duration-300">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input 
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection name..."
          className="px-4 py-2.5 bg-white dark:bg-[#1a1c2e] border border-[#ccab59]/30 rounded-xl text-[14px] text-slate-700 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all min-w-[240px]"
        />
        <button 
          type="submit"
          disabled={!name.trim()}
          className="px-6 py-2.5 bg-[#ccab59] text-white rounded-xl font-bold text-[14px] shadow-lg shadow-[#ccab59]/20 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all"
        >
          Create
        </button>
      </form>
      <button 
        onClick={onCancel}
        className="p-2.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
      >
        <X size={18} className="text-slate-400" />
      </button>
    </div>
  );
};

export default CollectionCreateForm;
