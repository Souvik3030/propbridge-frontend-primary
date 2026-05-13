import React from 'react';

export function Card({ className = '', children, ...props }) {
  return (
    <div 
      className={`bg-white dark:bg-[#111827] rounded-xl shadow-sm border border-[#ece7d9] dark:border-slate-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`p-5 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={`text-[14px] font-bold text-[#ccab59] ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-5 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
