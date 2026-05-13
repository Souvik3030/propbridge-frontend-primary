import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FormLabel = ({ label, required }) => (
  <label className="block text-[12px] font-bold text-slate-400 dark:text-[#576273] uppercase tracking-wider mb-2">
    {label} {required && <span className="text-red-500">*</span>}
  </label>
);

export const FormInput = ({ label, required, dir, error, ...props }) => (
  <div className="flex flex-col">
    {label && <FormLabel label={label} required={required} />}
    <input
      dir={dir}
      className={`px-4 py-3 bg-white dark:bg-[#111827] border rounded-xl text-[14px] text-slate-700 dark:text-white focus:outline-none transition-colors ${
        error 
          ? 'border-red-500 focus:border-red-500' 
          : 'border-[#ece7d9] dark:border-slate-800 focus:border-[#ccab59]'
      }`}
      {...props}
    />
    {error && <span className="mt-1.5 text-[11px] font-bold text-red-500 animate-in fade-in slide-in-from-top-1">{error}</span>}
  </div>
);

export const FormSelect = ({ label, required, options, error, ...props }) => (
  <div className="flex flex-col relative">
    {label && <FormLabel label={label} required={required} />}
    <div className="relative">
      <select
        className={`w-full px-4 py-3 bg-white dark:bg-[#111827] border rounded-xl text-[14px] text-slate-700 dark:text-white focus:outline-none transition-colors appearance-none cursor-pointer ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-[#ece7d9] dark:border-slate-800 focus:border-[#ccab59]'
        }`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${error ? 'text-red-400' : 'text-slate-400'}`} />
    </div>
    {error && <span className="mt-1.5 text-[11px] font-bold text-red-500 animate-in fade-in slide-in-from-top-1">{error}</span>}
  </div>
);

export const FormTextArea = ({ label, required, dir, error, ...props }) => (
  <div className="flex flex-col">
    {label && <FormLabel label={label} required={required} />}
    <textarea
      dir={dir}
      className={`px-4 py-3 bg-white dark:bg-[#111827] border rounded-xl text-[14px] text-slate-700 dark:text-white focus:outline-none transition-colors min-h-[120px] resize-y ${
        error 
          ? 'border-red-500 focus:border-red-500' 
          : 'border-[#ece7d9] dark:border-slate-800 focus:border-[#ccab59]'
      }`}
      {...props}
    />
    {error && <span className="mt-1.5 text-[11px] font-bold text-red-500 animate-in fade-in slide-in-from-top-1">{error}</span>}
  </div>
);

export const FormCheckbox = ({ label, id, ...props }) => (
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      id={id}
      className="w-4 h-4 rounded border-[#ece7d9] text-[#ccab59] focus:ring-[#ccab59]"
      {...props}
    />
    {label && (
      <label htmlFor={id} className="text-[14px] font-bold text-slate-700 dark:text-white cursor-pointer">
        {label}
      </label>
    )}
  </div>
);

export const FormRadio = ({ label, name, id, checked, ...props }) => (
  <label 
    htmlFor={id} 
    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
      checked 
        ? 'bg-[#faf8f2] dark:bg-[#ccab59]/10 border-[#ccab59] ring-1 ring-[#ccab59]' 
        : 'bg-white dark:bg-[#111827] border-[#ece7d9] dark:border-slate-800 hover:border-[#ccab59]'
    }`}
  >
    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
      checked ? 'border-[#ccab59] bg-[#ccab59]' : 'border-slate-300 dark:border-slate-600'
    }`}>
      {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
    </div>
    <input
      type="radio"
      name={name}
      id={id}
      className="hidden"
      checked={checked}
      {...props}
    />
    <span className="text-[14px] font-bold text-slate-700 dark:text-white">{label}</span>
  </label>
);
