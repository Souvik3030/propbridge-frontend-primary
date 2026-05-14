import React from 'react';

const StatCard = ({ icon: Icon, value, label, subValue, subColor }) => (
  <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px] transition-all hover:shadow-lg">
    <div className="flex items-center gap-[10px] mb-[10px]">
      <div className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center bg-[#c9a84c]/10 dark:bg-[#c9a84c]/20 text-[#c9a84c]">
        <Icon size={18} />
      </div>
    </div>
    <div className="text-[26px] font-extrabold text-[#1a1a2e] dark:text-white font-serif">
      {value}
    </div>
    <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-[2px]">
      {label}
    </div>
    {subValue && (
      <div className={`text-[11px] mt-[4px] ${subColor || 'text-red-500'}`}>
        {subValue}
      </div>
    )}
  </div>
);

const OwnerDashboard = () => {
  return (
    <div className="flex flex-col gap-[14px] mb-[18px]">
      {/* Welcome Banner */}
      <div className="bg-[#c9a84c]/5 dark:bg-[#c9a84c]/10 border border-[#c9a84c]/20 dark:border-[#c9a84c]/30 rounded-xl px-5 py-[14px] flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#c9a84c]/15 dark:bg-[#c9a84c]/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <path d="M9 22v-4h6v4"></path>
            <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"></path>
          </svg>
        </div>
        <div>
          <div className="text-[18px] font-extrabold text-[#1a1a2e] dark:text-white font-serif">
            Owner Dashboard
          </div>
          <div className="text-[13px] text-gray-500 dark:text-gray-400">
            Welcome back, <span className="text-[#1a1a2e] dark:text-gray-200 font-semibold">Mohammad Ali</span> • 14 properties managed
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
        <StatCard 
          icon={() => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <path d="M9 22v-4h6v4"></path>
              <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"></path>
            </svg>
          )}
          value="14"
          label="My Listings"
          subValue="9 live"
        />
        <StatCard 
          icon={() => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          )}
          value="9"
          label="Live on Portals"
          subValue="3 pending"
        />
        <StatCard 
          icon={() => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          )}
          value="—"
          label="Off-Plan Projects"
          subValue="Bayut Live"
        />
        <StatCard 
          icon={() => (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          )}
          value="3"
          label="Pending Approval"
          subValue=""
        />
      </div>
    </div>
  );
};

export default OwnerDashboard;

