import React from 'react';
import QuickMortgageCalculator from './QuickMortgageCalculator';
import RentalYieldDashboard from './RentalYieldDashboard';
import AreaComparisonTable from './AreaComparison';
import HottestProjectsTable from '../hotArea/HottestProjectsTable';
import CommunityDeepDive from '../hotArea/CommunityDeepDive';
import RegisteredDevelopers from '../hotArea/RegisteredDevelopers';

const InvestmentTools = () => {
  return (
    <div className="py-2 px-2 md:px-4">
      {/* Main Container for all tools */}
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
         <section className="rounded-2xl shadow-sm overflow-hidden">
          <AreaComparisonTable />
        </section>

        {/* Section 1: Mortgage Calculator */}
        <section>
          <QuickMortgageCalculator />
        </section>

        {/* Section 2: Top Rental Yields (Cards) */}
        <section className="rounded-2xl shadow-sm overflow-hidden">
          <RentalYieldDashboard />
        </section>

        {/* Section 3: Area Comparison (Table) */}
       
      </div>
    </div>
  );
};

export default InvestmentTools;