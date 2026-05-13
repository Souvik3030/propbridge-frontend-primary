import React, { useEffect } from 'react';
import { useToast } from '../../context/ToastContext';

export default function ComingSoonPage({ label }) {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center py-32 text-slate-400 dark:text-slate-500">
      <p className="text-2xl font-serif font-bold mb-2 text-slate-600 dark:text-slate-300 capitalize">
        {label}
      </p>
      <p className="text-sm">This section is coming soon.</p>
    </div>
  );
}
