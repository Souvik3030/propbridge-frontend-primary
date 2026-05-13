import React, { useEffect, useRef, useState } from 'react';

// Dubai area coordinates for known communities (synced with MapView)
const areaCoords = {
  'The Heights Country Club and Wellness': [25.0657, 55.1713],
  'DAMAC Islands 2': [24.9857, 55.0742],
  'Dubai Creek Harbour': [25.2048, 55.3708],
  'Dubai Hills Estate': [25.1124, 55.2708],
  'Business Bay': [25.1855, 55.2796],
  'Downtown Dubai': [25.1972, 55.2744],
  'Jumeirah Village Circle': [25.0600, 55.2102],
};

const DEFAULT_COORDS = [25.2048, 55.2708]; // Dubai center

export function MapPlaceholder({ 
  city, 
  community,
  linkUrl = '#'
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Determine initial coordinates based on community
  const coords = community && areaCoords[community] ? areaCoords[community] : DEFAULT_COORDS;

  useEffect(() => {
    // Dynamically load Leaflet if not already loaded
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    
    // Cleanup previous instance if re-rendering
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: coords,
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false // disable scroll zoom for better UX on a details page
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom Blue Map Marker
    const markerIcon = L.divIcon({
      html: `
        <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3));">
          <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 38 14 38C14 38 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="#2563EB"/>
          <path d="M14 1.4C7.041 1.4 1.4 7.041 1.4 14C1.4 23.338 14 35.253 14 35.253C14 35.253 26.6 23.337 26.6 14C26.6 7.041 20.959 1.4 14 1.4Z" fill="#3B82F6"/>
          <circle cx="14" cy="14" r="5" fill="white"/>
        </svg>
      `,
      className: '',
      iconSize: [28, 38],
      iconAnchor: [14, 38], // anchor to bottom tip
    });

    L.marker(coords, { icon: markerIcon }).addTo(map);
    mapInstanceRef.current = map;

    return () => { 
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); 
        mapInstanceRef.current = null; 
      }
    };
  }, [leafletLoaded, coords]);

  return (
    <div className="flex flex-col">
      <div 
        ref={mapRef}
        className="w-full h-[180px] bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden relative mb-3 border border-slate-200 dark:border-slate-800 z-0"
      >
        {!leafletLoaded && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-slate-400 text-sm">Loading map…</p>
          </div>
        )}
      </div>

      <a href={linkUrl} className="text-[11px] text-blue-500 font-semibold hover:underline block mb-4 flex items-center gap-1 cursor-pointer">
        <span className="text-[14px]">🌐</span> Open in Google Maps →
      </a>
      {(city || community) && (
        <div className="flex flex-col gap-1 text-[12px]">
          {city && <span className="text-slate-500 dark:text-slate-400">City: <span className="font-bold text-slate-900 dark:text-white">{city}</span></span>}
          {community && <span className="text-slate-500 dark:text-slate-400">Community: <span className="font-bold text-slate-900 dark:text-white">{community}</span></span>}
        </div>
      )}
    </div>
  );
}
