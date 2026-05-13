import React from 'react';
import { Settings } from 'lucide-react';

const AdminHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <Settings className="w-8 h-8 text-slate-500 dark:text-slate-400" />
      </div>
      <div>
        <h1 className="text-3xl font-serif font-black text-slate-900 dark:text-white leading-tight">
          Admin Panel
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          Platform management · <span className="text-slate-600 dark:text-slate-300">4 users</span> · <span className="text-slate-600 dark:text-slate-300">1 companies</span>
        </p>
      </div>
    </div>
  );
};

export default AdminHeader;
