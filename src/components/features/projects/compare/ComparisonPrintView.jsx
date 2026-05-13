import React from 'react';
import TableTab from './TableTab';
import RadarTab from './RadarTab';
import ScoringTab from './ScoringTab';

const ComparisonPrintView = ({ projects }) => (
  <div className="print-only-view p-12 bg-white text-slate-900 font-sans">
    {/* Page Header */}
    <div className="mb-16 pb-8 border-b-2 border-[#ccab59]/20 flex flex-col items-center">
      <div className="w-24 h-24 mb-6 bg-[#ccab59] rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-xl">
        VW
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Project Comparison Report</h1>
      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[12px]">
        Generated on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>

    {/* Metric Comparison Table */}
    <section className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1.5 bg-[#ccab59] rounded-full" />
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Feature-by-Feature Comparison</h2>
      </div>
      <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
         <TableTab projects={projects} />
      </div>
    </section>

    <div className="page-break" style={{ pageBreakBefore: 'always', height: '1px' }} />

    {/* Visual Analysis Section */}
    <section className="mb-20 pt-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1.5 bg-blue-500 rounded-full" />
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Market Positioning & Scores</h2>
      </div>
      <div className="text-slate-500 text-[14px] mb-8 font-medium leading-relaxed max-w-2xl">
        The following radar analysis compares these projects across six critical investment dimensions including yield potential, location value, and developer reputation.
      </div>
      <RadarTab projects={projects} />
    </section>

    <div className="page-break" style={{ pageBreakBefore: 'always', height: '1px' }} />

    {/* Scoring Section */}
    <section className="pt-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1.5 bg-emerald-500 rounded-full" />
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Weighted Match Analysis</h2>
      </div>
      <div className="text-slate-500 text-[14px] mb-8 font-medium leading-relaxed max-w-2xl">
        Our proprietary weighted scoring algorithm evaluates project suitability based on standard market preferences for price, size, and location.
      </div>
      <ScoringTab projects={projects} />
    </section>

    {/* Footer */}
    <div className="mt-32 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
       <span>VortexWeb Real Estate Intelligence</span>
       <span>Confidential Comparison Report</span>
       <span>Page 1 of 3</span>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      @media print {
        .print-only-view { width: 100% !important; margin: 0 !important; padding: 1.5cm !important; }
        .page-break { page-break-before: always !important; display: block !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
    `}} />
  </div>
);

export default ComparisonPrintView;
