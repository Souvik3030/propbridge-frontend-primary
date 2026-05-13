import React from 'react';
import { MapPin } from 'lucide-react';

export const UAE_EMIRATES = [
  { id: 1, label: 'Dubai',            slug: 'dubai' },
  { id: 2, label: 'Abu Dhabi',        slug: 'abu_dhabi' },
  { id: 3, label: 'Sharjah',          slug: 'sharjah' },
  { id: 4, label: 'Ajman',            slug: 'ajman' },
  { id: 5, label: 'Ras Al Khaimah',   slug: 'ras_al_khaimah' },
  { id: 6, label: 'Fujairah',         slug: 'fujairah' },
  { id: 7, label: 'Umm Al Quwain',    slug: 'umm_al_quwain' },
];

export const emirateSlugToId = (slug) => {
  if (!slug) return '';
  const normalized = slug.toLowerCase().trim().replace(/\s+/g, '_');
  const match = UAE_EMIRATES.find(
    (e) => e.slug === normalized || e.slug.replace('_', ' ') === slug.toLowerCase().trim()
  );
  return match?.id || '';
};

const EmirateSelect = ({ value, onChange, error }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700 dark:text-slate-300 ml-1">
        <MapPin size={14} className="text-[#ccab59]" />
        Emirate <span className="text-red-500">*</span>
      </label>

      <div className="relative group">
        <select
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full h-[48px] px-4 rounded-xl text-[14px] font-medium appearance-none
            bg-white dark:bg-[#111827] border transition-all duration-200 outline-none
            ${error
              ? 'border-red-500/50 ring-2 ring-red-500/10'
              : 'border-[#ece7d9] dark:border-slate-800 hover:border-[#ccab59] focus:border-[#ccab59] focus:ring-4 focus:ring-[#ccab59]/10'
            }
            dark:text-white
          `}
          required
        >
          <option value="">-- Select Emirate --</option>
          {UAE_EMIRATES.map((em) => (
            <option key={em.id} value={em.id}>
              {em.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-[#ccab59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && <p className="text-[11px] text-red-500 ml-1 font-medium">{error}</p>}
    </div>
  );
};

export default EmirateSelect;
