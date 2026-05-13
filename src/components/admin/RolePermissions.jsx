import React, { useMemo } from 'react';
import RoleCard from './RoleCard';
import PermissionsMatrix from './PermissionsMatrix';
import { usePermissions } from '../../hooks/useAdmin';
import { Loader2 } from 'lucide-react';

const ROLE_CONFIGS = {
  superadmin: {
    label: 'Super Admin',
    level: 100,
    icon: '👑',
    description: 'VortexWeb platform owner — full control over everything',
    colorClass: 'text-red-500',
    borderColorClass: 'border-red-500',
    progressColorClass: 'bg-red-500'
  },
  admin: {
    label: 'Admin',
    level: 70,
    icon: '🏢',
    description: 'Company admin — manages users, listings, and settings within their company',
    colorClass: 'text-blue-500',
    borderColorClass: 'border-blue-500',
    progressColorClass: 'bg-blue-500'
  },
  agent: {
    label: 'Listing Agent',
    level: 40,
    icon: '🏠',
    description: 'Agent who manages and publishes property listings',
    colorClass: 'text-orange-500',
    borderColorClass: 'border-orange-500',
    progressColorClass: 'bg-orange-500'
  },
  owner: {
    label: 'Listing Owner',
    level: 20,
    icon: '🔑',
    description: 'Property owner who can view their listings and download brochures',
    colorClass: 'text-emerald-500',
    borderColorClass: 'border-emerald-500',
    progressColorClass: 'bg-emerald-500'
  }
};

const RolePermissions = () => {
  const { data: rawData, isLoading, error } = usePermissions();

  // Handle both { data: { roles } } and { roles } structures defensively
  const roles = rawData?.roles || [];
  const all_permissions = rawData?.all_permissions || [];

  const rolesData = useMemo(() => {
    return roles.map(role => {
      const config = ROLE_CONFIGS[role.name.toLowerCase()] || {
        label: role.name,
        level: 0,
        icon: '🛡️',
        description: 'Standard system role',
        colorClass: 'text-slate-500',
        borderColorClass: 'border-slate-500',
        progressColorClass: 'bg-slate-500'
      };

      return {
        ...config,
        role: config.label,
        permissionsCount: role.permissions.length,
        totalPermissions: all_permissions.length
      };
    });
  }, [roles, all_permissions]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#ccab59]" />
        <p className="font-bold tracking-tight">Syncing Security Matrix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-6 text-center font-bold">
        {error.message || 'Failed to load permissions system'}
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rolesData.map((role) => (
          <RoleCard key={role.role} {...role} />
        ))}
      </div>

      <PermissionsMatrix roles={roles} allPermissions={all_permissions} />
    </div>
  );
};

export default RolePermissions;
