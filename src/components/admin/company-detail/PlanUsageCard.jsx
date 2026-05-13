import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/Button';

const PlanUsageCard = ({ company, onOpenChangePlan, isSuperadmin, usersCount, invitesCount }) => {
  const currentPlan = (company.plan || 'basic').toLowerCase();
  
  // Use quota data as baseline
  const quota = company.quota || {
    max_users: 0,
    used_users: 0,
    available_seats: 0
  };

  const maxSeats = quota.max_users;
  
  // Calculate real-time used seats if props are provided, otherwise fallback to quota/metrics
  const hasExternalCounts = usersCount !== undefined || invitesCount !== undefined;
  const calculatedUsedSeats = (usersCount || 0) + (invitesCount || 0);
  
  // Priority: 
  // 1. Explicitly provided counts (most reactive)
  // 2. Backend metrics users_count (next best)
  // 3. Backend quota used_users (baseline)
  const usedSeats = hasExternalCounts 
    ? Math.max(calculatedUsedSeats, quota.used_users) // Safety: take max of calculated or backend quota
    : (company.metrics?.users_count || quota.used_users || 0);
  
  const isUnlimited = currentPlan === 'enterprise' || currentPlan === 'unlimited' || maxSeats >= 999999 || maxSeats === null;
  const safeMaxSeats = maxSeats || 1; // Prevent division by zero
  const seatsPercentage = isUnlimited ? 0 : Math.min((usedSeats / safeMaxSeats) * 100, 100) || 0;
  const isLimitReached = !isUnlimited && usedSeats >= maxSeats;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-sm transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Plan Info Section */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ccab59]/10 flex items-center justify-center text-[#ccab59]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-none mb-1">Company Subscription</h3>
                <p className="text-xl font-black text-slate-900 dark:text-white capitalize tracking-tight">
                  {currentPlan} <span className="text-slate-400 font-medium">Tier</span>
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Team Capacity</p>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{usedSeats}</span>
                <span className="text-sm font-bold text-slate-400">/ {isUnlimited ? '∞' : maxSeats}</span>
              </div>
            </div>
          </div>

          {!isUnlimited && (
            <div className="space-y-2">
              <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ease-out rounded-full ${
                    isLimitReached ? 'bg-red-500' : 'bg-[#ccab59]'
                  }`}
                  style={{ width: `${seatsPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {isLimitReached ? 'Limit reached - Upgrade required' : 'Utilization of current quota'}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isLimitReached ? 'text-red-500' : 'text-[#ccab59]'}`}>
                  {Math.round(seatsPercentage)}% Used
                </p>
              </div>
            </div>
          )}

          {isUnlimited && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Unlimited Growth Capacity</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button Segment */}
        {isSuperadmin && (
          <div className="shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 md:pl-8 flex flex-col gap-2 justify-center">
            <Button 
                onClick={onOpenChangePlan}
                className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold px-6 h-11 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
                Modify Tier
            </Button>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Superadmin Access</p>
          </div>
        )}
      </div>

      {isLimitReached && (
        <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/5 rounded-2xl border border-red-100 dark:border-red-500/10 animate-in fade-in zoom-in-95">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-xs font-bold text-red-600 dark:text-red-400">
            Enterprise limit reached. Please modify the subscription tier to allow more team members.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanUsageCard;
