import React from 'react';
import ActionDropdown from '../ActionDropdown';


const StatusBadge = ({ status }) => {
  const configs = {
    'Live': { bg: 'bg-[#10b98118]', text: 'text-[#10b981]' },
    'Under Approval': { bg: 'bg-[#3b82f618]', text: 'text-[#3b82f6]' },
    'POCKET': { bg: 'bg-[#8b5cf618]', text: 'text-[#8b5cf6]' },
    'default': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' }
  };
  const config = configs[status] || configs.default;

  return (
    <span className={`px-3 py-1 rounded-md text-[12px] font-bold whitespace-nowrap ${config.bg} ${config.text}`}>
      {status}
    </span>
  );
};

const ComplianceScore = ({ score }) => {
  const getScoreColor = (s) => {
    if (s >= 90) return 'bg-[#10b981]';
    if (s >= 70) return 'bg-[#f59e0b]';
    return 'bg-[#ef4444]';
  };
  const getTextColor = (s) => {
    if (s >= 90) return 'text-[#10b981]';
    if (s >= 70) return 'text-[#f59e0b]';
    return 'text-[#ef4444]';
  };

  const hasScore = typeof score === 'number' && score > 0;

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${hasScore ? getScoreColor(score) : 'bg-transparent'}`} 
          style={{ width: `${hasScore ? score : 0}%` }}
        />
      </div>
      <span className={`text-[11px] font-bold ${hasScore ? getTextColor(score) : 'text-[#ef4444]'}`}>
        {hasScore ? score : '—'}
      </span>
    </div>
  );
};

const PortalIndicator = ({ portals = [] }) => (
  <div className="flex gap-0.5">
    {portals.map((p, i) => (
      <span key={i} className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold bg-[#10b98118] text-[#10b981]">
        {p}
      </span>
    ))}
  </div>
);

const ListingsTable = ({ listings, onRowClick, pagination, onPageChange }) => {
  const [selectedIds, setSelectedIds] = React.useState([]);
  const headerClass = "p-1 text-left text-[11px] font-bold tracking-[0.8px] uppercase text-slate-500 dark:text-slate-400 border-b border-black/5 dark:border-white/10";

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newIds = listings.map(item => item.id);
      setSelectedIds(prev => [...new Set([...prev, ...newIds])]);
    } else {
      const currentIds = listings.map(item => item.id);
      setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleSelectRow = (e, id) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const currentSelectedCount = listings.filter(item => selectedIds.includes(item.id)).length;
  const isAllSelected = listings.length > 0 && currentSelectedCount === listings.length;
  const isSomeSelected = currentSelectedCount > 0 && currentSelectedCount < listings.length;

  return (
    <div className="bg-white dark:bg-[#101624] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden font-['DM_Sans',_sans-serif] shadow-sm dark:shadow-none">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#f3f0e8] dark:bg-[#171d2b]">
              <th className="p-3.5 pl-4 w-9 border-b border-black/5 dark:border-white/10">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={handleSelectAll}
                  className="w-3 h-3 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 accent-[#c9a84c]" 
                />
              </th>
              <th className={headerClass}>ACTIONS</th>
              <th className={headerClass}>REFERENCE</th>
              <th className={headerClass}>PROPERTY DETAILS</th>
              <th className={headerClass}>TYPE</th>
              <th className={headerClass}>BEDS / BATH</th>
              <th className={headerClass}>SIZE</th>
              <th className={headerClass}>PRICE</th>
              <th className={headerClass}>STATUS</th>
              <th className={headerClass}>PORTALS</th>
              <th className={headerClass}>SCORE</th>
              <th className={headerClass}>COMMUNITY</th>
            </tr>
          </thead>
          
          <tbody>
            {listings.map((item, idx) => (
              <tr 
                key={idx} 
                onClick={(e) => onRowClick(e, item.id)}
                className="group relative cursor-pointer hover:bg-[#fffaf0] dark:hover:bg-white/[0.06] hover:shadow-[inset_3px_0_0_#c9a84c] transition-all duration-200 border-b border-black/5 dark:border-white/10 last:border-none"
              >
                <td className="p-3.5 pl-4">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) => handleSelectRow(e, item.id)}
                    className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 accent-[#c9a84c]" 
                  />
                </td>

                <td className="p-3.5">
                  <ActionDropdown listingId={item.id} />
                </td>

                <td className="p-3.5">
                  <span className="text-[13px] font-bold text-[#c9a84c]">
                    {item.reference}
                  </span>
                </td>

                <td className="p-3.5 max-w-[340px]">
                  <div className="flex gap-2.5 items-center">
                    {item.images?.[0] ? (
                      <img src={item.images[0]} alt="" className="w-11 h-11 rounded-md object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-11 h-11 rounded-md bg-[#c9a84c12] flex items-center justify-center font-bold text-[#c9a84c] text-[11px] shrink-0 uppercase">
                        {item.title?.[0] || 'V'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-[#1a1a2e] dark:text-slate-100 line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1 leading-tight">
                        {item.description || "VortexWeb Premium Properties is delighted to..."}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-3.5">
                  <span className="text-[12px] text-slate-600 dark:text-slate-300">{item.type || 'Apartment'}</span>
                </td>

                <td className="p-3.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 font-['DM_Sans',_sans-serif] text-[13px] text-[#1a1a2e] dark:text-slate-200">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: 13, height: 13}}>
                        <path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path>
                      </svg>
                      {item.beds}
                    </div>
                    <div className="flex items-center gap-1 font-['DM_Sans',_sans-serif] text-[13px] text-[#1a1a2e] dark:text-slate-200">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: 13, height: 13}}>
                        <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"></path>
                        <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25"></path>
                      </svg>
                      {item.baths}
                    </div>
                  </div>
                </td>

                <td className="p-3.5">
                  <span className="text-[13px] font-semibold text-[#1a1a2e] dark:text-slate-100">{item.sqft}</span>
                </td>

                <td className="p-3.5">
                  <div className="text-[14px] font-bold text-[#1a1a2e] dark:text-slate-100">AED {item.price?.replace('AED', '').trim()}</div>
                  <div className="text-[12px] text-gray-500 dark:text-slate-400">{item.purpose === 'rent' ? 'Rent · Yearly' : 'Sale'}</div>
                </td>

                <td className="p-3.5">
                  <StatusBadge status={item.status} />
                </td>

                <td className="p-3.5">
                  <PortalIndicator portals={item.status === 'Live' ? ['B', 'PF', 'D'] : []} />
                </td>

                <td className="p-3.5">
                  <ComplianceScore score={item.score} />
                </td>

                <td className="p-3.5">
                  <div className="text-[13px] font-semibold text-[#1a1a2e] dark:text-slate-100">{item.community}</div>
                  <div className="text-[12px] text-gray-500 dark:text-slate-400 line-clamp-1">{item.subCommunity || "Hub Canal 1"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="px-6 py-4 bg-[#f8f9fb] dark:bg-[#111827] border-t border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="text-slate-900 dark:text-white font-bold">{pagination.from || 0}</span> to <span className="text-slate-900 dark:text-white font-bold">{pagination.to || 0}</span> of <span className="text-slate-900 dark:text-white font-bold">{pagination.total || 0}</span> listings
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-3 py-1.5 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg transition-all"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1 mx-2">
              {[...Array(pagination.last_page)].map((_, i) => {
                const p = i + 1;
                // Simple logic to show only current, first, last, and neighbors
                if (
                  p === 1 || 
                  p === pagination.last_page || 
                  (p >= pagination.current_page - 1 && p <= pagination.current_page + 1)
                ) {
                  return (
                    <button
                      key={p}
                      onClick={() => onPageChange(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-[12px] font-bold transition-all ${
                        pagination.current_page === p
                          ? 'bg-[#c9a84c] text-white shadow-md'
                          : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  );
                }
                if (p === pagination.current_page - 2 || p === pagination.current_page + 2) {
                  return <span key={p} className="text-slate-400 text-[12px]">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-3 py-1.5 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default ListingsTable;
