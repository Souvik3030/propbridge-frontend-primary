import React from 'react';
import { FormLabel } from './FormControls';

const FormSection = ({ title, subtitle, children }) => (
  <div className="bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-[2rem] p-8 mb-2 shadow-sm">
    <div className="mb-6">
      <h2 className="text-[20px] font-black text-slate-900 dark:text-white leading-tight">{title}</h2>
      {subtitle && <p className="text-[12px] text-slate-400 mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default FormSection;
