import React, { useEffect, useRef, useState } from 'react';

// Dubai area coordinates for known communities
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

const getCoords = (project) => {
  return areaCoords[project.c] || DEFAULT_COORDS;
};

const topAreas = [
  { name: 'Jumeirah Village Circle (JVC)', count: 186 },
  { name: 'Dubai South', count: 80 },
  { name: 'Business Bay', count: 58 },
  { name: 'Al Furjan', count: 55 },
  { name: 'Dubai Hills Estate', count: 45 },
  { name: 'Arjan', count: 44 },
  { name: 'Jumeirah Village Triangle (JVT)', count: 42 },
  { name: 'Meydan', count: 41 },
  { name: 'Saadiyat Island', count: 40 },
  { name: 'Dubai Creek Harbour', count: 38 },
  { name: 'Mohammed Bin Rashid City', count: 36 },
  { name: 'Town Square', count: 34 },
  { name: 'Al Reem Island', count: 33 },
  { name: 'Yas Island', count: 33 },
  { name: 'International City', count: 28 },
  { name: 'Umm Suqeim', count: 28 },
  { name: 'Palm Jumeirah', count: 25 },
  { name: 'Motor City', count: 23 },
  { name: 'Downtown Dubai', count: 21 },
  { name: 'Dubai Harbour', count: 19 },
];

const MapView = ({ projects, onProjectClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  useEffect(() => {
    if (window.L && window.L.MarkerClusterGroup) {
      setLeafletLoaded(true);
      return;
    }

    const loadScript = (src) => new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

    const loadStyle = (href) => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
    };

    const startLoading = async () => {
      try {
        // 1. Load Leaflet CSS and JS
        loadStyle('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
        
        // 2. Load MarkerCluster CSS and JS (depends on Leaflet)
        loadStyle('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css');
        loadStyle('https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css');
        await loadScript('https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js');
        
        setLeafletLoaded(true);
      } catch (err) {
        console.error('Failed to load map libraries:', err);
      }
    };

    startLoading();
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !projects.length) return;

    // Clean up previous instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const L = window.L;
    if (!L || !L.MarkerClusterGroup) return; // double check for race conditions
    const map = L.map(mapRef.current, {
      center: [25.2, 55.27],
      zoom: 11,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom icon
    const goldIcon = L.divIcon({
      html: `<div style="width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 35%, #f0d080, #b89146);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    // Create Cluster Group
    const markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 40,
    });
    
    const bounds = L.latLngBounds();
    let hasValidMarkers = false;

    // Add markers
    projects.forEach((project) => {
      const coords = project.coordinates || getCoords(project);
      if (coords && coords.length === 2 && !isNaN(coords[0])) {
        const marker = L.marker(coords, { icon: goldIcon });
        
        marker.bindPopup(`
          <div style="font-family:sans-serif;min-width:180px;padding:4px;">
            <div style="height:100px;margin-bottom:8px;border-radius:6px;overflow:hidden;background:#f8f6f0;">
              <img src="${project.cv}" style="width:100%;height:100%;object-cover" onerror="this.src='https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=200'"/>
            </div>
            <strong style="font-size:14px;color:#1e293b;display:block;margin-bottom:2px;">${project.t}</strong>
            <div style="color:#b89146;font-weight:700;font-size:13px;margin-bottom:4px;">${project.p ? 'AED ' + (project.p / 1e6).toFixed(1) + 'M' : 'TBD'}</div>
            <div style="font-size:11px;color:#64748b;margin-bottom:8px;">by ${project.d}</div>
            <button id="marker-btn-${project.i}" style="width:100%;background:#ccab59;color:#fff;border:none;padding:6px;border-radius:4px;font-weight:bold;cursor:pointer;font-size:11px;">View Project Details</button>
          </div>
        `, { closeButton: false, offset: [0, -5] });

        marker.on('popupopen', () => {
          const btn = document.getElementById(`marker-btn-${project.i}`);
          if (btn) btn.onclick = () => onProjectClick(project);
        });

        markers.addLayer(marker);
        bounds.extend(coords);
        hasValidMarkers = true;
      }
    });

    map.addLayer(markers);
    
    if (hasValidMarkers) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }

    mapInstanceRef.current = map;
    return () => { if (mapInstanceRef.current) mapInstanceRef.current.remove(); mapInstanceRef.current = null; };
  }, [leafletLoaded, projects]);

  return (
    <div>
      {/* Map */}
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden border border-[#ece7d9] dark:border-slate-800"
        style={{ height: '480px' }}
      >
        {!leafletLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <p className="text-slate-400 text-sm">Loading map…</p>
          </div>
        )}
      </div>

      {/* Area Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {topAreas.map((area) => (
          <button
            key={area.name}
            className="px-3 py-1.5 rounded-full border border-[#ece7d9] dark:border-slate-700 bg-white dark:bg-[#111827] text-[12px] text-slate-600 dark:text-slate-300 hover:border-[#ccab59] hover:text-[#a38847] transition-colors font-medium whitespace-nowrap"
          >
            {area.name} ({area.count})
          </button>
        ))}
      </div>

      {/* Info text */}
      <p className="mt-3 text-[12px] text-slate-400 dark:text-slate-500">
        Showing {projects.length} projects. Click a community to filter &amp; zoom.
      </p>
    </div>
  );
};

export default MapView;
