import React from 'react';
import { 
  FileText, Link as LinkIcon, Download, LayoutGrid, FileSpreadsheet, Share2 
} from 'lucide-react';
import { useToast } from '../../../../context/ToastContext';
import { TABLE_METRICS } from './CompareHelpers';

const ExportTab = ({ projects }) => {
  const { addToast } = useToast();

  const handleCSV = () => {
    const headers = ["Metric", ...projects.map(p => p.t)].join(",");
    const rows = TABLE_METRICS.map(({ key, fn }) => {
      const vals = projects.map(p => {
        let v = fn(p);
        // Clean values for CSV (remove commas, currency symbols)
        return `"${String(v).replace(/"/g, '""')}"`;
      });
      return [key, ...vals].join(",");
    });
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Project_Comparison_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("CSV export started!", "success");
  };

  const handleCopyLink = () => {
    const ids = projects.map(p => p.i).join(',');
    const url = `${window.location.origin}${window.location.pathname}?compare=${ids}`;
    navigator.clipboard.writeText(url);
    addToast("Comparison link copied to clipboard!", "success");
  };

  const exports = [
    { icon: FileText, label: 'PDF Report',  sub: 'Download PDF',  desc: 'Export a branded comparison report with all metrics', color: 'text-blue-500', bg: 'bg-blue-50/50', border: 'border-blue-100', onClick: () => window.print() },
    { icon: Share2, label: 'Shareable Link', sub: 'Copy URL',    desc: 'Generate a unique link to share this comparison with clients', color: 'text-[#ccab59]', bg: 'bg-[#fdf8e9]', border: 'border-[#f3e8c1]', onClick: handleCopyLink },
    { icon: FileSpreadsheet, label: 'Data Export',  sub: 'Download CSV',  desc: 'Download all comparison data as a spreadsheet for Excel', color: 'text-emerald-500', bg: 'bg-emerald-50/50', border: 'border-emerald-100', onClick: handleCSV },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 animate-in fade-in zoom-in-95 duration-500">
      {exports.map(exp => (
        <button
          key={exp.label}
          onClick={exp.onClick}
          className={`flex flex-col items-center justify-center py-12 px-6 rounded-[32px] border ${exp.border} ${exp.bg} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden`}
        >
          {/* Decorative Background Element */}
          <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform ${exp.color.replace('text', 'bg')}`} />
          
          <div className={`${exp.color} mb-6 group-hover:scale-110 transition-transform`}>
             <exp.icon size={48} strokeWidth={1.5} />
          </div>
          
          <p className="text-[20px] font-black text-slate-900 dark:text-white mb-2">{exp.label}</p>
          <p className={`text-[12px] font-black uppercase tracking-widest mb-4 ${exp.color} opacity-80`}>{exp.sub}</p>
          <p className="text-[12px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            {exp.desc}
          </p>
          
          <div className="mt-8 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[11px] font-black text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
            Generate Now →
          </div>
        </button>
      ))}
    </div>
  );
};

export default ExportTab;
