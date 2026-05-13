import React from 'react';
import { Plus } from 'lucide-react';

const AddUserForm = () => {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200/50 dark:border-white/5 shadow-sm mb-8">
      <h3 className="text-[#ccab59] font-serif font-bold text-xl mb-6">
        Add New User
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-4 space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            Name
          </label>
          <input 
            type="text" 
            placeholder="Full name"
            className="w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="md:col-span-4 space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            Email
          </label>
          <input 
            type="email" 
            placeholder="email@company.com"
            className="w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="md:col-span-3 space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            Role
          </label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all pr-10">
              <option>🏠 Listing Agent</option>
              <option>👑 Super Admin</option>
              <option>🛡️ Admin</option>
              <option>🔑 Listing Owner</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <button className="w-full h-[46px] bg-[#ccab59] text-white rounded-xl flex items-center justify-center hover:bg-[#b0944d] transition-colors shadow-lg shadow-[#ccab59]/20">
            <Plus className="w-5 h-5 mr-1" strokeWidth={3} />
            <span className="font-bold text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
