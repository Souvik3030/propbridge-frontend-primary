import React from 'react';

const ActivityItem = ({ icon: Icon, color, text, time }) => (
  <div className="flex items-center gap-[10px] py-2 border-b border-black/5 dark:border-white/5 last:border-0">
    <div className={`w-7 h-7 rounded-md bg-${color}/10 flex items-center justify-center shrink-0`}>
      <Icon size={13} className={`text-${color}`} />
    </div>
    <div className="flex-1">
      <div className="text-[12px] text-[#1a1a2e] dark:text-white leading-tight">{text}</div>
      <div className="text-[10px] text-gray-400 dark:text-gray-500">{time}</div>
    </div>
  </div>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"></path></svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const RecentActivity = () => {
  const activities = [
    { icon: CheckIcon, color: "emerald-500", text: "Ahmed listed VW-2456 - Luxury 2BR Marina Gate", time: "2 hours ago" },
    { icon: EditIcon, color: "blue-500", text: "Sara updated VW-2457 - Premium Villa Arabian Ranches", time: "4 hours ago" },
    { icon: SendIcon, color: "amber-600", text: "Omar published VW-2458 to Bayut & PF", time: "5 hours ago" },
    { icon: BuildingIcon, color: "amber-500", text: "New listing VW-2459 submitted for approval", time: "8 hours ago" },
    { icon: CheckIcon, color: "emerald-500", text: "VW-2462 approved and pushed to all portals", time: "12 hours ago" },
    { icon: AlertIcon, color: "red-500", text: "VW-2461 rejected by PF - needs more images", time: "1 day ago" },
  ];

  return (
    <div className="bg-white dark:bg-[#1a1c2e] border border-black/5 dark:border-white/5 rounded-xl p-[18px]">
      <div className="text-[16px] font-bold text-[#1a1a2e] dark:text-white font-serif mb-[12px]">
        Recent Activity
      </div>
      <div>
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;

