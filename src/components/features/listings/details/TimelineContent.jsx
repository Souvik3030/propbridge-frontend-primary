import React from 'react';
import { Plus, CheckCircle, Globe, RefreshCcw } from 'lucide-react';

const TimelineContent = ({ listing }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Build dynamic events array based on available timestamps
  const events = [
    { 
      title: 'Listing Created', 
      user: listing.company?.name || 'System', 
      role: 'Company', 
      date: formatDate(listing.created_at), 
      icon: Plus, 
      show: !!listing.created_at 
    },
    { 
      title: 'Compliance Verified', 
      user: 'Compliance Engine', 
      role: 'System', 
      date: formatDate(listing.last_compliance_check_at || listing.updated_at), 
      icon: CheckCircle, 
      show: listing.is_compliant 
    },
    { 
      title: 'Portal Synchronization', 
      user: listing.agent?.name || 'System', 
      role: 'Agent', 
      date: formatDate(listing.published_at), 
      icon: Globe, 
      show: !!listing.published_at 
    },
    { 
      title: 'Latest Modification', 
      user: listing.agent?.name || listing.company?.name || 'User', 
      role: 'Editor', 
      date: formatDate(listing.updated_at), 
      icon: RefreshCcw, 
      show: !!listing.updated_at && listing.updated_at !== listing.created_at
    }
  ].filter(e => e.show);

  return (
    <div className="bg-white dark:bg-[#1a1f35] border border-black/5 dark:border-white/10 rounded-xl p-5 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500 transition-colors">
      <div className="space-y-0 relative">
        {events.length > 0 ? events.map((event, i) => (
          <div key={i} className="flex gap-3 relative group">
            {/* Timeline Line */}
            {i !== events.length - 1 && (
              <div className="absolute left-[15px] top-8 w-px h-full bg-slate-100 dark:bg-white/5" />
            )}
            
            {/* Icon */}
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#1e2440] text-[#c9a84c] relative z-10 transition-transform group-hover:scale-110`}>
              <event.icon size={14} />
            </div>

            {/* Content */}
            <div className="pb-6">
              <h4 className="text-[12px] font-bold text-slate-900 dark:text-[#f0f0f0] leading-tight mb-0.5 uppercase tracking-wide">
                {event.title}
              </h4>
              <p className="text-[11px] font-medium text-slate-400 dark:text-[#8892a4]">
                {event.user} · <span className="text-[#c9a84c]">{event.role}</span> · {event.date}
              </p>
            </div>
          </div>
        )) : (
          <div className="text-center py-4 text-slate-400 text-[12px] font-medium italic">
            No activity history available for this listing.
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineContent;
