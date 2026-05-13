import React from 'react';
import HottestProjectsTable from './HottestProjectsTable';
import DLDActiveProjects from './DLDActiveProjects';
import CommunityDeepDive from './CommunityDeepDive';
import RegisteredDevelopers from './RegisteredDevelopers';

const HotAreasAndDeals = () => {
  return (
    <div className="min-h-screen py-6 px-1 md:px-5">
      <div className=" mx-auto flex flex-col gap-5">
        
        {/* Section 1: Top Rental Yields (Cards) */}
        <section>
          <div className=" rounded-3xl overflow-hidden">
             <HottestProjectsTable />
          </div>
        </section>

        {/* Section 2: Area Deep Dive (Detailed Stats) */}
        <section>
          <div className="rounded-3xl overflow-hidden">
            <CommunityDeepDive />
          </div>
        </section>
        
        {/* Section 3: DLD Active Projects (Construction Tracking) */}
        <section>
          <div className="rounded-3xl overflow-hidden">
            <RegisteredDevelopers />
          </div>
        </section>

        {/* Section 4: Hottest Projects (Sales Ranking) */}
        <section>
          <div className=" rounded-3xl overflow-hidden">
            <DLDActiveProjects />
          </div>
        </section>

        

      </div>
    </div>
  );
};

export default HotAreasAndDeals;