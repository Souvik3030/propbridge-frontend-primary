import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../ui/Card';

export function PaymentPlansCard({ paymentPlans }) {
  const pp = paymentPlans && paymentPlans[0] ? paymentPlans[0] : null;
  const downPayment = pp?.downPayment || 0;
  const duringConst = pp?.preHandover || 0;
  const onHandover = pp?.handover || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 rounded-xl p-5 border border-[#ece7d9] dark:border-slate-700/50">
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-sm">
              <span className="w-40 text-slate-500 dark:text-slate-400">Down Payment:</span>
              <span className="font-bold text-slate-900 dark:text-white">{downPayment}%</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-40 text-slate-500 dark:text-slate-400">During Construction:</span>
              <span className="font-bold text-slate-900 dark:text-white">{duringConst}%</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-40 text-slate-500 dark:text-slate-400">On Handover:</span>
              <span className="font-bold text-slate-900 dark:text-white">{onHandover}%</span>
            </div>
            {pp?.postHandover > 0 && (
              <div className="flex items-center text-sm mt-2 pt-2 border-t border-[#ece7d9] dark:border-slate-700/50">
                <span className="w-40 text-slate-500 dark:text-slate-400">Post Handover:</span>
                <span className="font-bold text-slate-900 dark:text-white">{pp.postHandover}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
