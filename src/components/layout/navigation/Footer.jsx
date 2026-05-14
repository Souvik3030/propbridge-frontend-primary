import React from 'react';

const Footer = () => {
    // This dynamically gets the current year from the system clock
    const currentYear = new Date().getFullYear();

    return (
        <footer className="h-10 w-full flex items-center justify-center border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0e1a] transition-colors mt-auto px-4">
            <span className="text-[11px] text-slate-400 dark:text-[#4d5a78] tracking-[0.02em] font-medium transition-colors">
                © {currentYear} <span className="text-[#a38847] dark:text-[#c9a84c] font-serif font-bold tracking-[2px] mx-1">VORTEXWEB</span> · Real Estate Intelligence · V.1.0
            </span>
        </footer>
    );
};

export default Footer;