import React from 'react';
import { XCircle, AlertTriangle, Bell, ArrowRight } from 'lucide-react';

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
      accent: 'bg-[#ef4444]',
      badge: 'bg-red-50 text-[#ef4444] dark:bg-red-500/10 dark:text-red-400',
      icon: <XCircle size={14} className="text-[#ef4444]" />
    },
    warning: {
      accent: 'bg-[#f59e0b]',
      badge: 'bg-orange-50 text-[#f59e0b] dark:bg-orange-500/10 dark:text-orange-400',
      icon: <AlertTriangle size={14} className="text-[#f59e0b]" />
    },
    info: {
      accent: 'bg-[#3b82f6]',
      badge: 'bg-blue-50 text-[#3b82f6] dark:bg-blue-500/10 dark:text-blue-400',
      icon: <Bell size={14} className="text-[#3b82f6]" />
    }
  };

  const style = styles[alert.type] || styles.info;

  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-black/5 dark:border-white/5 rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-stretch h-full">
        <div className={`w-1.5 shrink-0 ${style.accent}`} />
        <div className="p-4 flex-1 flex items-start gap-4">
          <div className="mt-1 flex items-center justify-center">
            {style.icon}
          </div>
          
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-[800] tracking-tight ${style.badge}`}>
                {alert.severity}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-[#8892a4] font-medium transition-colors">
                {alert.time}
              </span>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-[15px] font-[800] text-[#1a1a2e] dark:text-[#f0f0f0] font-serif leading-tight transition-colors">
                {alert.title}
              </h4>
              <p className="text-[12px] text-slate-400 dark:text-[#8892a4] font-medium leading-relaxed mt-1.5 transition-colors">
                {alert.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpsAlerts = () => {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-1 px-1">
        <h3 className="text-[14px] font-[800] text-[#1a1a2e] dark:text-[#f0f0f0] font-serif">System Alerts</h3>
        <button className="text-[11px] font-bold text-[#c9a84c] hover:underline uppercase tracking-tight">Mark all read</button>
      </div>

      <div className="flex flex-col gap-3">
        {alertData.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <button className="text-[11px] font-[800] text-slate-400 dark:text-[#8892a4] hover:text-[#c9a84c] dark:hover:text-[#c9a84c] transition-all flex items-center gap-2 group">
          <span>VIEW NOTIFICATION HISTORY</span>
          <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={10} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default OpsAlerts;
