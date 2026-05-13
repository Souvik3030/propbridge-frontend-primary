import React, { useState, useMemo } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { MOCK_PROJECTS } from '../../../data/mockData';

// Derive unique developers and areas from data
const DEVELOPERS = [...new Set(MOCK_PROJECTS.map(p => p.d).filter(Boolean))].sort();
const AREAS      = [...new Set(MOCK_PROJECTS.map(p => p.ci).filter(Boolean))].sort();

const PRICE_CHIPS = [
  { label: 'Under 500K',  min: 0,         max: 500000 },
  { label: '500K–1M',     min: 500000,    max: 1000000 },
  { label: '1M–2M',       min: 1000000,   max: 2000000 },
  { label: '2M–5M',       min: 2000000,   max: 5000000 },
  { label: '5M–10M',      min: 5000000,   max: 10000000 },
  { label: '10M+',        min: 10000000,  max: Infinity },
];
const AREA_CHIPS = [
  { label: 'Studio (<500)',   min: 0,    max: 500 },
  { label: '1BR (500–800)',   min: 500,  max: 800 },
  { label: '2BR (800–1200)',  min: 800,  max: 1200 },
  { label: '3BR+ (1200+)',    min: 1200, max: Infinity },
];
const BED_OPTIONS     = ['Studio', '1', '2', '3', '4', '5+'];
const PROP_TYPES      = ['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Hotel Apartments', 'Duplexes', 'Commercial'];
const HANDOVER_YEARS  = ['Ready Now', '2025', '2026', '2027', '2028+'];
const INV_SCORES      = [{ label: 'Excellent (90+)', min: 90 }, { label: 'Great (80+)', min: 80 }, { label: 'Good (70+)', min: 70 }];
const YIELD_OPTIONS   = ['5%+', '7%+', '10%+'];
const STATUS_OPTIONS  = ['All', 'Under Construction', 'Completed'];

