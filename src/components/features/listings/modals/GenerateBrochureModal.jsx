import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { 
  X, 
  Home, 
  BadgeDollarSign, 
  CalendarDays, 
  UserRound, 
  Settings2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Zap, 
  BookOpen, 
  FileText,
  ChevronRight,
  Calculator,
  Palmtree,
  Camera,
  Map,
  BarChart3,
  Scale,
  Info,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useToast } from '../../../../context/ToastContext';

const GenerateBrochureModal = ({ isOpen, onClose, data = {} }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('Property');
  const [scheduleRows, setScheduleRows] = useState([
    { label: 'Down Payment', percent: 10, amount: '675,989' },
    { label: 'Pre-Handover', percent: 70, amount: '4,731,922' },
    { label: 'On Handover', percent: 20, amount: '1,351,978' }
  ]);
  const [selectedTheme, setSelectedTheme] = useState('Midnight Luxury');

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'Property', icon: Home },
    { id: 'Pricing', icon: BadgeDollarSign },
    { id: 'Schedule', icon: CalendarDays },
    { id: 'Agent', icon: UserRound },
    { id: 'Options', icon: Settings2 },
  ];

  const themes = [
    { name: 'Midnight Luxury', colors: ['#0f172a', '#ccab59', '#1e293b'], desc: 'Dark navy & gold — ultra premium feel' },
    { name: 'Ivory Elegance', colors: ['#ffffff', '#ccab59', '#f8f5ed'], desc: 'Bright white & gold — modern & clean' },
    { name: 'Royal Gold', colors: ['#1c1917', '#ccab59', '#292524'], desc: 'Rich champagne & black — opulent & bold' },
  ];

  const sections = [
    { id: 'roi', label: 'ROI Projection', icon: BarChart3 },
    { id: 'mortgage', label: 'Mortgage Calculator', icon: Calculator },
    { id: 'dld', label: 'DLD Market Data', icon: LineChartIcon },
    { id: 'legal', label: 'Legal Disclaimer', icon: ShieldCheck },
    { id: 'amenities', label: 'Amenities & Features', icon: Palmtree },
    { id: 'gallery', label: 'Photo Gallery', icon: Camera },
    { id: 'area', label: 'Area Market Analysis', icon: Map },
    { id: 'costs', label: 'Cost Breakdown', icon: Scale },
    { id: 'emi', label: 'Detailed EMI Table', icon: Calculator },
    { id: 'neighborhood', label: 'Neighborhood Info', icon: Info },
    { id: 'plans', label: 'Floor Plans', icon: FileText },
    { id: 'txns', label: 'Area Transactions', icon: BarChart3 },
    { id: 'dev', label: 'Developer Profile', icon: Building2 },
  ];

  // Placeholder LineChartIcon since it's not imported directly from lucide if not standard
  function LineChartIcon({ size }) { return <BarChart3 size={size} />; }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Property':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <InputField label="COMMUNITY" defaultValue="The Heights Country Club and Wellness" />
            <InputField label="UNIT TYPE" defaultValue="Apartment" />
            <InputField label="BEDROOMS" defaultValue="3" />
            <InputField label="SIZE (SQ.FT.)" defaultValue="3340" />
            <InputField label="COMPLETION DATE" defaultValue="30-07-2030" type="date" />
            <InputField label="PAYMENT OPTION" defaultValue="Payment Plan" />
            <InputField label="CLIENT NAME (optional)" placeholder="Enter client name" />
            <InputField label="RERA PERMIT #" defaultValue="1234567890" />
          </div>
        );
      case 'Pricing':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="SELLING PRICE (AED)" defaultValue="6759888" />
              <InputField label="ORIGINAL PRICE (AED)" defaultValue="6759888" />
              <InputField label="TRUSTEE FEE (AED)" defaultValue="4000" />
              <InputField label="COMMISSION %" defaultValue="2.1" />
              <InputField label="ALREADY PAID %" defaultValue="100" />
              <InputField label="CONVEYANCING FEE" defaultValue="3200" />
            </div>
            
            <div className="bg-[#fcfaf5] dark:bg-slate-800/50 rounded-xl p-4 border border-[#ece7d9] dark:border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <SummaryItem label="DLD (4%)" value="AED 270,396" color="text-slate-600" />
                <SummaryItem label="COMMISSION" value="AED 141,958" color="text-slate-600" />
                <SummaryItem label="TOTAL EXTRA" value="AED 419,554" color="text-amber-500" />
                <SummaryItem label="GRAND TOTAL" value="AED 7,179,442" color="text-amber-600" isBold />
              </div>
            </div>
          </div>
        );
      case 'Schedule':
        return (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-black text-emerald-500 flex items-center gap-1.5">
                Total: 100% <CheckCircle2 size={13} /> Balanced
              </span>
              <button className="flex items-center gap-1.5 px-2.5 py-1 border border-[#ece7d9] dark:border-slate-700 rounded-lg text-[10px] font-bold text-amber-600 hover:bg-amber-50 transition-colors">
                <Plus size={13} /> Add Row
              </button>
            </div>
            
            <div className="space-y-2">
              {scheduleRows.map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    defaultValue={row.label}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 rounded-lg text-[12px] font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <div className="w-16 relative">
                    <input 
                      type="number" 
                      defaultValue={row.percent}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 rounded-lg text-[12px] font-bold text-center appearance-none focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex-1 text-right pr-2">
                    <span className="text-[12px] font-black text-amber-600">AED {row.amount}</span>
                  </div>
                  <button className="p-1.5 text-red-200 hover:text-red-500 border border-red-50 dark:border-red-900/10 rounded-lg hover:bg-red-50 transition-all">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Agent':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <InputField label="AGENT NAME" defaultValue="Vortex Web" />
            <InputField label="TITLE" defaultValue="Senior Property Advisor" />
            <InputField label="PHONE" defaultValue="+971 50 000 0000" />
            <InputField label="EMAIL" defaultValue="support@vortexweb.ae" />
            <InputField label="COMPANY NAME" defaultValue="VortexWeb" />
            <InputField label="WEBSITE" defaultValue="https://vortexweb.ae" />
            <div className="md:col-span-2">
              <InputField label="AGENT PHOTO URL" defaultValue="https://example.com/photo.jpg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">COMPANY ADDRESS</label>
              <textarea 
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 rounded-lg text-[12px] font-medium resize-none h-20 focus:outline-none focus:ring-1 focus:ring-amber-500"
                defaultValue="Damac Executive Heights, Office 1802, Barsha Heights, Dubai, UAE"
              />
            </div>
          </div>
        );
      case 'Options':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-1">BROCHURE THEME</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button 
                    key={theme.name}
                    onClick={() => setSelectedTheme(theme.name)}
                    className={`p-3 rounded-xl border transition-all text-left relative overflow-hidden group
                      ${selectedTheme === theme.name 
                        ? 'border-amber-500 bg-amber-50/10' 
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'
                      }`}
                  >
                    <div className="flex gap-1 mb-2">
                      {theme.colors.map((c, idx) => (
                        <div key={idx} className="w-5 h-5 rounded shadow-inner" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="font-bold text-[13px] text-slate-800 dark:text-white mb-0.5">{theme.name}</div>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">{theme.desc}</div>
                    {selectedTheme === theme.name && (
                      <div className="absolute top-2 right-2 text-amber-500">
                        <CheckCircle2 size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-1">INCLUDE SECTIONS</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {sections.map((section) => (
                  <label key={section.id} className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-slate-200 text-amber-500 focus:ring-amber-500" />
                    <section.icon size={13} className="text-slate-400" />
                    <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">{section.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-[800px] max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-pop-in">
        
        {/* Header */}
        <div className="p-6 pb-5 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-[#ece7d9] dark:border-slate-700 p-0.5">
              <img 
                src={data.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400"} 
                className="w-full h-full object-cover rounded-lg"
                alt="Brochure thumb"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <h2 className="text-[17px] font-black text-slate-900 dark:text-white leading-tight">Generate Brochure</h2>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-amber-600">{data.title || "Salva"}</span>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-[#576273] uppercase tracking-wider">{data.developer || "Emaar"}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 mt-4">
          <div className="flex items-center gap-1.5 p-1 bg-[#fdfaf3] dark:bg-slate-900/50 rounded-xl border border-[#ece7d9] dark:border-slate-800 w-full sm:w-fit overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-black transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-amber-600 shadow-sm border border-[#ece7d9] dark:border-slate-700'
                    : 'text-slate-400 dark:text-[#576273] hover:text-slate-600'
                }`}
              >
                <tab.icon size={14} />
                {tab.id}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
           {renderTabContent()}
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-5 border-t border-gray-50 dark:border-slate-800 bg-[#fdfbf6]/30 dark:bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <MainActionButton 
              label="Premium Brochure" 
              desc="4-page luxury" 
              icon={Zap} 
              variant="solid" 
              onClick={() => {
                const brochureData = {
                  ...data,
                  title: data.title || "Salva",
                  developer: data.developer || "Emaar",
                  image: data.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
                  schedule: scheduleRows,
                  theme: selectedTheme
                };
                localStorage.setItem('lastGeneratedBrochure', JSON.stringify(brochureData));
                window.open('/premium-brochure', 'PremiumBrochure', 'width=1280,height=900,menubar=no,toolbar=no,location=no');
                addToast("Premium brochure generated successfully!", "success");
              }}
            />
            <MainActionButton 
              label="Comprehensive" 
              desc="8+ page dossier" 
              icon={BookOpen} 
              variant="outline" 
              onClick={() => {
                const brochureData = {
                  ...data,
                  title: data.title || "Salva",
                  developer: data.developer || "Emaar",
                  image: data.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
                  schedule: scheduleRows,
                  theme: selectedTheme
                };
                localStorage.setItem('lastGeneratedBrochure', JSON.stringify(brochureData));
                window.open('/comprehensive-brochure', 'ComprehensiveBrochure', 'width=1280,height=900,menubar=no,toolbar=no,location=no');
                addToast("Comprehensive brochure generated successfully!", "success");
              }}
            />
            <MainActionButton 
              label="One-Page Summary" 
              desc="1-page brief" 
              icon={FileText} 
              variant="light" 
              onClick={() => addToast("One-Page Summary is coming soon!", "info")}
            />
          </div>
          <p className="text-center text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest opacity-80">
            Interactive AI PDF Generation · Version 4.2 Release
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Helper Components
const InputField = ({ label, defaultValue, type = "text", placeholder }) => (
  <div>
    <label className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <input 
      type={type} 
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 rounded-lg text-[12px] font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 dark:text-white"
    />
  </div>
);

const SummaryItem = ({ label, value, color, isBold }) => (
  <div>
    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
    <div className={`text-[13px] ${isBold ? 'font-black' : 'font-bold'} ${color}`}>{value}</div>
  </div>
);

const MainActionButton = ({ label, desc, icon: Icon, variant, onClick }) => {
  const styles = {
    solid: "bg-[#ccab59] text-white hover:bg-[#b0934c] shadow-lg shadow-amber-600/20",
    outline: "bg-white text-amber-600 border-2 border-amber-500/50 hover:bg-amber-50",
    light: "bg-[#fdfaf3] text-amber-700 border border-amber-200/50 hover:bg-amber-100/50"
  };
  
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all h-20 w-full ${styles[variant]}`}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon size={16} className={variant === 'solid' ? 'text-amber-200' : 'text-amber-500'} />
        <span className="text-[13px] font-black tracking-tight">{label}</span>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-wide opacity-60`}>{desc}</span>
    </button>
  );
};

export default GenerateBrochureModal;
