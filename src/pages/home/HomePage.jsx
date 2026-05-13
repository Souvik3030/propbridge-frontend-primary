import React from 'react';
import MarketIntelligence from '../../components/features/home/MarketIntelligence';
import QuickInsights from '../../components/features/home/QuickInsights';
import TopDevelopers from '../../components/features/home/TopDevelopers';
import MarketPulse from '../../components/features/home/MarketPulse';
import InvestmentSpotlight from '../../components/features/home/InvestmentSpotlight';
import FeaturedProjects from '../../components/features/home/FeaturedProjects';
import WhyDubai from '../../components/features/home/WhyDubai';
import RecentActivity from '../../components/features/home/RecentActivity';

export default function HomePage() {
  return (
    <>
      <MarketIntelligence />
      <MarketPulse />
      <InvestmentSpotlight />
      <FeaturedProjects />
      <QuickInsights />
      <TopDevelopers />
      <WhyDubai />
      <RecentActivity />
    </>
  );
}
