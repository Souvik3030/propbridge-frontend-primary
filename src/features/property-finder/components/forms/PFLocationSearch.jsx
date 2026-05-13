import React, { useState } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';

/**
 * PFLocationSearch
 * Mocked location search component for Property Finder IDs.
 * In a real scenario, this would call the PF Location API.
 */
const PFLocationSearch = ({ value, onChange, error }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Mock results
  const MOCK_LOCATIONS = [
    { id: 1, name: 'Dubai Hills Estate', emirate: 'dubai' },
    { id: 2, name: 'Downtown Dubai', emirate: 'dubai' },
    { id: 3, name: 'Palm Jumeirah', emirate: 'dubai' },
    { id: 4, name: 'Yas Island', emirate: 'abu_dhabi' },
    { id: 5, name: 'Al Reem Island', emirate: 'abu_dhabi' },
  ];

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        setResults(MOCK_LOCATIONS.filter(l => l.name.toLowerCase().includes(val.toLowerCase())));
        setIsSearching(false);
      }, 500);
    } else {
      setResults([]);
    }
  };

  const selectedLocation = MOCK_LOCATIONS.find(l => l.id === value);

  return (
    <div className="relative">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">
        Location (PF Database)
      </label>
      
      <div className="relative">
        <input
          type="text"
          placeholder={selectedLocation ? selectedLocation.name : "Search community..."}
          value={query}
          onChange={handleSearch}
          className={`w-full bg-white dark:bg-[#1A1F29] border ${error ? 'border-rose-500' : 'border-[#ece7d9] dark:border-[#1E2530]'} rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ccab59]/20 transition-all`}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {isSearching ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
        </div>
      </div>

      {results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-[#1A1F29] border border-[#ece7d9] dark:border-[#1E2530] rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden">
          {results.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => {
                onChange(loc.id);
                setResults([]);
                setQuery('');
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-[#fdfaf1] dark:hover:bg-[#252B36] text-sm transition-colors flex flex-col"
            >
              <span className="font-bold text-slate-800 dark:text-white">{loc.name}</span>
              <span className="text-[10px] text-slate-400 uppercase">{loc.emirate}</span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-[10px] text-rose-500 font-bold mt-1 pl-1">{error.message}</p>}
    </div>
  );
};

export default PFLocationSearch;
