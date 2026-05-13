import React from 'react';
import { Settings, X, Save } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PreferencesModal = ({ onClose }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="absolute top-[calc(100%+12px)] right-0 w-[320px] bg-white dark:bg-[#1a1c29] border border-[#e5dfce] dark:border-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-2xl flex flex-col z-50 transition-colors overflow-hidden">
      
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5dfce] dark:border-gray-800/80 transition-colors">
        <div className="flex items-center gap-2 text-[#111424] dark:text-white transition-colors">
          <Settings className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          <h3 className="text-[15px] font-bold">Preferences</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-6">
        
        {/* Default Sort */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider transition-colors">
            Default Sort
          </label>
          <select className="w-full px-3 py-2 bg-white dark:bg-[#141929] border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-[#111424] dark:text-white focus:outline-none focus:border-[#ccab59] transition-colors appearance-none cursor-pointer">
            <option>Default</option>
            <option>Price (High to Low)</option>
            <option>Price (Low to High)</option>
            <option>Newest First</option>
          </select>
        </div>

        {/* Default View */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider transition-colors">
            Default View
          </label>
          <div className="flex items-center gap-2">
            <button className="flex-1 py-2 rounded-lg border border-[#ccab59] bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59] text-sm font-semibold transition-colors">
              Grid
            </button>
            <button className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#141929] text-sm font-medium transition-colors">
              List
            </button>
            <button className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#141929] text-sm font-medium transition-colors">
              Map
            </button>
          </div>
        </div>

        {/* Currency Display */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider transition-colors">
            Currency Display
          </label>
          <select className="w-full px-3 py-2 bg-white dark:bg-[#141929] border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-[#111424] dark:text-white focus:outline-none focus:border-[#ccab59] transition-colors appearance-none cursor-pointer">
            <option>AED (Dirham)</option>
            <option>USD (US Dollar)</option>
            <option>EUR (Euro)</option>
            <option>GBP (British Pound)</option>
          </select>
        </div>

        {/* Theme Settings */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider transition-colors">
            Theme
          </label>
          <div className="flex items-center gap-2">
            <button className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-[#141929] text-sm font-semibold transition-colors">
              Auto
            </button>
            <button 
              onClick={() => isDarkMode && toggleTheme()}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-colors ${!isDarkMode ? 'border-[#ccab59] bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59]' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-[#141929]'}`}
            >
              Light
            </button>
            <button 
              onClick={() => !isDarkMode && toggleTheme()}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-colors ${isDarkMode ? 'border-[#ccab59] bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59]' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-[#141929]'}`}
            >
              Dark
            </button>
          </div>
        </div>

      </div>
      
      {/* Footer Info */}
      <div className="px-5 py-4 border-t border-[#e5dfce] dark:border-gray-800/80 bg-gray-50/50 dark:bg-white/5 transition-colors">
        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-1">
          <Save className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[11px] font-medium">Stored Data:</span>
        </div>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug">
          0 favorites • 0 collections • 0 notes • 1 recently viewed
        </p>
      </div>

    </div>
  );
};

export default PreferencesModal;
