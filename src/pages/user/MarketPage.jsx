import React, { useMemo, useState } from 'react';
import { BarChart3, DollarSign, Tag, Layers, Home, Key } from 'lucide-react';
import MarketHeader from '../../components/features/market/MarketHeader';
import MarketFilters from '../../components/features/market/MarketFilters';
import MarketStatCard from '../../components/features/market/MarketStatCard';
import MarketColumnChartCard from '../../components/features/market/MarketColumnChartCard';
import MarketPieChartCard from '../../components/features/market/MarketPieChartCard';
import MarketAreaComparison from '../../components/features/market/MarketAreaComparison';
import { Button } from '../../components/ui/Button';
import { DLD_STATS, DLD_TOP_AREAS, DLD_PRICE_DISTRIBUTION } from '../../data/mockData';

const formatNumber = (value) => Number(value).toLocaleString();

const MarketPage = () => {
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [activeStatus, setActiveStatus] = useState('All');

  const statItems = useMemo(() => [
    { label: 'Total Transactions', value: formatNumber(DLD_STATS.totalTransactions), accent: 'text-slate-950', Icon: BarChart3 },
    { label: 'Total Volume', value: `AED ${DLD_STATS.totalValueB.toFixed(1)}B`, accent: 'text-slate-950', Icon: DollarSign },
    { label: 'Avg Price/sqft', value: `AED ${formatNumber(3865000)}`, accent: 'text-slate-950', Icon: Tag },
    { label: 'Off-Plan', value: `${formatNumber(DLD_STATS.offPlanSales)} (${Math.round((DLD_STATS.offPlanSales / DLD_STATS.totalTransactions) * 100)}%)`, accent: 'text-slate-950', Icon: Layers },
    { label: 'Ready', value: formatNumber(DLD_STATS.readySales), accent: 'text-slate-950', Icon: Home },
    { label: 'Mortgage Rate', value: '24%', accent: 'text-slate-950', Icon: Key },
  ], []);

  const areaOptions = ['All Areas', 'Jumeirah Village Circle', 'Dubai Land Residence', 'Business Bay', 'Madinat Al Mataar'];

  const topCommunities = useMemo(() => {
    return DLD_TOP_AREAS.slice(0, 10).map((area) => ({
      label: area.area,
      sales: area.sales,
    }));
  }, []);

  const freeholdLeaseholdData = useMemo(() => [
    { name: 'Freehold', value: DLD_STATS.freeholdPct },
    { name: 'Leasehold', value: 100 - DLD_STATS.freeholdPct },
  ], []);

  const priceDistributionData = useMemo(() => DLD_PRICE_DISTRIBUTION.map((item) => ({
    label: item.range,
    value: item.count,
  })), []);

  const offplanReadyData = useMemo(() => [
    { name: 'Off-Plan', value: DLD_STATS.offPlanSales },
    { name: 'Ready', value: DLD_STATS.readySales },
  ], []);

  return (
    <div className="flex flex-col gap-6 py-4 pb-10 min-h-screen animate-in fade-in duration-700">
      <MarketHeader
        title="Dubai Market Data"
        subtitle={`Real-time analytics from ${formatNumber(DLD_STATS.totalTransactions)} DLD transactions`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        {statItems.map((item) => (
          <MarketStatCard key={item.label} label={item.label} value={item.value} accent={item.accent} Icon={item.Icon} />
        ))}
      </div>

      <MarketFilters
        areas={areaOptions}
        selectedArea={selectedArea}
        activeStatus={activeStatus}
        onAreaChange={setSelectedArea}
        onStatusChange={setActiveStatus}
      >
        <Button variant="goldOutline" size="md">Export CSV</Button>
      </MarketFilters>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <MarketColumnChartCard
          title="Top 10 Communities by Sales"
          data={topCommunities}
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

      <div className="grid grid-cols-1 gap-4">
        <MarketColumnChartCard
          title="Avg Price Distribution"
          subtitle="Across all areas"
          data={priceDistributionData}
          xKey="label"
          dataKey="value"
          colors={['#cbb86d', '#d7c9a3', '#b59a4e', '#9f863a', '#8b752f', '#7b672e']}
          valueFormatter={(value) => value.toLocaleString()}
        />
      </div>

      <MarketAreaComparison />
    </div>
  );
};

export default MarketPage;
