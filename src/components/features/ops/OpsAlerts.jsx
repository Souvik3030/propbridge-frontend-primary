import React from 'react';
import { XCircle, AlertTriangle, Bell } from 'lucide-react';

const alertData = [
  {
    id: 1,
    severity: 'CRITICAL',
    time: '2 hours ago',
    title: '3 Permits Expiring Within 7 Days',
    description: 'REF-101, REF-205, REF-311 need renewal before portal rejection',
    type: 'critical'
  },
  {
    id: 2,
    severity: 'WARNING',
    time: '4 hours ago',
    title: 'Dubizzle API Rate Limited',
    description: 'Feed sync delayed by 45 minutes due to rate limiting',
    type: 'warning'
  },
  {
    id: 3,
    severity: 'WARNING',
    time: '6 hours ago',
    title: '12 Listings Below Quality Threshold',
    description: 'Missing floor plans or insufficient photos',
    type: 'warning'
  },
  {
    id: 4,
    severity: 'INFO',
    time: '8 hours ago',
    title: 'Property Finder Sync Completed',
    description: '312 listings pushed successfully, 3 failed validation',
    type: 'info'
  }
];

const AlertCard = ({ alert }) => {
  const styles = {
    critical: {
      border: 'border-l-[3px] border-l-red-500',
      badge: 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400',
      icon: <XCircle size={12} className="text-red-500" />
    },
    warning: {
      border: 'border-l-[3px] border-l-[#ccab59]',
      badge: 'bg-orange-50 text-[#ccab59] dark:bg-[#ccab59]/10 dark:text-[#ccab59]',
      icon: <AlertTriangle size={12} className="text-[#ccab59]" />
    },
    info: {
      border: 'border-l-[3px] border-l-blue-500',
      badge: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400',
      icon: <Bell size={12} className="text-blue-500" />
    }
  };

  const style = styles[alert.type] || styles.info;

  return (
    <div className={`bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[16px] p-4 flex items-start gap-3.5 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500 ${style.border}`}>
      <div className={`mt-0.5 p-1.5 rounded-lg ${alert.type === 'critical' ? 'bg-red-50 dark:bg-red-500/5' : 'bg-[#fdfaf3] dark:bg-white/5'}`}>
        {style.icon}
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest ${style.badge}`}>
            {alert.severity}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {alert.time}
          </span>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">
            {alert.title}
          </h4>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5">
            {alert.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const OpsAlerts = () => {
  return (
    <div className="flex flex-col gap-2.5 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {alertData.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
      
      <div className="mt-3 flex justify-center">
        <button className="text-[11px] font-bold text-slate-400 hover:text-[#ccab59] transition-colors flex items-center gap-1.5">
          <span>View all notifications</span>
          <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
            <span className="text-[10px]">→</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OpsAlerts;
