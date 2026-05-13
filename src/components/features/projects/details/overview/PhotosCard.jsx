import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../ui/Card';
import { useToast } from '../../../../../context/ToastContext';


export function PhotosCard({ image, title }) {
  const { addToast } = useToast();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos (1)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative group w-full h-[320px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button 
              onClick={() => addToast("Full image gallery is coming soon!", "info")}
              className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-black text-sm shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
