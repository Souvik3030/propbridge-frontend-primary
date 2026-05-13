import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Users,
  Settings,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Mail,
} from "lucide-react";

// API & Hooks
import {
  useCompany,
  useCompanyInvitations,
  useResendInvitation,
  useToggleCompanyStatus,
  useUpdateCompanyPlan,
  useCompanyUsers,
} from "../../hooks/useAdmin";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

// UI Components
import { Button } from "../../components/ui/Button";
import InviteAdminModal from "../../components/admin/InviteAdminModal";
import CompanyTeamSection from "../../components/admin/CompanyTeamSection";
import useConfirm from "../../hooks/useConfirm.jsx";

// Modular Page Fragments
import Header from "../../components/admin/company-detail/Header";
import DetailTabs from "../../components/admin/company-detail/DetailTabs";
import OverviewTab from "../../components/admin/company-detail/OverviewTab";
import SettingsTab from "../../components/admin/company-detail/SettingsTab";
import EcosystemSidebar from "../../components/admin/company-detail/EcosystemSidebar";
import ChangePlanModal from "../../components/admin/company-detail/ChangePlanModal";

const CompanyDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  // Synchronize Tab state seamlessly with URL Hash for deep-linking
  const [activeTab, setActiveTab] = useState(() => {
    return window.location.hash
      ? window.location.hash.replace("#", "")
      : "overview";
  });
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const { confirm, ConfirmDialogPortal } = useConfirm();

  // Data Fetching
  const {
    data: company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompany(slug);

  const { data: invitesResponse } = useCompanyInvitations(company?.id);

  const { data: usersResponse } = useCompanyUsers(company?.id);

  const { mutateAsync: resendInvite, isPending: isResending } =
    useResendInvitation();

  const { mutateAsync: toggleStatus, isPending: isToggling } =
    useToggleCompanyStatus();

  const { mutateAsync: updatePlan, isPending: isUpdatingPlan } =
    useUpdateCompanyPlan();

  // Derived State
  const invitations = invitesResponse?.data || [];
  const users = usersResponse?.data || usersResponse || [];

  // Global Loading/Error Gates
  if (companyLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-[#ccab59]" />
        <p className="font-bold text-sm tracking-tight">
          Accessing enterprise record...
        </p>
      </div>
    );
  }

  if (companyError) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
          Entity Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
          {companyError.message ||
            "Unable to locate the specified enterprise entity."}
        </p>
        <Button
          onClick={() => navigate("/admin")}
          className="bg-[#ccab59] hover:bg-[#b0944d] font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!company) return null;

  const isActive = company.is_active || company.status === "Active";
  const status = company.status || (isActive ? "Active" : "Suspended");
  const userCount = company.metrics?.users_count || 0;
  const pendingInvitesCount =
    company.metrics?.pending_invites ?? invitations.length;

  const handleToggleCompany = async () => {
    const actionText = isActive ? "Suspend" : "Activate";

    const ok = await confirm({
      title: `${actionText} this brokerage?`,
      description: `You are about to ${actionText.toLowerCase()} this entire brokerage. This will ${isActive ? "deactivate platform access for all associated users" : "restore platform access for all associated users"}. You can reverse this action at any time.`,
      variant: isActive ? "danger" : "info",
      confirmLabel: actionText,
    });
    if (!ok) return;

    try {
      await toggleStatus(company.id);
      addToast(
        `✅ Brokerage successfully ${isActive ? "suspended" : "activated"}`,
        "success",
      );
    } catch (error) {
      addToast(
        error.message || `Failed to ${actionText.toLowerCase()} company.`,
        "error",
      );
    }
  };

  const handleUpdatePlan = async (newPlan) => {
    try {
      await updatePlan({ companyId: company.id, plan: newPlan });
      addToast(
        `✅ Subscription successfully upgraded to ${newPlan}`,
        "success",
      );
      setShowPlanModal(false);
    } catch (error) {
      addToast(error.message || "Failed to update plan.", "error");
    }
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: Building2 },
    ...(hasPermission("manage company users")
      ? [{ id: "team", name: "Team Directory", icon: Users }]
      : []),
    ...(hasPermission("manage invitations") ||
    hasPermission("manage company users")
      ? [
          {
            id: "invites",
            name: `Invites (${pendingInvitesCount})`,
            icon: Mail,
          },
        ]
      : []),
    // ...(hasPermission("manage company profile") ||
    // hasPermission("manage companies")
    //   ? [{ id: "settings", name: "Configuration", icon: Settings }]
    //   : []),
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      <Header company={company} isActive={isActive} status={status} />

      <DetailTabs
        activeTab={activeTab}
        onTabChange={(targetTab) => {
          setActiveTab(targetTab);
          window.history.replaceState(null, "", `#${targetTab}`); // Silently update URL without triggering jump
        }}
        tabs={tabs}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "overview" && (
            <OverviewTab
              company={company}
              onOpenChangePlan={() => setShowPlanModal(true)}
              usersCount={users.length}
              invitesCount={invitations.length}
            />
          )}

          {activeTab === "team" && hasPermission("manage company users") && (
            <CompanyTeamSection
              companyId={company.id}
              invitations={invitations}
              onInvite={() => setShowInviteModal(true)}
              onResendInvite={async (invite) => {
                try {
                  await resendInvite(invite.id);
                  addToast(`Invitation resent to ${invite.email}`, "success");
                } catch (err) {
                  addToast(
                    err.message || "Failed to resend invitation",
                    "error",
                  );
                }
              }}
              isResending={isResending}
              showUsers={true}
              showInvites={false}
            />
          )}

          {activeTab === "invites" &&
            (hasPermission("manage invitations") ||
              hasPermission("manage company users")) && (
              <CompanyTeamSection
                companyId={company.id}
                invitations={invitations}
                onInvite={() => setShowInviteModal(true)}
                onResendInvite={async (invite) => {
                  try {
                    await resendInvite(invite.id);
                    addToast(`Invitation resent to ${invite.email}`, "success");
                  } catch (err) {
                    addToast(
                      err.message || "Failed to resend invitation",
                      "error",
                    );
                  }
                }}
                isResending={isResending}
                showUsers={false}
                showInvites={true}
              />
            )}

          {/* {activeTab === 'settings' && (hasPermission('manage company profile') || hasPermission('manage companies')) && <SettingsTab company={company} />} */}
        </div>

        <div className="space-y-8">
          <EcosystemSidebar
            company={company}
            userCount={userCount}
            isActive={isActive}
            status={status}
            onToggleStatus={handleToggleCompany}
            isToggling={isToggling}
          />
        </div>
      </div>

      {/* Modals & Overlays */}
      <InviteAdminModal
        isOpen={showInviteModal}
        onClose={() => {
          setShowInviteModal(false);
          queryClient.invalidateQueries({
            queryKey: ["admin", "company", slug],
          });
          queryClient.invalidateQueries({
            queryKey: ["admin", "company", company.id, "invitations"],
          });
        }}
        companyName={company.name}
        companyId={company.id}
        hasAdmin={userCount > 0}
        showInviteLater={false}
      />

      <ChangePlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        currentPlan={company.plan}
        onUpdate={handleUpdatePlan}
        isUpdating={isUpdatingPlan}
      />

      {/* Premium Confirm Dialog Portal */}
      <ConfirmDialogPortal />
    </div>
  );
};

export default CompanyDetailPage;
