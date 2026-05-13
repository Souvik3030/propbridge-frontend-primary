  import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../ui/Card';
import { useToast } from '../../../../../context/ToastContext';


export function MortgageEstimatorCard({ price }) {
  const { addToast } = useToast();
  const baseMortgage = price ? Math.round((price * 0.8) * 0.045 / 12) : 25000;
  
  const estimators = [
    { 
      down: '20% Down', 
      years: '20yr', 
      monthly: `AED ${(baseMortgage * 1.2).toLocaleString()}/mo`, 
      downAmt: `Down: AED ${(price * 0.2).toLocaleString()}`, 
      color: 'text-[#8b5cf6]', 
      bg: 'bg-[#faf5ff]', 
      border: 'border-[#f3e8ff]' 
    },
    { 
      down: '20% Down', 
      years: '25yr', 
      monthly: `AED ${baseMortgage.toLocaleString()}/mo`, 
      downAmt: `Down: AED ${(price * 0.2).toLocaleString()}`, 
      color: 'text-[#3b82f6]', 
      bg: 'bg-[#eff6ff]', 
      border: 'border-[#dbeafe]' 
    },
    { 
      down: '25% Down', 
      years: '25yr', 
      monthly: `AED ${(baseMortgage * 0.9).toLocaleString()}/mo`, 
      downAmt: `Down: AED ${(price * 0.25).toLocaleString()}`, 
      color: 'text-[#10b981]', 
      bg: 'bg-[#ecfdf5]', 
      border: 'border-[#d1fae5]' 
    }
  ];

  return (
    <Card className="p-8 shadow-sm">
      <h3 className="text-[16px] font-bold text-[#8b5cf6] mb-6">Mortgage Estimator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {estimators.map((est, i) => (
          <div 
            key={i} 
            className={`rounded-xl py-6 px-4 border text-center flex flex-col items-center justify-center ${est.bg} ${est.border} dark:bg-slate-800/50 dark:border-slate-700`}
          >
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-1">
              {est.down} · {est.years}
            </span>
            <span className={`text-[19px] font-bold ${est.color} mb-1 tracking-tight`}>
              {est.monthly}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {est.downAmt}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          4.5% rate · Indicative only
        </p>
        <button 
          onClick={() => addToast("Custom mortgage calculation is coming soon!", "info")}
          className="text-[12px] font-bold text-[#8b5cf6] hover:underline"
        >
          Calculate More →
        </button>
      </div>
    </Card>
  );
}
