import React from 'react';
import { Card } from '../../../ui/Card';

const formatPrice = (p) => {
  if (!p) return 'AED 0';
  return `AED ${Math.round(p).toLocaleString()}`;
};

export default function PaymentTab({ project }) {
  if (!project) return null;

  const pp = project.paymentPlan && project.paymentPlan[0] ? project.paymentPlan[0] : null;
  const downPayment = pp?.downPayment || 0;
  const duringConst = pp?.preHandover || 0;
  const onHandover = pp?.handover || 0;

  const price = project.price || 0;
  const commission = price * 0.02;     // 2% Commission
  const adminFee = 580;                // Fixed Admin Fee
  const dldFee = price * 0.04;         // 4% DLD Fee
  const trusteeFee = 4200;             // Fixed Trustee Fee
  
  const total = price + commission + adminFee + dldFee + trusteeFee;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Payment Plans Card */}
      <Card className="p-6">
        <h3 className="text-[15px] font-bold text-[#ccab59] mb-4">Payment Plans</h3>
        <div className="bg-[#fdfbf6] dark:bg-slate-800/50 rounded-xl p-5 border border-[#ece7d9] dark:border-slate-700/50">
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-[13px]">
              <span className="w-56 text-slate-500 dark:text-slate-400 font-medium tracking-tight">Down Payment: <span className="font-bold text-slate-800 dark:text-white">{downPayment}%</span></span>
            </div>
            <div className="flex items-center text-[13px]">
              <span className="w-56 text-slate-500 dark:text-slate-400 font-medium tracking-tight">During Construction: <span className="font-bold text-slate-800 dark:text-white">{duringConst}%</span></span>
            </div>
            <div className="flex items-center text-[13px]">
              <span className="w-56 text-slate-500 dark:text-slate-400 font-medium tracking-tight">On Handover: <span className="font-bold text-slate-800 dark:text-white">{onHandover}%</span></span>
            </div>
          </div>
        </div>
      </Card>

      {/* DLD Cost Breakdown Card */}
      <Card className="p-6">
        <h3 className="text-[15px] font-bold text-[#ccab59] mb-4">DLD Cost Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-[#fdfbf6] dark:bg-slate-800/50 px-4 py-3 rounded-lg text-[13px] border border-[#ece7d9]/50 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Property Price</span>
              <span className="font-bold text-slate-800 dark:text-white">{formatPrice(price)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#fdfbf6] dark:bg-slate-800/50 px-4 py-3 rounded-lg text-[13px] border border-[#ece7d9]/50 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Commission (2%)</span>
              <span className="font-bold text-slate-800 dark:text-white">{formatPrice(commission)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#fdfbf6] dark:bg-slate-800/50 px-4 py-3 rounded-lg text-[13px] border border-[#ece7d9]/50 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Admin Fee</span>
              <span className="font-bold text-slate-800 dark:text-white">{formatPrice(adminFee)}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-[#fdfbf6] dark:bg-slate-800/50 px-4 py-3 rounded-lg text-[13px] border border-[#ece7d9]/50 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400 font-medium">DLD Fee (4%)</span>
              <span className="font-bold text-slate-800 dark:text-white">{formatPrice(dldFee)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#fdfbf6] dark:bg-slate-800/50 px-4 py-3 rounded-lg text-[13px] border border-[#ece7d9]/50 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Trustee Fee</span>
              <span className="font-bold text-slate-800 dark:text-white">{formatPrice(trusteeFee)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#fdfbf6] dark:bg-slate-800/50 px-4 py-3 rounded-lg text-[13px] border border-[#ece7d9]/50 dark:border-transparent">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Total</span>
              <span className="font-bold text-[#ccab59]">{formatPrice(total)}</span>
            </div>
          </div>

        </div>
      </Card>

    </div>
  );
}
