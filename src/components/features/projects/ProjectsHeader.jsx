import { BarChart2, Landmark, Layers, RefreshCw, Star } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { Button } from '../../ui/Button';

const tabs = [
  { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
  { id: 'dld', label: 'DLD Analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'hotareas', label: 'Hot Areas & Deals', icon: <Star className="w-4 h-4" /> },
  { id: 'investment', label: 'Investment Tools', icon: <Landmark className="w-3.5 h-3.5 opacity-80" />, prefix: 'AED' },
];

const ProjectsHeader = ({ activeTab, setActiveTab, totalProjects = 2181, dldCount = 21744, onRefresh }) => {
  const { addToast } = useToast();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      addToast("Refreshing projects from the server...", "info");
    } else {
      addToast("Data is now managed via backend sync.", "info");
    }
  };

  return (
    <div className="mb-0">
      {/* Title Row */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Layers className="w-6 h-6 text-[#ccab59]" />
            <h1 className="text-[28px] font-bold text-slate-800 dark:text-white font-serif">
              Off-Plan Projects
            </h1>
          </div>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 ml-9">
            Browse {totalProjects.toLocaleString()} off-plan projects from Bayut ·{' '}
            <span className="text-[#1a73e8] dark:text-blue-400 font-semibold">
              {dldCount.toLocaleString()} DLD transactions
            </span>{' '}
            matched
          </p>
        </div>

        <Button
          onClick={handleRefresh}
          variant="gold"
          className="shadow-sm max-w-[150px]  "
          icon={RefreshCw}
        >
          Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[#ece7d9] dark:border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#ccab59] text-[#a38847] dark:text-[#ccab59]'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab.prefix ? (
              <span className="text-[10px] font-bold opacity-70">{tab.prefix}</span>
            ) : (
              tab.icon
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsHeader;
