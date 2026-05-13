import React, { useState } from 'react';
import { Key, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { saveApiKey } from '../../services/projectsApi';

const ApiKeyModal = ({ onKeySet }) => {
  const [value, setValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please enter your RapidAPI key.');
      return;
    }
    saveApiKey(trimmed);
    onKeySet(trimmed);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#111827] rounded-2xl border border-[#ece7d9] dark:border-slate-800 shadow-lg p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#ccab59]/10 border border-[#ccab59]/20 flex items-center justify-center mb-6 mx-auto">
          <Key className="w-7 h-7 text-[#ccab59]" />
        </div>

        <h2 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-1 font-serif">
          Connect Your API Key
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 leading-relaxed">
          Enter your{' '}
          <a
            href="https://rapidapi.com/apidojo/api/bayut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccab59] font-semibold hover:underline inline-flex items-center gap-0.5"
          >
            RapidAPI key <ExternalLink className="w-3 h-3" />
          </a>{' '}
          to load live project data from the UAE Real Estate API.
        </p>

        {/* Input */}
        <div className="relative mb-3">
          <input
            type={showKey ? 'text' : 'password'}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Paste your x-rapidapi-key here"
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-[#ece7d9] dark:border-slate-700 bg-[#fdfcf8] dark:bg-[#0a0d18] text-slate-700 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:border-[#ccab59] focus:ring-1 focus:ring-[#ccab59] transition-colors font-mono"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-3 font-medium">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#ccab59] hover:bg-[#b89146] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          Connect & Load Projects
        </button>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-4">
          Your key is stored only in your browser's localStorage and never sent anywhere except directly to RapidAPI.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;
