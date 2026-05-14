import { ZapOff, ExternalLink, Globe } from 'lucide-react';

const PortalsContent = ({ listing }) => {
  // Map API status to UI badges
  const getStatusInfo = (status) => {
    switch (status) {
      case 'published':
        return { label: 'Live', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
      case 'compliance_failed':
        return { label: 'Action Required', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' };
      case 'draft':
        return { label: 'Draft', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' };
      default:
        return { label: 'Under Approval', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
    }
  };

  const portals = [
    { 
      name: 'Property Finder', 
      statusInfo: getStatusInfo(listing.status),
      url: listing.pf_listing_url,
      active: true 
    },
    { 
      name: 'Bayut', 
      statusInfo: { label: 'Pending Sync', color: 'bg-slate-400/10 text-slate-400 border-slate-400/10' },
      url: null,
      active: false
    },
    { 
      name: 'Dubizzle', 
      statusInfo: { label: 'Pending Sync', color: 'bg-slate-400/10 text-slate-400 border-slate-400/10' },
      url: null,
      active: false
    },
  ];

  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {portals.map((portal, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1f35] border border-black/5 dark:border-white/10 rounded-xl p-4 flex items-center justify-between shadow-sm transition-colors">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${portal.active ? 'bg-[#c9a84c12] text-[#c9a84c]' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
              <Globe size={16} />
            </div>
            <span className="text-[13px] font-extrabold text-slate-800 dark:text-[#f0f0f0] uppercase tracking-wide font-['DM_Sans',_sans-serif]">
              {portal.name}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${portal.statusInfo.color}`}>
              {portal.statusInfo.label}
            </span>
            
            {portal.url ? (
              <a 
                href={portal.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c9a84c] text-[#0a0e1a] rounded-lg font-bold text-[11px] hover:opacity-90 transition-all uppercase tracking-tight"
              >
                <ExternalLink size={12} /> View Live
              </a>
            ) : portal.active ? (
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-500 rounded-lg font-bold text-[11px] hover:bg-rose-500/20 transition-all uppercase tracking-tight border border-rose-500/10">
                <ZapOff size={12} /> Unpublish
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortalsContent;
