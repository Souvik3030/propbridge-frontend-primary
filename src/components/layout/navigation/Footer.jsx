import React from 'react';

const Footer = () => {
    // This dynamically gets the current year from the system clock
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#fdfcf9] dark:bg-[#0a0d18] border-t border-[#ece7d9] dark:border-slate-800/60 py-6 px-4 md:px-8 transition-colors mt-auto">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center">
                
                {/* Footer Text Content */}
                <div className="flex items-center flex-wrap justify-center gap-1.5 text-[13px] tracking-wide text-slate-500 dark:text-slate-500 font-medium">
                    {/* Render the dynamic year here */}
                    <span>© {currentYear}</span>

                    {/* Brand Name in Gold with wide letter spacing */}
                    <span className="text-[#ccab59] font-bold mx-1 tracking-[0.15em]">
                        VORTEXWEB
                    </span>

                    <span className="opacity-60">·</span>

                    <span>Real Estate Intelligence</span>

                    <span className="opacity-60">·</span>

                    <span>v1.0</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;