import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { useProjects } from '../../../context/ProjectContext';
import { useToast } from '../../../context/ToastContext';

// Modular Components
import TableTab from './compare/TableTab';
import RadarTab from './compare/RadarTab';
import ScoringTab from './compare/ScoringTab';
import ExportTab from './compare/ExportTab';
import ComparisonPrintView from './compare/ComparisonPrintView';

const TABS = ['Table', 'Radar', 'Scoring', 'Export'];

const CompareModal = ({ onClose }) => {
  const { compareList } = useProjects();
  const [activeTab, setActiveTab] = useState('Table');

  if (compareList.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center pt-8 px-4 pb-4 overflow-auto compare-modal-portal animate-in fade-in duration-300">
      <div className="w-full max-w-5xl bg-white dark:bg-[#111827] rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] screen-only-modal border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccab59]/5 -rotate-45 translate-x-32 -translate-y-32 rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-slate-100 dark:border-slate-800/50 flex-shrink-0 no-print compare-header z-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-[24px] font-black text-slate-900 dark:text-white tracking-tight">
              Project Comparison
            </h2>
            <div className="flex items-center gap-2">
               <span className="px-2 py-0.5 rounded-md bg-[#ccab59]/10 text-[#ccab59] text-[10px] font-bold uppercase tracking-widest">{compareList.length} Selected Items</span>
               <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold">VW Intelligence Dashboard</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-10 py-6 border-b border-slate-100 dark:border-slate-800/50 flex-shrink-0 no-print compare-tabs z-10">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-xl text-[13px] font-black transition-all ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-800 text-[#ccab59] shadow-md'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area for Screen */}
        <div className="flex-1 overflow-auto py-2 no-print custom-scrollbar">
          {activeTab === 'Table'   && <TableTab   projects={compareList} />}
          {activeTab === 'Radar'   && <RadarTab   projects={compareList} />}
          {activeTab === 'Scoring' && <ScoringTab projects={compareList} />}
          {activeTab === 'Export'  && <ExportTab  projects={compareList} />}
        </div>
      </div>

      {/* Dedicated Print View (Hidden on screen) */}
      <div className="hidden-print-v">
        <ComparisonPrintView projects={compareList} />
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hidden-print-v { display: none; }
        @media print {
          /* Hide everything except our dedicated print view */
          body > *:not(.compare-modal-portal) { display: none !important; }
          .screen-only-modal, .no-print { display: none !important; }
          
          .compare-modal-portal { 
            position: static !important; 
            display: block !important; 
            background: white !important;
            width: 100% !important;
          }
          
          .hidden-print-v { display: block !important; }
          .print-only-view { display: block !important; width: 100% !important; }
          .page-break { page-break-before: always; height: 1px; }
          
          /* Visual improvements for print charts */
          .recharts-responsive-container { min-width: 650px !important; min-height: 350px !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}} />
    </div>,
    document.body
  );
};

export default CompareModal;
