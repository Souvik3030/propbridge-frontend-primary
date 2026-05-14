import React from 'react';
import OwnerDashboard from '../../components/features/dashboard/OwnerDashboard';
import RevenueTrend from '../../components/features/dashboard/RevenueTrend';
import PortalDistribution from '../../components/features/dashboard/PortalDistribution';
import PortalStatusCards from '../../components/features/dashboard/PortalStatusCards';
import TopListings from '../../components/features/dashboard/TopListings';
import AgentPerformance from '../../components/features/dashboard/AgentPerformance';
import RecentActivity from '../../components/features/dashboard/RecentActivity';
import ComplianceOverview from '../../components/features/dashboard/ComplianceOverview';
import DataSources from '../../components/features/dashboard/DataSources';

const DashboardPage = () => {
  return (
    <main className="flex-1">
      <div className="vw-container">
        <div className="max-w-[1400px] mx-auto">
          <OwnerDashboard />
          
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-[14px] mb-[18px]">
            <RevenueTrend />
            <PortalDistribution />
          </div>

          <div className="mb-[18px]">
            <PortalStatusCards />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] mb-[18px]">
            <TopListings />
            <AgentPerformance />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
            <RecentActivity />
            <ComplianceOverview />
          </div>

          <DataSources />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

