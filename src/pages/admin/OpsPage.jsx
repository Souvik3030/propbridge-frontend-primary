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
    <main className="flex-1  min-h-screen transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Header Section */}
          <OperationsCommandCenter />
          
          {/* Navigation Tabs */}
          <OpsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Dynamic Content Area */}
          <div className="page-transition">
            {activeTab === 'compliance' && (
              <>
                <ComplianceSummary />
                <ComplianceAuditTable />
              </>
            )}
            
            {activeTab === 'portal' && <PortalHealthCards />}
            {activeTab === 'performance' && <AgentPerformanceTable />}
            {activeTab === 'automation' && <AutomationRules />}
            {activeTab === 'alerts' && <OpsAlerts />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OpsPage;
