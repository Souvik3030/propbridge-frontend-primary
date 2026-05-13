import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { Button } from '../../ui/Button';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic Tier',
    seats: 5,
    description: 'Foundation for emerging real estate teams.'
  },
  {
    id: 'pro',
    name: 'Pro Tier',
    seats: 25,
    description: 'Advanced features for high-volume brokerages.'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    seats: 'Unlimited',
    description: 'Bespoke solution for global enterprises.'
  }
];

const ChangePlanModal = ({ isOpen, onClose, currentPlan, onUpdate, isUpdating }) => {
  const normalizedCurrentPlan = (currentPlan || 'basic').toLowerCase();
  const [selectedPlan, setSelectedPlan] = useState(normalizedCurrentPlan);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xl transition-all duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white dark:border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccab59]/10 blur-[100px] rounded-full -mr-48 -mt-48 pointer-events-none" />
        
        <div className="px-10 py-12">
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-2 text-[#ccab59] mb-2 leading-none">
                <ShieldCheck className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Administrative Control</span>
              </div>
              <h2 className="text-3xl font-serif font-black italic tracking-tight text-slate-900 dark:text-white">
                Modify Tier <span className="text-slate-400 font-normal not-italic ml-2">Subscription</span>
              </h2>
            </div>
            
            <button 
              onClick={onClose}
              className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-10">
            {PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isCurrent = normalizedCurrentPlan === plan.id;
              
              return (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'border-[#ccab59] bg-[#ccab59]/5 shadow-lg shadow-[#ccab59]/5' 
                      : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                       isSelected ? 'bg-[#ccab59] text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                    }`}>
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none capitalize">{plan.name}</h3>
                            {isCurrent && (
                                <span className="text-[9px] font-black uppercase text-[#ccab59] bg-[#ccab59]/10 px-2 py-0.5 rounded-md border border-[#ccab59]/20">Current Tier</span>
                            )}
                        </div>
                        <p className="text-xs font-bold text-slate-400 mt-1">{plan.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-black text-slate-900 dark:text-white leading-none capitalize">
                          {plan.seats}
                        </p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Capacity</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-[#ccab59] bg-[#ccab59]' : 'border-slate-200 dark:border-white/10'
                    }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-6 pt-10 border-t border-slate-100 dark:border-white/5">
            <button 
              onClick={onClose}
              className="text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Cancel Request
            </button>
            <Button 
                onClick={() => onUpdate(selectedPlan)}
                disabled={selectedPlan === normalizedCurrentPlan || isUpdating}
                loading={isUpdating}
                className="bg-[#ccab59] hover:bg-[#b0944d] text-white font-black uppercase tracking-widest text-[10px] h-12 px-10 rounded-xl shadow-xl shadow-[#ccab59]/20 transition-all hover:scale-[1.02]"
            >
                Confirm Plan Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePlanModal;
