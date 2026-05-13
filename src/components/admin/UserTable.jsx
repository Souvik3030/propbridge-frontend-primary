import React from 'react';
import { ChevronDown } from 'lucide-react';

const RoleBadge = ({ role }) => {
  const getRoleStyles = (roleName) => {
    const r = roleName.toLowerCase();
    if (r.includes('super admin')) return 'text-red-500 border-red-500 bg-red-50/50 dark:bg-red-500/5';
    if (r.includes('admin')) return 'text-orange-500 border-orange-500 bg-orange-50/50 dark:bg-orange-500/5';
    if (r.includes('agent')) return 'text-blue-500 border-blue-500 bg-blue-50/50 dark:bg-blue-500/5';
    if (r.includes('owner')) return 'text-emerald-500 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5';
    return 'text-slate-500 border-slate-300 bg-slate-50 dark:bg-slate-800/50';
  };

  return (
    <div className={`flex items-center justify-between px-3 py-1.5 border rounded-lg min-w-[140px] cursor-pointer hover:opacity-80 transition-opacity ${getRoleStyles(role)}`}>
      <span className="text-[11px] font-bold uppercase tracking-wider">{role}</span>
      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
    </div>
  );
};

const UserTable = () => {
  const users = [
    { id: 1, name: 'Ishika Vishnoi', email: 'ishika@vortexweb.com', role: 'Super Admin', company: 'VortexWeb LLC', hasActions: false },
    { id: 2, name: 'Aaryan', email: 'aaryan@vortexweb.com', role: 'Admin', company: 'VortexWeb LLC', hasActions: true },
    { id: 3, name: 'Chetan', email: 'chetan@vortexweb.com', role: 'Listing Agent', company: 'VortexWeb LLC', hasActions: true },
    { id: 4, name: 'Sara Owner', email: 'sara@demo.com', role: 'Listing Owner', company: 'VortexWeb LLC', hasActions: true },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 dark:border-white/5">
        <h3 className="text-slate-900 dark:text-white font-serif font-bold text-xl">
          All Users <span className="text-slate-400 font-sans text-lg ml-1">(4)</span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/20">
              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5">Name</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5">Email</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5">Role</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5">Company</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#ccab59] transition-colors whitespace-nowrap">
                    {user.name}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm text-slate-500 dark:text-slate-400 italic">
                    {user.email}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {user.company}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  {user.hasActions ? (
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-[11px] font-bold text-[#ccab59] hover:text-[#b0944d] bg-[#ccab59]/5 hover:bg-[#ccab59]/10 px-3 py-1.5 rounded-lg border border-[#ccab59]/20 transition-all uppercase tracking-wider">
                        Login as
                      </button>
                      <button className="text-[11px] font-bold text-red-400 hover:text-red-500 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/20 transition-all uppercase tracking-wider">
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="h-8" /> 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
