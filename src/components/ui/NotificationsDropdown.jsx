import React from 'react';
import { XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

const NotificationsDropdown = () => {
  const notifications = [
    {
      id: 1,
      type: 'error',
      title: 'PF Rejected VW-002',
      message: 'Minimum 5 images required',
      icon: XCircle,
      iconColor: 'text-red-500 dark:text-red-400',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Permit Expiring',
      message: 'VW-004 — expires in 14 days',
      icon: AlertTriangle,
      iconColor: 'text-amber-500 dark:text-amber-400',
    },
    {
      id: 3,
      type: 'success',
      title: 'Bayut Synced',
      message: '298 listings synced successfully',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
    }
  ];

  return (
    <div className="absolute top-[calc(100%+12px)] right-[-60px] w-[340px] bg-white dark:bg-[#1a1c29] border border-[#e5dfce] dark:border-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-2xl py-2 flex flex-col z-50 transition-colors">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#e5dfce] dark:border-gray-800/80 transition-colors mb-2">
        <h3 className="text-[14px] font-bold text-[#111424] dark:text-white transition-colors">
          Notifications
        </h3>
        <button className="text-[12px] font-medium text-[#a38847] dark:text-[#ccab59] hover:text-[#8a7238] dark:hover:text-[#e0c482] transition-colors">
          Mark all read
        </button>
      </div>
      
      <div className="flex flex-col">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group relative">
            <notif.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${notif.iconColor} transition-colors`} />
            <div className="flex flex-col flex-1 pr-4">
              <span className="text-[14px] font-bold text-[#111424] dark:text-gray-100 mb-0.5 transition-colors">
                {notif.title}
              </span>
              <span className="text-[13px] text-gray-500 dark:text-gray-400 leading-snug transition-colors">
                {notif.message}
              </span>
            </div>
            {/* Unread dot indicator */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-1.5 h-1.5 rounded-full bg-[#ccab59]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsDropdown;
