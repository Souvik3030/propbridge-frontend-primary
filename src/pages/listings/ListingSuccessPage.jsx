import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ExternalLink, 
  Loader2,
  Building2,
  FileCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { propertyFinderApi } from '../../services';
import { useToast } from '../../context/ToastContext';

const ListingSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [listing, setListing] = useState(null);
  const [compliance, setCompliance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await propertyFinderApi.getListing(id);
        setListing(data);
        runCompliance(id);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
        addToast('Failed to load listing details.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const runCompliance = async (listingId) => {
    setIsChecking(true);
    try {
      const result = await propertyFinderApi.getCompliance(listingId);
      setCompliance(result);
    } catch (error) {
      console.error('Compliance check failed:', error);
      addToast('Initial compliance check failed. You can retry from this page.', 'warning');
    } finally {
      setIsChecking(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await propertyFinderApi.publishListing(id);
      addToast('Listing successfully published to Property Finder!', 'success');
      navigate('/listings');
    } catch (error) {
      console.error('Publishing failed:', error);
      addToast('Failed to publish listing. Please check compliance errors.', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-[#ccab59] animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">PREPARING SUMMARY...</p>
      </div>
    );
  }

  const canPublish = compliance?.can_publish || false;
  const issues = compliance?.issues || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Listing Created Successfully!</h1>
        <p className="text-slate-500 font-medium">Reference: <span className="text-[#ccab59] font-bold">{listing?.reference}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Status & Compliance */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#ccab59]" />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Compliance Check</h2>
              </div>
              {isChecking ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <button 
                  onClick={() => runCompliance(id)}
                  className="text-[12px] font-black text-[#ccab59] uppercase tracking-widest hover:underline"
                >
                  Re-run Scan
                </button>
              )}
            </div>

            {isChecking ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : issues.length > 0 ? (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-[14px] font-bold text-amber-800 dark:text-amber-200">Action Required</p>
                    <p className="text-[12px] text-amber-700/80 dark:text-amber-300/60">Property Finder has identified {issues.length} compliance issue(s) that need resolution before publishing.</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <p className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{issue.message || issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 mb-4">
                  <FileCheck className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Passed All Checks</h3>
                <p className="text-slate-500 text-sm font-medium">Your listing meets all Property Finder quality standards.</p>
              </div>
            )}
          </div>

          {/* Quick Preview Card */}
          <div className="bg-slate-50 dark:bg-[#0d1117] border border-[#ece7d9] dark:border-[#1E2530] rounded-3xl p-6">
            <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-4">Listing Summary</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
                {listing?.images?.[0] ? (
                  <img 
                    src={listing.images[0]} 
                    alt="Property" 
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <Building2 className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-[16px] font-bold text-slate-800 dark:text-white truncate">{listing?.title_en || listing?.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-white dark:bg-slate-800 text-[10px] font-bold text-slate-500 rounded border border-slate-100 dark:border-slate-700 uppercase tracking-tight">
                    {listing?.property_type}
                  </span>
                  <span className="text-[14px] font-black text-[#ccab59]">
                    AED {Number(listing?.price || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-6">Publishing Actions</h3>
            
            <button 
              onClick={handlePublish}
              disabled={!canPublish || isPublishing || isChecking}
              className={`w-full py-4 rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 transition-all shadow-xl mb-4 ${
                canPublish 
                  ? 'bg-[#ccab59] text-white hover:bg-[#b89a4f] shadow-[#ccab59]/30 active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isPublishing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ExternalLink className="w-5 h-5" />
              )}
              {isPublishing ? 'Publishing...' : 'Publish to Portals'}
            </button>

            <Link 
              to={`/listings/${id}/edit`}
              className="w-full py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Edit Draft
            </Link>

            <p className="mt-6 text-[11px] text-slate-400 text-center font-medium leading-relaxed">
              {!canPublish && !isChecking 
                ? "Listing cannot be published until all compliance issues are resolved." 
                : "Your listing is ready to be sent to the portals."}
            </p>
          </div>

          <Link 
            to="/listings"
            className="flex items-center justify-center gap-2 text-slate-500 hover:text-[#ccab59] font-bold text-[14px] transition-colors group"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingSuccessPage;
