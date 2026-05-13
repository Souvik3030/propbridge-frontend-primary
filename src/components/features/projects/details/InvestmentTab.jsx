import React from 'react';

export default function InvestmentTab({ project }) {
  if (!project) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Rental Data Message - Minimal, matching screenshot */}
      <div className="flex items-center justify-center py-10">
        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
          No rental data available for this area.
        </p>
      </div>

      <MortgageEstimatorCard price={project.price} />
    </div>
  );
}

import { Card } from '../../../ui/Card';

export function MortgageEstimatorCard({ price }) {
  const baseMortgage = price ? Math.round((price * 0.8) * 0.045 / 12) : 25000;
  
  const estimators = [
    { 
      down: '20% Down', 
      years: '20yr', 
      monthly: `AED ${(baseMortgage * 1.2).toLocaleString()}/mo`, 
      downAmt: `Down: AED ${(price * 0.2).toLocaleString()}`, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50/50', 
      border: 'border-purple-100' 
    },
    { 
      down: '20% Down', 
      years: '25yr', 
      monthly: `AED ${baseMortgage.toLocaleString()}/mo`, 
      downAmt: `Down: AED ${(price * 0.2).toLocaleString()}`, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50/50', 
      border: 'border-blue-100' 
    },
    { 
      down: '25% Down', 
      years: '25yr', 
      monthly: `AED ${(baseMortgage * 0.9).toLocaleString()}/mo`, 
      downAmt: `Down: AED ${(price * 0.25).toLocaleString()}`, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50/50', 
      border: 'border-emerald-100' 
    }
  ];

  return (
    <Card className="p-8">
      <h3 className="text-[16px] font-bold text-purple-500 mb-6">Mortgage Estimator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {estimators.map((est, i) => (
          <div 
            key={i} 
            className={`rounded-xl p-6 border text-center flex flex-col items-center justify-center transition-all hover:shadow-md ${est.bg} ${est.border} dark:bg-slate-800/50`}
          >
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-2">
              {est.down} · {est.years}
            </span>
            <span className={`text-[20px] font-black ${est.color} dark:${est.color.replace('600', '400')} mb-1`}>
              {est.monthly}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {est.downAmt}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-6 mt-6">
        4.5% rate · Indicative only
      </p>
    </Card>
  );
}
