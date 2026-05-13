import React from 'react';
import { Star, ShieldCheck, Building2, BarChart3 } from 'lucide-react';

const WhyDubai = () => {
  const reasons = [
    {
      title: "Golden Visa",
      description: "10-year residency via AED 2M+ property investment",
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Tax Free",
      description: "Zero income tax, zero capital gains tax on property",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Infrastructure",
      description: "World-class metro, airports, smart city connectivity",
      icon: <Building2 className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "High ROI",
      description: "Average 6-8% rental yields across prime areas",
      icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <section className="mb-12">
      {/* Header with the specific gold accent bar */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-[3px] h-6 bg-[#b89146]"></div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-serif">
          Why Dubai
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden bg-white dark:bg-[#111827] p-8 rounded-2xl border border-[#ece7d9] dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
          >
            {/* The subtle decorative circle in the top right corner */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50/50 dark:bg-slate-800/30 rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Icon Container - Soft Square */}
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.bgColor} mb-6`}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyDubai;