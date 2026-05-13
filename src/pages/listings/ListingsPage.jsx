import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Filter, Plus, Building2 } from 'lucide-react';
import { usePFListings } from '../../features/property-finder/api';
import ListingsTable from '../../components/features/listings/table/ListingsTable';

const ListingsPage = () => {
  const navigate = useNavigate();
  const searchQuery = '';
  const { data: pfData, isLoading } = usePFListings();

  const handleRowClick = (e, id) => {
    if (e.target.closest('input[type="checkbox"]') || e.target.closest('button')) return;
    navigate(`/listings/${id}`);
  };

  const mappedListings =
    pfData?.data?.map((pf) => ({
      ...pf,
      reference: pf.pf_reference || pf.id.substring(0, 8).toUpperCase(),
      images: pf.images || [],
      title: pf.title || "Untitled Listing",
      type: pf.property_type?.replace?.("_", " ") || "Property",
      beds: pf.specifications?.bedrooms || 0,
      baths: pf.specifications?.bathrooms || 0,
      sqft: pf.specifications?.size_sqft ? `${pf.specifications.size_sqft}` : "0",
      price: pf.price?.formatted || "Price on Request",
      subPrice: pf.listing_type === "rent" ? "Rent · Yearly" : "Sale",
      status: pf.status === "compliance_failed" ? "Under Approval" : (pf.published_at ? "Live" : "POCKET"),
      community: pf.emirate?.charAt(0).toUpperCase() + pf.emirate?.slice(1) || "Dubai",
      subCommunity: pf.building_name || "Residential",
      score: pf.is_compliant ? 100 : (pf.validation_diffs?.length > 0 ? 45 : 0), // Mock score logic
    })) || [];

  const filteredListings = mappedListings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f2eb] dark:bg-[#0a0d18] transition-colors duration-300">
      <div className="max-w-[1550px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Sub-Header Actions */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <button className="bg-[#2563eb] text-white px-4 py-2 rounded-lg flex items-center gap-1.5 text-[14px] font-bold hover:bg-blue-700 transition-all border-none font-['DM_Sans',_sans-serif]">
              <Filter size={14} className="stroke-white" />
              Filters
            </button>
            <div className="flex items-center gap-2.5">
              <span className="text-[#1a1a2e] dark:text-slate-100 font-semibold text-[14px]">Listings:</span>
              <span className="bg-[#2563eb] text-white px-3 py-0.5 rounded-full text-[13px] font-extrabold">
                {isLoading ? "..." : filteredListings.length}
              </span>
            </div>
          </div>

          <Link
            to="/listings/create"
            className="inline-flex items-center gap-1.5 px-[22px] py-[11px] bg-gradient-to-br from-[#c9a84c] to-[#a88a3e] text-[#0a0e1a] rounded-[10px] text-[14px] font-bold transition-all hover:opacity-90 active:scale-95 shadow-none font-['DM_Sans',_sans-serif] tracking-tight"
          >
            <Plus size={14} strokeWidth={2.5} />
            Create Listing
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#ccab59]/20 border-t-[#ccab59] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 size={24} className="text-[#ccab59] animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-white font-black text-lg mb-1">
                Syncing with Portals
              </p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Please wait while we fetch your inventory
              </p>
            </div>
          </div>
        ) : (
          <ListingsTable
            listings={filteredListings}
            onRowClick={handleRowClick}
          />
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
