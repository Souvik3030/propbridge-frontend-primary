import React, { useState } from 'react';
import { 
  Building2, Users, Loader2, AlertCircle, Info, Plus, Mail
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

// API & Hooks
import { 
  useCompany, 
  useCompanyInvitations, 
  useResendInvitation, 
  useUpdateCompanyPlan, 
  useCompanyUsers
} from '../../hooks/useAdmin';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// UI Components
import { Button } from '../../components/ui/Button';
import InviteAdminModal from '../../components/admin/InviteAdminModal';
import CompanyTeamSection from '../../components/admin/CompanyTeamSection';

// Modular Page Fragments
import Header from '../../components/admin/company-detail/Header';
import DetailTabs from '../../components/admin/company-detail/DetailTabs';
import OverviewTab from '../../components/admin/company-detail/OverviewTab';

const CompanyAdminPage = () => {
  const { user, hasPermission } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Derive company slug from the authenticated user
  const companySlug = user?.company?.slug || user?.company_slug;
  const companyId = user?.company_id || user?.company?.id;

  // Data Fetching scoped to the user's company (using ID for more reliable lookup)
  const { 
    data: company, 
    isLoading: companyLoading, 
    error: companyError 
  } = useCompany(companyId, true);

  const { 
    data: invitesResponse 
  } = useCompanyInvitations(companyId);

  const { 
    data: usersResponse 
  } = useCompanyUsers(companyId);

  const {
    mutateAsync: resendInvite,
    isPending: isResending
  } = useResendInvitation();

  const {
    mutateAsync: updatePlan,
    isPending: isUpdatingPlan
  } = useUpdateCompanyPlan();

  // Derived State
  const invitations = invitesResponse?.data || [];
  const users = usersResponse?.data || usersResponse || [];
  
  const canManageTeam = hasPermission('manage company users');

  if (companyLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-[#ccab59]" />
        <p className="font-bold text-sm tracking-tight uppercase tracking-[0.2em]">Syncing brokerage data...</p>
      </div>
    );
  }

  if (companyError || !companySlug) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Access Denied</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
          We were unable to locate an enterprise record associated with your account.
        </p>
      </div>
    );
  }

  const isActive = company.is_active || company.status === 'Active';
  const status = company.status || (isActive ? 'Active' : 'Suspended');
  const pendingInvitesCount = company.metrics?.pending_invites ?? invitations.length;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Building2 },
    ...(hasPermission('manage company users') ? [{ id: 'team', name: 'Team Management', icon: Users }] : []),
    ...(hasPermission('manage invitations') || hasPermission('manage company users') ? [{ id: 'invites', name: `Invites (${pendingInvitesCount})`, icon: Mail }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      <Header 
        company={company} 
        isActive={isActive} 
        status={status} 
        isSubAdminView={true} 
      />

      <DetailTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        tabs={tabs} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
                <OverviewTab 
                    company={company} 
                    onOpenChangePlan={() => {}} // Company admins might not change their own plan directly
                    isSubAdmin={true}
                    usersCount={users.length}
                    invitesCount={invitations.length}
                />
                
                {/* Information Card for Sub-Admins */}
                <div className="bg-[#ccab59]/10 border border-[#ccab59]/20 p-6 rounded-[2rem] flex items-start gap-4">
                    <Info className="w-6 h-6 text-[#ccab59] mt-0.5" />
                    <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Operational Tier</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Your company is currently active on the <span className="text-[#ccab59] font-bold">{company.plan}</span> plan. 
                            To upgrade your seat limits or access advanced analytical tools, please contact the platform super-admin.
                        </p>
                    </div>
                </div>
            </div>
          )}
          
          {activeTab === 'team' && hasPermission('manage company users') && (
            <CompanyTeamSection 
                companyId={companyId} 
                invitations={invitations}
                onInvite={() => setShowInviteModal(true)}
                onResendInvite={async (invite) => {
                  try {
                    await resendInvite(invite.id);
                    addToast(`Invitation resent to ${invite.email}`, 'success');
                  } catch (err) {
                    addToast(err.message || 'Failed to resend invitation', 'error');
                  }
                }}
                isResending={isResending}
                isSubAdmin={true}
                showUsers={true}
                showInvites={false}
            />
          )}

          {(activeTab === 'invites' && (hasPermission('manage invitations') || hasPermission('manage company users'))) && (
            <CompanyTeamSection 
                companyId={companyId} 
                invitations={invitations}
                onInvite={() => setShowInviteModal(true)}
                onResendInvite={async (invite) => {
                  try {
                    await resendInvite(invite.id);
                    addToast(`Invitation resent to ${invite.email}`, 'success');
                  } catch (err) {
                    addToast(err.message || 'Failed to resend invitation', 'error');
                  }
                }}
                isResending={isResending}
                isSubAdmin={true}
                showUsers={false}
                showInvites={true}
            />
          )}
        </div>
      </div>

      {/* Team Invitation Modal */}
      <InviteAdminModal 
        isOpen={showInviteModal}
        onClose={() => {
          setShowInviteModal(false);
          queryClient.invalidateQueries({ queryKey: ['admin', 'company', companySlug] });
          queryClient.invalidateQueries({ queryKey: ['admin', 'company', companyId, 'invitations'] });
        }}
        companyName={company.name}
        companyId={companyId}
        hasAdmin={true} // Company admins always invite new team members
        showInviteLater={false}
      />
    </div>
  );
};

export default CompanyAdminPage;
