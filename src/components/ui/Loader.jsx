import React from 'react';

const Loader = ({ fullPage = false, size = 'md', text = 'Loading projects...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const containerClasses = fullPage 
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center py-20 w-full';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer Ring */}
        <div 
          className={`${sizeClasses[size]} rounded-full border-slate-200 dark:border-slate-800 border-t-primary-600 dark:border-t-primary-500 animate-spin`}
        />
        
        {/* Inner Glow */}
        <div className="absolute inset-0 rounded-full blur-[8px] opacity-20 bg-primary-500 animate-pulse" />
      </div>

      {text && (
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
