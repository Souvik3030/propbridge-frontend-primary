import React from 'react';
import { Card } from '../../../../ui/Card';
import { MapPlaceholder } from '../../../../ui/MapPlaceholder';
import { Globe } from 'lucide-react';
import { useToast } from '../../../../../context/ToastContext';

export function LocationCard({ city, community }) {
  const { addToast } = useToast();
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-[15px] font-bold text-[#ccab59]">Location</h3>
        
        <div className="rounded-xl overflow-hidden border border-[#ece7d9] dark:border-slate-800 h-[300px]">
          <MapPlaceholder city={city} community={community} />
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <button 
            onClick={() => {
              addToast("Opening Google Maps...", "info");
              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(community + ', ' + city)}`, '_blank');
            }}
            className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-[13px] font-medium transition-colors w-fit"
          >
            <Globe className="w-4 h-4" /> Open in Google Maps →
          </button>

          <div className="flex items-center justify-between text-[13px] text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1 font-medium">
              <span className="text-slate-400">City:</span>
              <span className="font-bold">{city}</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <span className="text-slate-400">Community:</span>
              <span className="font-bold">{community}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
