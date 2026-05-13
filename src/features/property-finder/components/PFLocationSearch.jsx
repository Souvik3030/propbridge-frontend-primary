import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Loader2, X, CheckCircle } from 'lucide-react';
import propertyFinderApi from '../../../services/propertyFinderApi';

/**
 * Property Finder Location Search
 *
 * Searches GET /api/propertyfinder/locations?search={query} and calls
 * `onSelect(item)` with the full location object so the parent can
 * auto-fill: pf_location_id, pf_city, pf_community, pf_subcommunity,
 * pf_building, latitude, longitude, uae_emirate.
 *
 * Props:
 *   selectedLocation {string}  – Display value (the full location.location string)
 *   onSelect         {fn}      – Called with the selected item or null on clear
 */
const PFLocationSearch = ({ selectedLocation = '', onSelect }) => {
  const [query, setQuery] = useState(selectedLocation || '');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync display value when parent updates (e.g. on Edit page hydration)
  useEffect(() => {
    if (selectedLocation !== undefined && selectedLocation !== query) {
      setQuery(selectedLocation);
      setIsSelected(!!selectedLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchLocations = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    setIsOpen(true);
    try {
      const data = await propertyFinderApi.searchPFLocations(searchQuery);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('[PFLocationSearch] Fetch error:', err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsSelected(false); // user started editing — clear selected state

    clearTimeout(debounceRef.current);
    if (val.trim().length < 2) {
      setIsOpen(false);
      setResults([]);
    } else {
      setIsOpen(true); // show "waiting" state immediately
      debounceRef.current = setTimeout(() => fetchLocations(val), 400);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.location);
    setIsSelected(true);
    setIsOpen(false);
    setResults([]);
    onSelect?.(item);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setIsSelected(false);
    onSelect?.(null);
  };

  const handleFocus = () => {
    if (query.trim().length >= 2 && !isSelected) {
      setIsOpen(true);
      if (results.length === 0) fetchLocations(query);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
        PF Location <span className="text-red-500">*</span>
      </label>

      <div className="relative group">
        {/* Search icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors text-slate-400 group-focus-within:text-[#ccab59]">
          {isSelected
            ? <CheckCircle size={15} className="text-emerald-500" />
            : <Search size={15} />
          }
        </div>

        <input
          type="text"
          id="pf_location_search"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder="Search location (e.g. Dubai Marina)..."
          autoComplete="off"
          className={`w-full bg-white dark:bg-[#12161F] border rounded-xl py-3 pl-9 pr-8 text-[14px] font-medium placeholder:text-slate-400 text-slate-800 dark:text-white focus:outline-none focus:ring-2 transition-all ${
            isSelected
              ? 'border-emerald-400 dark:border-emerald-600 focus:ring-emerald-400/20'
              : 'border-[#ece7d9] dark:border-[#1E2530] group-hover:border-[#ccab59]/40 focus:ring-[#ccab59]/20'
          }`}
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Clear location"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white dark:bg-[#12161F] border border-[#ece7d9] dark:border-[#1E2530] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Header */}
          <div className="px-4 py-2 border-b border-[#f3efe6] dark:border-[#1E2530] bg-[#fdfaf1] dark:bg-[#0F1318] flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {isLoading ? 'Searching Property Finder...' : `${results.length} Result${results.length !== 1 ? 's' : ''}`}
            </span>
            {isLoading && <Loader2 size={12} className="animate-spin text-[#ccab59]" />}
          </div>

          {/* Results list */}
          <div className="max-h-64 overflow-y-auto overscroll-contain">
            {isLoading ? (
              <div className="p-5 flex flex-col items-center justify-center gap-2">
                <Loader2 size={20} className="animate-spin text-[#ccab59]" />
                <span className="text-[11px] font-bold text-slate-400">Fetching locations...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="p-5 text-center text-[12px] font-bold text-slate-400 italic">
                No locations found. Try a different query.
              </div>
            ) : (
              results.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[#fdfaf1] dark:hover:bg-[#1A1F29] border-b border-[#f3efe6] dark:border-[#1E2530]/50 last:border-0 transition-colors group/item"
                >
                  <MapPin size={14} className="text-slate-400 group-hover/item:text-[#ccab59] mt-0.5 flex-shrink-0 transition-colors" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-black text-slate-800 dark:text-white truncate leading-snug">
                      {item.location}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight mt-0.5">
                      {[item.building, item.community, item.city, item.uae_emirate]
                        .filter((v) => v && v !== '-')
                        .join(' · ')}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PFLocationSearch;
