import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useSystemPlans } from '../../../hooks/useAdmin';


const ChangePlanModal = ({ isOpen, onClose, currentPlan, onUpdate, isUpdating }) => {
  const { data: plansData, isLoading: plansLoading } = useSystemPlans();
  const normalizedCurrentPlan = (currentPlan || 'basic').toLowerCase();
  const [selectedPlan, setSelectedPlan] = useState(normalizedCurrentPlan);

  if (!isOpen) return null;

  // Map the API object { basic: { max_users: 5 }, ... } to a display-friendly array
  const PLANS = Object.entries(plansData?.data || {}).map(([id, details]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    seats: details.max_users >= 999999 ? 'Unlimited' : details.max_users,
    description: details.max_users >= 999999 
      ? 'Full-scale solution for global teams.' 
      : details.max_users >= 25 
      ? 'Advanced administration for growth.' 
      : 'Essential features for emerging teams.'
  }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Assign Subscription</h2>
            <p className="text-xs font-bold text-slate-400 mt-1">Select the operational tier for this entity</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan List Group */}
        <div className="p-4 space-y-2 min-h-[300px] flex flex-col">
          {plansLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-[#ccab59]" />
                <p className="text-[10px] font-black uppercase tracking-widest">Fetching tiers...</p>
            </div>
          ) : (
            PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isCurrent = normalizedCurrentPlan === plan.id;
              
              return (
                <button 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full group relative p-5 rounded-2xl transition-all duration-200 flex items-center justify-between text-left border ${
                    isSelected 
                      ? 'border-[#ccab59] bg-[#ccab59]/5' 
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-8 rounded-full transition-all ${
                      isSelected ? 'bg-[#ccab59]' : 'bg-slate-100 dark:bg-white/10'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-900 dark:text-white capitalize">{plan.name}</span>
                          {isCurrent && (
                              <span className="text-[8px] font-black uppercase text-[#ccab59] tracking-widest bg-[#ccab59]/10 px-1.5 py-0.5 rounded">Active</span>
                          )}
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">{plan.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                      <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{plan.seats}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Seats</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-white/5 flex items-center justify-end gap-4">
          <button 
            onClick={onClose}
            className="text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <Button 
              onClick={() => onUpdate(selectedPlan)}
              disabled={selectedPlan === normalizedCurrentPlan || isUpdating || plansLoading}
              loading={isUpdating}
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold px-8 h-10 rounded-xl text-xs transition-all active:scale-[0.98]"
          >
              Update Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePlanModal;
