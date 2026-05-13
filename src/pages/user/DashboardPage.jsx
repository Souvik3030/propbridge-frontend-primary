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
    <div className="flex flex-col gap-4 py-2 pb-10 min-h-screen animate-in fade-in duration-700">
      <OwnerDashboard />
      
      {/* Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueTrend />
        </div>
        <div className="lg:col-span-1">
          <PortalDistribution />
        </div>
      </div> 
      
      {/* Portal Status Section */}
      <div className="flex flex-col gap-3">
        <PortalStatusCards />
      </div>

      {/* Operational Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopListings />
        <AgentPerformance />
      </div>

      {/* Activity & Compliance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <ComplianceOverview />
      </div>

      {/* System Section */}
      <DataSources />
    </div>
  );
};

export default DashboardPage;
