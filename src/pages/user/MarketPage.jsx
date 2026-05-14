import React, { useMemo, useState } from 'react';
import { BarChart3, DollarSign, Tag, Layers, Home, Key } from 'lucide-react';
import MarketHeader from '../../components/features/market/MarketHeader';
import MarketFilters from '../../components/features/market/MarketFilters';
import MarketStatCard from '../../components/features/market/MarketStatCard';
import MarketColumnChartCard from '../../components/features/market/MarketColumnChartCard';
import MarketPieChartCard from '../../components/features/market/MarketPieChartCard';
import MarketAreaComparison from '../../components/features/market/MarketAreaComparison';
import Button from '../../components/ui/Button';
import { DLD_STATS, DLD_TOP_AREAS, DLD_PRICE_DISTRIBUTION, DLD_ROOM_DEMAND } from '../../data/mockData';

const formatNumber = (value) => Number(value).toLocaleString();

const MarketPage = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');

  const statItems = useMemo(() => [
    { label: 'Total Transactions', value: formatNumber(DLD_STATS.totalTransactions), Icon: BarChart3 },
    { label: 'Total Volume', value: `AED ${DLD_STATS.totalValueB.toFixed(1)}B`, Icon: DollarSign },
    { label: 'Avg Price/sqft', value: `AED ${formatNumber(3865)}`, Icon: Tag },
    { label: 'Off-Plan', value: `${formatNumber(DLD_STATS.offPlanSales)} (${Math.round((DLD_STATS.offPlanSales / DLD_STATS.totalTransactions) * 100)}%)`, Icon: Layers },
    { label: 'Ready', value: formatNumber(DLD_STATS.readySales), Icon: Home },
    { label: 'Mortgage Rate', value: '24%', Icon: Key },
  ], []);

  const areaOptions = ['All Areas', ...DLD_TOP_AREAS.slice(0, 40).map(a => a.area)];

  // Data for Chart: Top 10 Communities by Sales
  const topCommunitiesData = useMemo(() => {
    return DLD_TOP_AREAS.slice(0, 10).map((area) => ({
      label: area.area.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' '),
      sales: area.sales,
    }));
  }, []);

  // Data for Chart: Freehold vs Leasehold
  const freeholdLeaseholdData = useMemo(() => [
    { name: 'Freehold', value: DLD_STATS.freeholdPct },
    { name: 'Leasehold', value: 100 - DLD_STATS.freeholdPct },
  ], []);

  // Data for Chart: Avg Price Distribution
  const priceDistributionData = useMemo(() => 
    DLD_PRICE_DISTRIBUTION.map(item => ({
      label: item.range,
      value: item.count,
    })), []);

  // Data for Chart: Transaction Volume by Area
  const volumeByAreaData = useMemo(() => 
    DLD_TOP_AREAS.slice(0, 8).map(area => ({
      label: area.area.split(' ').slice(0, 2).join(' '),
      sales: area.sales
    })), []);

  // Data for Chart: Avg Price/sqft by Area
  const priceSqftByAreaData = useMemo(() => 
    DLD_TOP_AREAS.slice(0, 8).map(area => ({
      label: area.area.split(' ').slice(0, 2).join(' '),
      value: parseInt(area.avgSqft.replace('AED ', '').replace(',', ''))
    })), []);

  // Data for Chart: Off-Plan vs Ready
  const offPlanReadyData = useMemo(() => [
    { name: 'Off-Plan', value: DLD_STATS.offPlanSales },
    { name: 'Ready', value: DLD_STATS.readySales },
  ], []);

  // Data for Chart: Bedroom Demand Distribution
  const bedroomDemandData = useMemo(() => 
    DLD_ROOM_DEMAND.slice(0, 6).map(item => ({
      label: item.room,
      value: item.count
    })), []);

  return (
    <div className="flex flex-col gap-6 py-6 pb-12 min-h-screen bg-[#fdfcf9] dark:bg-[#0a0d14] transition-colors duration-300">
      <div className="max-w-full mx-auto w-full px-6 lg:px-10 space-y-8">
        
        {/* Header */}
        <MarketHeader
          title="Dubai Market Data"
          subtitle={`Real-time analytics from ${formatNumber(DLD_STATS.totalTransactions)} DLD transactions`}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statItems.map((item) => (
            <MarketStatCard key={item.label} label={item.label} value={item.value} Icon={item.Icon} />
          ))}
        </div>

        {/* Filters Row */}
        <MarketFilters
          areas={areaOptions}
          selectedArea={selectedArea}
          activeStatus={activeStatus}
          onAreaChange={setSelectedArea}
          onStatusChange={setActiveStatus}
        >
          <Button variant="goldOutline" size="md">Export CSV</Button>
        </MarketFilters>

        {/* First Row of Charts (2x Grid) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <MarketColumnChartCard
            title="Transaction Volume by Area"
            data={volumeByAreaData}
            xKey="label"
            dataKey="sales"
            colors={['#a38847']}
            valueFormatter={(val) => formatNumber(val)}
          />
          <MarketColumnChartCard
            title="Avg Price/sqft by Area"
            data={priceSqftByAreaData}
            xKey="label"
            dataKey="value"
            colors={['#c9a84c']}
            valueFormatter={(val) => `AED ${formatNumber(val)}`}
          />
        </div>

        {/* Second Row of Charts (2x Grid) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <MarketPieChartCard
            title="Off-Plan vs Ready"
            data={offPlanReadyData}
            colors={['#a38847', '#e2e8f0']}
          />
          <MarketColumnChartCard
            title="Bedroom Demand Distribution"
            data={bedroomDemandData}
            xKey="label"
            dataKey="value"
            colors={['#b59a4e']}
            valueFormatter={(val) => formatNumber(val)}
          />
        </div>

        {/* Third Row of Charts (2x Grid) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <MarketColumnChartCard
            title="Top 10 Communities by Sales"
            data={topCommunitiesData}
            xKey="label"
            dataKey="sales"
            colors={['#cbb86d', '#b59a4e', '#9f863a', '#8b752f', '#7b672e', '#6c5f2d', '#8b7839', '#a48945', '#c0a05c', '#d2b869']}
            valueFormatter={(value) => formatNumber(value)}
          />
          <MarketPieChartCard
            title="Freehold vs Leasehold"
            data={freeholdLeaseholdData}
            colors={['#10b981', '#60a5fa']}
          />
        </div>

        {/* Fourth Row (Full Width Price Distribution) */}
        <div className="grid grid-cols-1 gap-5">
          <MarketColumnChartCard
            title="Avg Price Distribution"
            subtitle="Across all areas"
            data={priceDistributionData}
            xKey="label"
            dataKey="value"
            colors={['#a38847', '#b59a4e', '#c9a84c', '#d4c28a', '#e5d9b5']}
            valueFormatter={(value) => value.toLocaleString()}
          />
        </div>

        {/* Data Sections: Comparison & Table */}
        <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <MarketAreaComparison />
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
