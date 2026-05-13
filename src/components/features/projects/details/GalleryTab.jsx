import React, { useState, useMemo } from 'react';

export default function GalleryTab({ project }) {
  if (!project) return null;

  // Use the normalized photos array (strings) and map them to the expected object shape
  const allImages = useMemo(() => {
    const images = (project.media?.photos || []).map(url => ({ url, tag: 'photo' }));
    
    // If we have a cover image and it's not already in the list, prepend it
    const coverImage = project.media?.coverImage;
    if (coverImage && !images.some(img => img.url === coverImage)) {
      images.unshift({ url: coverImage, tag: 'cover' });
    }

    // fallback if absolutely no images
    if (images.length === 0) {
      images.push({ url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800', tag: 'fallback' });
    }

    return images;
  }, [project]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl p-6 shadow-sm border border-[#ece7d9] dark:border-slate-800">
      <h2 className="text-[16px] font-bold text-[#ccab59] mb-4">
        Project Gallery ({allImages.length} photos)
      </h2>

      {/* Main Large Image */}
      <div className="w-full h-[500px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 transition-all duration-300">
        <img 
          src={activeImage?.url} 
          alt={activeImage?.tag || project.title} 
          className="w-full h-full object-cover animate-fade-in"
          key={activeImage?.url} // Force re-render for animation if needed
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800'; }}
        />
      </div>

      {/* Thumbnails Row */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                activeIndex === index 
                  ? 'ring-2 ring-[#ccab59] ring-offset-2 dark:ring-offset-[#111827] opacity-100' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={img.url} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=200'; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
