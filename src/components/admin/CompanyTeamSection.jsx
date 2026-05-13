import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Loader2, LogIn, ShieldAlert, RefreshCcw, Send, Search } from 'lucide-react';
import { useCompanyUsers, useImpersonate, useToggleUserStatus, useRevokeInvitation } from '../../hooks/useAdmin';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import useConfirm from '../../hooks/useConfirm.jsx';

const ROLE_STYLES = {
  admin: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
  agent: 'bg-blue-50   text-blue-700   border-blue-200   dark:bg-blue-900/20   dark:text-blue-400   dark:border-blue-800',
  owner: 'bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-900/20  dark:text-amber-400  dark:border-amber-800',
};

const UserRow = ({ user, onImpersonate, onToggleStatus, isLoading, isInvite = false, onResend, onRevoke, canImpersonate = false }) => {
  const isActive = isInvite ? false : (user.status === 'Active' || user.is_active);
  const roleKey = (user.role || '').toLowerCase();
  const roleCls = ROLE_STYLES[roleKey] || 'bg-slate-50 text-slate-600 border-slate-200';
  const { user: currentUser } = useAuth();

  // Rule: You can't suspend yourself
  const isSelf = currentUser?.id === user.id;

  return (
    <tr className={`hover:bg-slate-50/70 dark:hover:bg-white/[0.03] transition-colors group ${isInvite ? 'opacity-70 grayscale-[0.3]' : ''}`}>
      {/* User Details */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`}
            alt={user.name || user.email}
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex-shrink-0 bg-slate-100"
          />
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{user.name || user.email.split('@')[0]}</p>
            <p className="text-slate-400 text-[11px] mt-0.5">{user.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${roleCls}`}>
          {user.role}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {isInvite ? (
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#ccab59]">
            <Send className="w-3 h-3" />
            Invitation Pending
          </div>
        ) : (
          <div className={`flex items-center gap-1.5 text-xs font-bold ${isActive ? 'text-emerald-500' : 'text-red-400'}`}>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-emerald-500' : 'bg-red-400'}`} />
            {isActive ? 'Active' : 'Suspended'}
          </div>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        {isInvite ? (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onResend(user)}
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest 
                 px-3 py-1.5 rounded-lg border transition-all
                 text-[#ccab59] border-[#ccab59]/20 bg-[#ccab59]/5 hover:bg-[#ccab59]/10"
            >
              Resend
            </button>
            
            {user.can_revoke ? (
              <button
                onClick={() => onRevoke(user)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest 
                   px-3 py-1.5 rounded-lg border transition-all text-red-500 border-red-100 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:border-red-900/30 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Revoke'}
              </button>
            ) : (
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-2">Cannot Revoke</span>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2">
            {/* Status Toggle - Superadmin or Company Admin */}
            {!isInvite && !isSelf && (
              <button
                onClick={() => onToggleStatus(user)}
                disabled={isLoading}
                className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all shadow-sm
                  ${isActive
                    ? 'text-red-500 border-red-100 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:border-red-900/30'
                    : 'text-emerald-600 border-emerald-100 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30'
                  }
                `}
              >
                {isActive ? 'Suspend' : 'Activate'}
              </button>
            )}

            {/* Impersonation - Conditional on permission */}
            {canImpersonate && (
              <button
                onClick={() => onImpersonate(user)}
                disabled={!isActive || isLoading}
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest 
                  px-3 py-1.5 rounded-lg border transition-all
                  text-slate-600 border-slate-200 bg-white hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm
                  dark:text-slate-400 dark:border-slate-700 dark:bg-transparent dark:hover:text-indigo-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogIn className="w-3.5 h-3.5" />
                )}
                {isLoading ? 'Switching...' : `Direct Access`}
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};

/**
 * Team Directory section shown on CompanyDetailPage.
 * Fetches company users and provides "Login As" impersonation for Superadmins.
 * @param {Object} props
 * @param {string} props.companyId
 * @param {Array} props.invitations
 * @param {Function} props.onInvite
 * @param {Function} props.onResendInvite
 * @param {boolean} props.isResending
 * @param {boolean} props.isSubAdmin
 * @param {boolean} props.showUsers - If true, renders active users
 * @param {boolean} props.showInvites - If true, renders pending invitations
 */
const CompanyTeamSection = ({
  companyId,
  invitations = [],
  onInvite,
  onResendInvite,
  isResending,
  isSubAdmin = false,
  showUsers = true,
  showInvites = true
}) => {
  const { addToast, hasPermission } = useAuth();
  const { addToast: addToastFromToastContext } = useToast();
  const navigate = useNavigate();
  const { confirm, ConfirmDialogPortal } = useConfirm();
  const { mutateAsync: impersonate } = useImpersonate();
  const { mutateAsync: toggleUserStatus } = useToggleUserStatus();
  const { mutateAsync: revokeInvite } = useRevokeInvitation();
  const [impersonatingId, setImpersonatingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [revokingId, setRevokingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCompanyUsers(companyId);

  const users = data?.data || data || [];
  const canInvite = hasPermission('manage company users');

  // Determine what to show
  const activeUsers = showUsers ? users : [];
  const pendingInvites = showInvites ? invitations : [];

  // Real-time intelligent search filtering
  const filteredActiveUsers = useMemo(() => {
    if (!searchQuery) return activeUsers;
    const q = searchQuery.toLowerCase();
    return activeUsers.filter(u => 
      (u.name && u.name.toLowerCase().includes(q)) || 
      (u.email && u.email.toLowerCase().includes(q)) || 
      (u.role && u.role.toLowerCase().includes(q))
    );
  }, [activeUsers, searchQuery]);

  const filteredPendingInvites = useMemo(() => {
    if (!searchQuery) return pendingInvites;
    const q = searchQuery.toLowerCase();
    return pendingInvites.filter(u => 
      (u.email && u.email.toLowerCase().includes(q)) || 
      (u.role && u.role.toLowerCase().includes(q))
    );
  }, [pendingInvites, searchQuery]);

  // Overall empty state respects the active search parameters
  const isEmpty = filteredActiveUsers.length === 0 && filteredPendingInvites.length === 0;

  const handleImpersonate = async (targetUser) => {
    const ok = await confirm({
      title: `Switch identity to ${targetUser.name}?`,
      description: `You are about to enter an administrative preview session as ${targetUser.name} (${targetUser.role || 'User'}). This allows you to verify and manage specific workspace data. Your original session will be preserved.`,
      variant: 'warning',
      confirmLabel: 'Switch Identity',
    });
    if (!ok) return;

    setImpersonatingId(targetUser.id);
    try {
      await impersonate(targetUser.id);
      addToast(`✅ Now acting as ${targetUser.name}`, 'success');
      window.location.href = '/dashboard';
    } catch {
      setImpersonatingId(null);
    }
  };

  const handleToggleStatus = async (targetUser) => {
    const isActivating = !(targetUser.status === 'Active' || targetUser.is_active);
    const actionLabel = isActivating ? 'Activate' : 'Suspend';

    const ok = await confirm({
      title: `${actionLabel} account for ${targetUser.name}?`,
      description: `This will ${isActivating ? 'restore access to the platform for' : 'deactivate the platform access of'} ${targetUser.name}. You can reverse this action at any time.`,
      variant: isActivating ? 'info' : 'danger',
      confirmLabel: actionLabel,
    });
    if (!ok) return;

    setTogglingId(targetUser.id);
    try {
      await toggleUserStatus(targetUser.id);
      addToast(`✅ User account ${isActivating ? 'activated' : 'suspended'}`, 'success');
    } catch (err) {
      addToast(err.message || 'Failed to toggle user status', 'error');
    } finally {
      setTogglingId(null);
    }
  };

  const handleRevokeInvite = async (invite) => {
    const ok = await confirm({
      title: `Revoke invitation for ${invite.email}?`,
      description: `This will permanently cancel the pending invitation. ${invite.email} will no longer be able to use the invite link to join the team.`,
      variant: 'danger',
      confirmLabel: 'Revoke Invitation',
    });
    if (!ok) return;

    setRevokingId(invite.id);
    try {
      await revokeInvite(invite.id);
      addToast(`✅ Invitation revoked successfully for ${invite.email}`, 'success');
      refetch();
    } catch (err) {
      addToast(err.response?.data?.message || err.message || 'Failed to revoke invitation', 'error');
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <>
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm overflow-hidden mt-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ccab59]/10 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-[#ccab59]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
              {showInvites && !showUsers ? 'Pending Invitations' : 'Team Directory'}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
              {showInvites && !showUsers
                ? (pendingInvites.length > 0 ? `${pendingInvites.length} pending request${pendingInvites.length !== 1 ? 's' : ''}` : 'No pending invitations')
                : (activeUsers.length > 0 ? `${activeUsers.length} member${activeUsers.length !== 1 ? 's' : ''}` : 'No active members')
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          {/* Smart Search Filter */}
          <div className="relative w-full sm:w-56 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#ccab59]/20 focus:border-[#ccab59]/40 transition-all outline-none text-slate-800 dark:text-white placeholder:text-slate-400 shadow-sm"
            />
          </div>
          {onInvite && canInvite && (
            <button
              onClick={onInvite}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#ccab59] hover:bg-[#b0944d] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-[#ccab59]/20 transition-all hover:scale-[1.02]"
            >
              <LogIn className="w-3.5 h-3.5" />
              Invite Member
            </button>
          )}

          {!isSubAdmin && !hasPermission('impersonate users') && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <ShieldAlert className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Platform Admin Only</span>
            </div>
          )}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-[#ccab59] transition-colors disabled:opacity-40"
          >
            <RefreshCcw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#ccab59]" />
          <p className="text-sm font-bold">Accessing data...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <p className="text-red-500 font-bold text-sm">{error.message || 'Failed to load records.'}</p>
        </div>
      ) : (isEmpty) ? (
        <div className="py-16 flex flex-col items-center gap-3 text-slate-300 dark:text-slate-700">
          <Users className="w-12 h-12" />
          <p className="text-sm font-bold text-slate-400">
            {searchQuery 
              ? `No results found for "${searchQuery}"` 
              : (showInvites && !showUsers ? 'No pending invitations found.' : 'No team members found.')}
          </p>
          {onInvite && showInvites && (
            <button
              onClick={onInvite}
              className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#ccab59] hover:underline"
            >
              Send the first invitation now
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {/* Active Users */}
              {filteredActiveUsers.map(user => (
                <UserRow
                  key={`user-${user.id}`}
                  user={user}
                  onImpersonate={handleImpersonate}
                  onToggleStatus={handleToggleStatus}
                  isLoading={impersonatingId === user.id || togglingId === user.id}
                  canImpersonate={hasPermission('impersonate users')}
                />
              ))}

              {/* Pending Invitations */}
              {filteredPendingInvites.map(invite => (
                <UserRow
                  key={`invite-${invite.id}`}
                  user={invite}
                  isInvite={true}
                  onResend={onResendInvite}
                  onRevoke={handleRevokeInvite}
                  isLoading={isResending || revokingId === invite.id}
                  canImpersonate={hasPermission('impersonate users')}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* Premium Confirm Dialog Portal */}
    <ConfirmDialogPortal />
    </>
  );
};

export default CompanyTeamSection;
