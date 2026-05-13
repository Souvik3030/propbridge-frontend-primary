import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Download, FileText, Printer } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/ui/Loader';
import { getProjectById } from '../../services/projectsApi';
import { transformProjectData } from '../../hooks/useFetchProjects';
import GenerateBrochureModal from '../../components/features/listings/modals/GenerateBrochureModal';
import OverviewTab from '../../components/features/projects/details/OverviewTab';
import GalleryTab from '../../components/features/projects/details/GalleryTab';
import FloorplansTab from '../../components/features/projects/details/FloorplansTab';
import MarketDataTab from '../../components/features/projects/details/MarketDataTab';
import PaymentTab from '../../components/features/projects/details/PaymentTab';
import InvestmentTab from '../../components/features/projects/details/InvestmentTab';
import LocationTab from '../../components/features/projects/details/LocationTab';
import BrochureTab from '../../components/features/projects/details/BrochureTab';

import ProjectHeader from '../../components/features/projects/details/ProjectHeader';
import ProjectNotes from '../../components/features/projects/details/ProjectNotes';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'floorplans', label: 'Floorplans' },
  { id: 'market_data', label: 'Market Data' },
  { id: 'payment', label: 'Payment' },
  { id: 'investment', label: 'Investment' },
  { id: 'location', label: 'Location' },
  { id: 'brochure', label: 'Brochure' },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToRecentlyViewed } = useProjects();
  const { addToast } = useToast();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState('');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // Fetch project data directly
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjectById(id);
        // The API returns { results: [...] } or the object itself
        const rawProject = data.results ? data.results[0] : data;
        
        if (!rawProject) {
          setError('Project not found');
          setLoading(false);
          return;
        }

        const transformed = transformProjectData(rawProject);
        setProject(transformed);
        addToRecentlyViewed(transformed);
      } catch (err) {
        console.error('[ProjectDetail] Fetch Error:', err);
        setError(err.message || 'Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, addToRecentlyViewed]);

  const handleSaveNotes = () => {
    if (!notes.trim()) {
      addToast("Please enter some notes first", "warning");
      return;
    }
    // Mock save
    addToast("Notes saved successfully!", "success");
  };

  const handleClearNotes = () => {
    setNotes('');
  };

  if (loading) {
    return <Loader text="Getting project details..." fullPage />;
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <p className="text-2xl font-serif font-bold mb-2 text-slate-600">
          {error || 'Project Not Found'}
        </p>
        <button 
          onClick={() => navigate('/projects')} 
          className="px-6 py-2 bg-[#ccab59] text-white rounded-lg font-bold hover:bg-[#a38847] transition-colors"
        >
          Go Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-20">
      {/* Back Button */}
      <Link 
        to="/projects"
        className="flex items-center gap-1.5 text-[#ccab59] hover:text-[#a38847] font-semibold text-sm mb-6 transition-colors w-fit"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Off-Plan Projects
      </Link>

      {/* Header Card */}
      <ProjectHeader project={project} onGenerateBrochure={() => setIsBrochureModalOpen(true)} />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar bg-[#f8f6f0] dark:bg-slate-800/50 p-1.5 rounded-xl border border-[#ece7d9] dark:border-slate-800/80">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#ccab59] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && <OverviewTab project={project} onGenerateBrochure={() => setIsBrochureModalOpen(true)} />}
        {activeTab === 'gallery' && <GalleryTab project={project} />}
        {activeTab === 'floorplans' && <FloorplansTab />}
        {activeTab === 'market_data' && <MarketDataTab />}
        {activeTab === 'payment' && <PaymentTab project={project} />}
        {activeTab === 'investment' && <InvestmentTab project={project} />}
        {activeTab === 'location' && <LocationTab project={project} />}
        {activeTab === 'brochure' && <BrochureTab project={project} onGenerateBrochure={() => setIsBrochureModalOpen(true)} />}
        
        {!['overview', 'gallery', 'floorplans', 'market_data', 'payment', 'investment', 'location', 'brochure'].includes(activeTab) && (
          <div className="bg-white dark:bg-[#111827] rounded-xl p-6 shadow-sm border border-[#ece7d9] dark:border-slate-800 h-full flex items-center justify-center text-slate-400">
            Content for {TABS.find(t => t.id === activeTab)?.label} will go here
          </div>
        )}
      </div>

      {/* My Notes */}
      <ProjectNotes 
        notes={notes} 
        setNotes={setNotes} 
        onSaveNotes={handleSaveNotes} 
        onClearNotes={handleClearNotes} 
      />

      <GenerateBrochureModal 
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        data={{
          title: project.title,
          developer: project.developer?.name,
          image: project.media?.coverImage
        }}
      />
    </div>
  );
}