// ── Chip helper ──────────────────────────────────────────────
const Chip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl border text-[12px] font-bold transition-all ${
      active
        ? 'bg-[#ccab59] text-white border-[#ccab59]'
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#ccab59] hover:text-[#a38847]'
    }`}
  >
    {label}
  </button>
);

// ── Section Header ───────────────────────────────────────────
const Section = ({ title, children }) => (
  <div className="mb-7">
    <h3 className="text-[13px] font-black text-slate-800 dark:text-white mb-3 uppercase tracking-wide">{title}</h3>
    {children}
  </div>
);

// ── Dropdown ─────────────────────────────────────────────────
const Dropdown = ({ value, onChange, options, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[13px] text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#ccab59] appearance-none cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const EMPTY = {
  priceChips: [], priceMin: '', priceMax: '',
  areaChips: [], areaMin: '', areaMax: '',
  beds: [],
  location: '', developer: '',
  propTypes: [], handoverYears: [],
  investScore: '', yield: '',
  status: 'All',
};

const AdvancedFiltersDrawer = ({ open, onClose, onApply }) => {
  const [f, setF] = useState(EMPTY);

  const toggle = (key, val) =>
    setF(prev => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter(x => x !== val) : [...prev[key], val],
    }));

  const set = (key, val) => setF(prev => ({ ...prev, [key]: val }));

  const reset = () => setF(EMPTY);

  const apply = () => {
    onApply(f);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-50 w-[260px] bg-white dark:bg-[#0f1623] border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <div>
            <h2 className="text-[18px] font-black text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#ccab59]" /> Advanced Filters
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Refine your search</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 mt-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {/* Price Range */}
          <Section title="Price Range (AED)">
            <div className="flex flex-wrap gap-2 mb-3">
              {PRICE_CHIPS.map(c => (
                <Chip key={c.label} label={c.label} active={f.priceChips.includes(c.label)} onClick={() => toggle('priceChips', c.label)} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Min" value={f.priceMin} onChange={e => set('priceMin', e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[12px] bg-white dark:bg-slate-800 text-slate-700 dark:text-white focus:outline-none focus:border-[#ccab59]" />
              <input type="number" placeholder="Max" value={f.priceMax} onChange={e => set('priceMax', e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[12px] bg-white dark:bg-slate-800 text-slate-700 dark:text-white focus:outline-none focus:border-[#ccab59]" />
            </div>
          </Section>

          {/* Area sqft */}
          <Section title="Area (sqft)">
            <div className="flex flex-wrap gap-2 mb-3">
              {AREA_CHIPS.map(c => (
                <Chip key={c.label} label={c.label} active={f.areaChips.includes(c.label)} onClick={() => toggle('areaChips', c.label)} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Min sqft" value={f.areaMin} onChange={e => set('areaMin', e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[12px] bg-white dark:bg-slate-800 text-slate-700 dark:text-white focus:outline-none focus:border-[#ccab59]" />
              <input type="number" placeholder="Max sqft" value={f.areaMax} onChange={e => set('areaMax', e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[12px] bg-white dark:bg-slate-800 text-slate-700 dark:text-white focus:outline-none focus:border-[#ccab59]" />
            </div>
          </Section>

          {/* Bedrooms */}
          <Section title="Bedrooms">
            <div className="flex flex-wrap gap-2">
              {BED_OPTIONS.map(b => (
                <Chip key={b} label={b} active={f.beds.includes(b)} onClick={() => toggle('beds', b)} />
              ))}
            </div>
          </Section>

          {/* Location */}
          <Section title="Location">
            <Dropdown value={f.location} onChange={v => set('location', v)} options={AREAS} placeholder="Select Areas" />
          </Section>

          {/* Developer */}
          <Section title="Developer">
            <Dropdown value={f.developer} onChange={v => set('developer', v)} options={DEVELOPERS} placeholder="Select Developers" />
          </Section>

          {/* Property Type */}
          <Section title="Property Type">
            <div className="flex flex-wrap gap-2">
              {PROP_TYPES.map(t => (
                <Chip key={t} label={t} active={f.propTypes.includes(t)} onClick={() => toggle('propTypes', t)} />
              ))}
            </div>
          </Section>

          {/* Handover Year */}
          <Section title="Handover Year">
            <div className="flex flex-wrap gap-2">
              {HANDOVER_YEARS.map(y => (
                <Chip key={y} label={y} active={f.handoverYears.includes(y)} onClick={() => toggle('handoverYears', y)} />
              ))}
            </div>
          </Section>

          {/* Investment Score */}
          <Section title="Investment Score">
            <div className="flex flex-wrap gap-2">
              {INV_SCORES.map(s => (
                <Chip key={s.label} label={s.label} active={f.investScore === s.label} onClick={() => set('investScore', f.investScore === s.label ? '' : s.label)} />
              ))}
            </div>
          </Section>

          {/* Estimated Yield */}
          <Section title="Estimated Yield">
            <div className="flex flex-wrap gap-2">
              {YIELD_OPTIONS.map(y => (
                <Chip key={y} label={y} active={f.yield === y} onClick={() => set('yield', f.yield === y ? '' : y)} />
              ))}
            </div>
          </Section>

          {/* Completion Status */}
          <Section title="Completion Status">
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(s => (
                <Chip key={s} label={s} active={f.status === s} onClick={() => set('status', s)} />
              ))}
            </div>
          </Section>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 px-5 py-5 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
          <button
            onClick={apply}
            className="flex-1 py-3 bg-[#ccab59] text-white rounded-xl font-black text-[13px] hover:bg-[#b0934c] transition-colors shadow-sm"
          >
            Apply Filters
          </button>
          <button
            onClick={reset}
            className="py-3 px-4 border border-slate-200 dark:border-slate-700 text-[#ccab59] rounded-xl font-bold text-[13px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </>
  );
};

export default AdvancedFiltersDrawer;
