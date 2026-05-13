import React from 'react';

const VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  gold: 'bg-[#ccab59] hover:bg-[#b0934c] text-white',
  goldOutline: 'bg-transparent border border-[#ccab59] text-[#ccab59] hover:bg-[#ccab59]/10',
  outline: 'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
  developerPdf: 'border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
};

const SIZES = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2 px-4 text-sm',
  lg: 'py-2.5 px-5 text-sm',
  icon: 'w-8 h-8 p-0', 
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  icon: Icon,
  href,
  target,
  rel,
  loading = false,
  disabled,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-95';
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;
  const sizeClasses = SIZES[size] || SIZES.md;
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  const content = (
    <>
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses} 
        target={target} 
        rel={rel} 
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={combinedClasses} 
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
