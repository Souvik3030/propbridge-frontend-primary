import React, { useState } from 'react';
import OperationsCommandCenter from '../../components/features/ops/OperationsCommandCenter';
import OpsTabs from '../../components/features/ops/OpsTabs';
import ComplianceSummary from '../../components/features/ops/ComplianceSummary';
import ComplianceAuditTable from '../../components/features/ops/ComplianceAuditTable';
import PortalHealthCards from '../../components/features/ops/PortalHealthCards';
import AgentPerformanceTable from '../../components/features/ops/AgentPerformanceTable';
import AutomationRules from '../../components/features/ops/AutomationRules';
import OpsAlerts from '../../components/features/ops/OpsAlerts';

const OpsPage = () => {
  const [activeTab, setActiveTab] = useState('compliance');

  return (
    <div className="flex flex-col gap-5 py-2 pb-12 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
      <OperationsCommandCenter />
      
      <OpsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Content based on activeTab */}
      <div className="flex flex-col gap-4 mt-2">
        {activeTab === 'compliance' && (
          <>
            <ComplianceSummary />
            <ComplianceAuditTable />
          </>
        )}

        {activeTab === 'portal' && (
          <>
            <PortalHealthCards />
          </>
        )}

        {activeTab === 'agent' && (
          <>
            <AgentPerformanceTable />
          </>
        )}

        {activeTab === 'automation' && (
          <>
            <AutomationRules />
          </>
        )}

        {activeTab === 'alerts' && (
          <>
            <OpsAlerts />
          </>
        )}
        
        {activeTab !== 'compliance' && activeTab !== 'portal' && activeTab !== 'agent' && activeTab !== 'automation' && activeTab !== 'alerts' && (
          <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[24px] p-8 flex flex-col items-center justify-center min-h-[350px] text-slate-400 font-medium italic border-dashed">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view and detailed metrics coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default OpsPage;
