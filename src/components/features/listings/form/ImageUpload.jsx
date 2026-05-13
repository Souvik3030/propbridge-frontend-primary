import React, { useState, useCallback } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '../../../../context/ToastContext';
import apiClient from '../../../../services/apiClient';

/**
 * ImageUpload Component
 * Handles multi-image uploads to the Laravel backend.
 * Provides real-time feedback and supports the Property Finder 'Full Replace' pattern.
 */
const ImageUpload = ({ images = [], setImages }) => {
  const { addToast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const currentImages = Array.isArray(images) ? images : [];
    if (currentImages.length + files.length > 30) {
      addToast('Maximum 30 images allowed per listing.', 'error');
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const form = new FormData();
          form.append('file', file);

          try {
            const res = await apiClient.post('/media/upload', form, {
              headers: { 'Content-Type': undefined },
            });
            // Handle various possible backend response formats
            const extractedUrl = res?.url || res?.data?.url || res?.path || res?.data?.path;
            if (!extractedUrl) {
              console.error('Unexpected upload response format:', res);
              return null;
            }
            return extractedUrl;
          } catch (err) {
            console.error('Upload failed for file:', file.name, err);
            addToast(`Failed to upload ${file.name}`, 'error');
            return null;
          }
        })
      );

      const validUrls = uploadedUrls.filter(url => url !== null && url !== undefined);

      // IMPORTANT: Property Finder images field is a FULL REPLACE
      // We merge existing images with newly successfully uploaded ones
      setImages((prev) => [...(Array.isArray(prev) ? prev : []), ...validUrls]);

      if (validUrls.length > 0) {
        addToast(`${validUrls.length} images uploaded successfully.`, 'success');
      }
    } catch (error) {
      addToast('An error occurred during upload.', 'error');
    } finally {
      setUploading(false);
      // Reset input value to allow re-uploading the same file if needed
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => (Array.isArray(prev) ? prev : []).filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[14px] font-bold text-slate-700 dark:text-slate-300">
          Property Photos <span className="text-red-500 font-normal ml-1">(min 1, max 30)</span>
        </label>
        <span className="text-[12px] font-medium text-[#ccab59] bg-[#ccab59]/10 px-3 py-1 rounded-full">
          {(images || []).length} / 30 Uploaded
        </span>
      </div>

      {/* Upload Zone */}
      <div className="relative group">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
          disabled={uploading}
        />
        <div className={`
            border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-3
            ${uploading ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800' : 'bg-white dark:bg-[#111827] border-[#ece7d9] dark:border-slate-800 group-hover:border-[#ccab59] group-hover:bg-[#ccab59]/5'}
          `}>
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 text-[#ccab59] animate-spin" />
              <p className="text-[14px] font-bold text-[#ccab59]">Uploading images...</p>
            </>
          ) : (
            <>
              <div className="p-3 bg-[#ccab59]/10 rounded-xl text-[#ccab59] group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-black text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 font-medium">PNG, JPG or WEBP (Max. 10MB each)</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {Array.isArray(images) && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {images.map((url, i) => (
            <div key={`${url}-${i}`} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-[#ece7d9] dark:border-slate-800 ring-0 hover:ring-2 hover:ring-[#ccab59] transition-all">
              <img
                src={url}
                alt={`Property-${i}`}
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-xl"
                type="button"
              >
                <X size={14} />
              </button>

              {/* Badge for featured image */}
              {i === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-black rounded uppercase tracking-wider">
                  Main Photo
                </div>
              )}
            </div>
          ))}

          {/* Placeholder cards for empty slots if needed, or just let it be clean */}
          {Array.isArray(images) && images.length < 5 && Array.from({ length: 5 - images.length }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700">
              <ImageIcon size={20} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
