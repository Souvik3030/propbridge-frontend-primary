import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { usePFListing } from '../../features/property-finder/api';
import DetailHeader from '../../components/features/listings/details/DetailHeader';
import TopInfoCard from '../../components/features/listings/details/TopInfoCard';
import DetailStats from '../../components/features/listings/details/DetailStats';
import DetailTabs from '../../components/features/listings/details/DetailTabs';
import OverviewContent from '../../components/features/listings/details/OverviewContent';
import ComplianceContent from '../../components/features/listings/details/ComplianceContent';
import PortalsContent from '../../components/features/listings/details/PortalsContent';
import TimelineContent from '../../components/features/listings/details/TimelineContent';
import GenerateBrochureModal from '../../components/features/listings/modals/GenerateBrochureModal';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // PF API Integration
  const { data: pfListing, isLoading, error } = usePFListing(id);

  // Helper to format slugs (e.g. "central-ac" -> "Central AC")
  const formatAmenity = (slug) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper to safely extract string from i18n objects
  const translate = (val) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') return val.en || val.ar || '';
    return '';
  };

  // Data Mapper: Translates API result to the structure expected by legacy detail components
  const rawData = pfListing?.data || pfListing; // Handle both {data: {...}} and direct {...}
  
  const listing = rawData ? {
    ...rawData,
    id: rawData.id,
    reference: rawData.pf_reference || rawData.reference || `PF-${rawData.id.substring(0, 8)}`,
    title: translate(rawData.title),
    status: rawData.status === 'published' ? 'Live' : (rawData.status === 'compliance_failed' ? 'Under Approval' : rawData.status?.charAt(0).toUpperCase() + rawData.status?.slice(1) || 'Draft'),
    price: rawData.price?.formatted || (rawData.price?.value ? `AED ${rawData.price.value.toLocaleString()}` : 'Price on Request'),
    subPrice: rawData.listing_type === 'rent' ? 'AED / YEAR' : 'Total Price',
    beds: rawData.specifications?.bedrooms || 0,
    baths: rawData.specifications?.bathrooms || 0,
    sqft: rawData.specifications?.size_sqft ? `${rawData.specifications.size_sqft.toLocaleString()} sq.ft` : '-',
    type: rawData.property_type?.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || rawData.category || 'Apartment',
    community: rawData.emirate?.charAt(0).toUpperCase() + rawData.emirate?.slice(1) || 'Dubai',
    subCommunity: rawData.building_name || 'Synced from PF',
    images: rawData.images || [],
    desc: translate(rawData.description) || '',
    permit: rawData.permit_number || rawData.dld_permit_number || '-',
    purpose: rawData.listing_type?.toUpperCase() || 'SALE',
    category: rawData.category?.charAt(0).toUpperCase() + rawData.category?.slice(1) || 'Residential',
    furnished: rawData.specifications?.furnished?.charAt(0).toUpperCase() + rawData.specifications?.furnished?.slice(1) || 'Unfurnished',
    floor: rawData.specifications?.floor_number || '-',
    developer: rawData.building_name || '-',
    permitDate: rawData.updated_at ? new Date(rawData.updated_at).toLocaleDateString() : '-',
    agent: rawData.agent?.name || '-',
    owner: rawData.company?.name || '-',
    city: rawData.emirate?.charAt(0).toUpperCase() + rawData.emirate?.slice(1) || '-',
    emirate: rawData.emirate?.charAt(0).toUpperCase() + rawData.emirate?.slice(1) || '-',
    offPlan: rawData.project_status === 'off_plan' ? 'Yes' : 'No',
    propertyStatus: rawData.project_status?.replace('_', ' ').toUpperCase() || 'COMPLETED',
    parkings: rawData.specifications?.parking || '-',
    amenities: (rawData.amenities || []).map(formatAmenity),
    score: rawData.is_compliant ? 100 : (rawData.validation_diffs?.length > 0 ? 45 : 0),
    views: rawData.views ?? 0,
    isCompliant: rawData.is_compliant,
    canPublish: rawData.can_publish,
    validationDiffs: rawData.validation_diffs || []
  } : null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-[#ccab59]" />
        <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Fetching Live Data...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <div className="bg-rose-50 p-4 rounded-full text-rose-500 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-[24px] font-black text-slate-900 dark:text-white mb-2">Sync Error</h2>
        <p className="text-slate-400 mb-8 max-w-sm">The listing data could not be retrieved from the synchronization engine.</p>
        <button 
          onClick={() => navigate('/listings')}
          className="px-8 py-3 bg-[#ccab59] text-white rounded-xl font-black text-[15px] hover:opacity-90 transition-opacity"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] dark:bg-[#0a0e1a] text-slate-900 dark:text-[#f0f0f0] pb-10 font-['DM_Sans',_sans-serif] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 pt-4">
        
        <DetailHeader onBack={() => navigate('/listings')} />
        <TopInfoCard listing={listing} />
        <DetailStats listing={listing} />
        <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === 'Overview' && <OverviewContent listing={listing} />}
          {activeTab === 'Compliance' && <ComplianceContent listing={listing} />}
          {activeTab === 'Portals' && <PortalsContent listing={listing} />}
          {activeTab === 'Timeline' && <TimelineContent listing={listing} />}
        </div>

        <GenerateBrochureModal 
          isOpen={isBrochureModalOpen} 
          onClose={() => setIsBrochureModalOpen(false)} 
          data={listing}
        />
      </div>
    </div>
  );
};

export default ListingDetailPage;
