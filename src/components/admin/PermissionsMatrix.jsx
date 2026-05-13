import React, { useState, useEffect } from 'react';
import { Building2, Home, Key, Save, Loader2, Lock } from 'lucide-react';
import { useUpdatePermissions } from '../../hooks/useAdmin';

const ROLE_HEADER_CONFIGS = {
  superadmin: { icon: <span className="text-amber-500 text-sm">👑</span>, color: 'text-red-500' },
  admin: { icon: <Building2 className="w-3.5 h-3.5 text-blue-400" />, color: 'text-blue-500' },
  agent: { icon: <Home className="w-3.5 h-3.5 text-orange-400" />, color: 'text-orange-500' },
  owner: { icon: <Key className="w-3.5 h-3.5 text-emerald-400" />, color: 'text-emerald-500' },
};

const PermissionsMatrix = ({ roles: serverRoles = [], allPermissions = [] }) => {
  // Local state to track non-persisted changes: { roleId: [permissions] }
  const [dirtyRoles, setDirtyRoles] = useState({});
  const { mutate: updatePermissions, isPending } = useUpdatePermissions();
  const [savingRoleId, setSavingRoleId] = useState(null);

  // Clear dirty state for a role after successful mutation
  useEffect(() => {
    // We don't strictly need this if we invalidate queries, 
    // as the prop totalRoles will update and we can detect sync, 
    // but clearing manually is safer for UX.
  }, [serverRoles]);

  const handleToggle = (role, permission) => {
    if (role.name.toLowerCase() === 'superadmin') return;

    const roleId = role.id;
    const currentPermissions = dirtyRoles[roleId] || role.permissions;
    
    let nextPermissions;
    if (currentPermissions.includes(permission)) {
      nextPermissions = currentPermissions.filter(p => p !== permission);
    } else {
      nextPermissions = [...currentPermissions, permission];
    }

    setDirtyRoles(prev => ({
      ...prev,
      [roleId]: nextPermissions
    }));
  };

  const handleSave = (roleId) => {
    const permissions = dirtyRoles[roleId];
    if (!permissions) return;

    setSavingRoleId(roleId);
    updatePermissions(
      { roleId, permissions },
      {
        onSuccess: () => {
          setDirtyRoles(prev => {
            const next = { ...prev };
            delete next[roleId];
            return next;
          });
          setSavingRoleId(null);
        },
        onError: () => setSavingRoleId(null)
      }
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-slate-900 dark:text-white font-serif font-bold text-xl mb-1">
            Role Permissions Matrix
          </h3>
          <p className="text-slate-400 text-sm">
            Interactive security grid. Toggle permissions and save changes per role.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Enabled
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            Disabled
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/20">
              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/5 min-w-[240px]">Permission</th>
              {serverRoles.map((role) => {
                const config = ROLE_HEADER_CONFIGS[role.name.toLowerCase()] || { icon: null, color: 'text-slate-500' };
                const isDirty = !!dirtyRoles[role.id];
                const isSaving = savingRoleId === role.id && isPending;

                return (
                  <th key={role.id} className="px-8 py-5 border-b border-slate-100 dark:border-white/5">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 justify-center whitespace-nowrap">
                        {config.icon}
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${config.color}`}>
                          {role.name}
                        </span>
                      </div>
                      
                      {isDirty && (
                        <button
                          onClick={() => handleSave(role.id)}
                          disabled={isSaving}
                          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all shadow-sm shadow-emerald-500/20 disabled:opacity-50"
                        >
                          {isSaving ? (
                            <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          ) : (
                            <Save className="w-2.5 h-2.5" />
                          )}
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {allPermissions.map((permName, idx) => (
              <tr key={permName} className={`${idx % 2 === 1 ? 'bg-[#fcf8f0]/40 dark:bg-slate-800/10' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group`}>
                <td className="px-8 py-4">
                  <span className="text-sm font-bold text-slate-800 dark:text-white/80 font-mono capitalize">
                    {permName.replace(/_/g, ' ')}
                  </span>
                </td>
                {serverRoles.map((role) => {
                  const roleId = role.id;
                  const isSuperAdmin = role.name.toLowerCase() === 'superadmin';
                  const currentPermissions = dirtyRoles[roleId] || role.permissions;
                  const hasAccess = currentPermissions.includes(permName);
                  
                  return (
                    <td key={roleId} className="px-8 py-3.5 text-center">
                      <div className="flex justify-center relative">
                        <button
                          onClick={() => handleToggle(role, permName)}
                          disabled={isSuperAdmin || (savingRoleId === roleId && isPending)}
                          className={`
                            w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300
                            ${hasAccess 
                              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border border-emerald-100 dark:border-emerald-500/20 shadow-sm shadow-emerald-500/5' 
                              : 'bg-red-50 dark:bg-red-500/10 text-red-400 border border-red-50 dark:border-white/5 opacity-40'}
                            ${isSuperAdmin ? 'cursor-default grayscale-[0.5]' : 'hover:scale-110 active:scale-95'}
                          `}
                        >
                          {hasAccess ? (
                            <div className="font-bold">✓</div>
                          ) : (
                            <div className="font-bold text-xs">−</div>
                          )}
                        </button>
                        
                        {isSuperAdmin && (
                          <div className="absolute -top-1 -right-1" title="System Locked">
                            <Lock className="w-2.5 h-2.5 text-amber-500/50" />
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-white/5">
        <p className="text-[10px] text-slate-400 italic text-center">
          * The Superadmin role is system-locked and cannot be modified via the UI to prevent accidental lockout.
        </p>
      </div>
    </div>
  );
};

export default PermissionsMatrix;
