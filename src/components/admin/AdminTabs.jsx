import React from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, Users, ShieldCheck, History } from 'lucide-react';

const AdminTabs = () => {
  const tabs = [
    { id: 'companies', label: 'Companies', path: '/admin/companies', icon: Building2 },
    { id: 'users', label: 'Users', path: '/admin/users', icon: Users },
    { id: 'roles', label: 'Role Permissions', path: '/admin/roles', icon: ShieldCheck },
    { id: 'audit', label: 'Audit Log', path: '/admin/audit', icon: History },
  ];

  return (
    <div className="flex items-center gap-2 p-1.5 bg-[#f5f2eb] dark:bg-slate-900/50 rounded-2xl w-full sm:w-fit mb-8 border border-slate-200/50 dark:border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex items-center gap-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) => `
                flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap
                ${isActive 
                  ? 'bg-[#ccab59] text-white shadow-lg shadow-[#ccab59]/20 translate-y-[-1px]' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {tab.label}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AdminTabs;
