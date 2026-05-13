import React from 'react';
import { Radio, RefreshCw, Trash2 } from 'lucide-react';

const DataSourceCard = ({ title, status, details, action, color }) => {
  const colorMap = {
    emerald: 'text-[#10b981]',
    slate: 'text-slate-300',
    blue: 'text-[#3b82f6]',
    gold: 'text-[#ccab59]',
  };

  return (
    <div className="bg-white dark:bg-[#1a1c2e]/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-sm h-full">
      <div className="flex items-center gap-2.5">
        <div className={`w-2 h-2 rounded-full bg-current ${colorMap[color]}`} />
        <h4 className="text-[14px] font-serif font-bold text-slate-900 dark:text-white leading-tight">{title}</h4>
      </div>
      
      <div className="flex flex-col gap-1 flex-1 mt-0.5">
        {status && (
           <p className="text-[12px] font-bold text-slate-400 dark:text-slate-500">
             Status: <span className={colorMap[color]}>{status}</span>
           </p>
        )}
        {details.map((detail, idx) => (
          <p key={idx} className="text-[12px] font-bold text-slate-400 dark:text-slate-500">
            {detail.label}{detail.value ? ': ' : ''}
            <span className={detail.label.includes('Upload CSV') ? 'text-[#ccab59]' : 'text-slate-800 dark:text-white'}>
              {detail.value}
            </span>
          </p>
        ))}
      </div>

      {action && !action.link && (
        <button className={`mt-3 w-max px-4 py-1.5 border rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all transform active:scale-95 flex items-center gap-2 ${
          action.special ? 'border-[#ccab59] text-[#ccab59] hover:bg-[#ccab59]/5' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
        }`}>
          {action.label}
        </button>
      )}
      
      {action?.link && (
        <button className="text-[10px] font-bold text-[#ccab59] hover:underline uppercase tracking-widest text-left mt-1.5 flex items-center gap-1">
          {action.label}
        </button>
      )}
    </div>
  );
};

const DataSources = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-5 flex flex-col gap-5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="text-[#ccab59] flex items-center justify-center">
           <Radio size={18} strokeWidth={2.5} />
        </div>
        <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
          Data Sources
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <DataSourceCard 
          title="Bayut API (RapidAPI)"
          status="Connected"
          color="emerald"
          details={[
            { label: 'Projects', value: '2,181' },
            { label: 'API Today', value: '0 / 1,600' },
            { label: 'Last refresh', value: 'Never' }
          ]}
          action={{ label: 'Force Full Refresh', special: true }}
        />
        
        <DataSourceCard 
          title="DLD Open Data"
          color="slate"
          details={[
            { label: 'Not imported — Upload CSV', value: '' }
          ]}
          action={{ label: 'Download CSV →', link: true }}
        />
        
        <DataSourceCard 
          title="Storage Usage"
          color="blue"
          details={[
            { label: 'DLD Data', value: '0.00 MB' },
            { label: 'API Cache', value: '0.09 MB' }
          ]}
          action={{ label: 'Clean Old Caches' }}
        />
      </div>
    </div>
  );
};

export default DataSources;
