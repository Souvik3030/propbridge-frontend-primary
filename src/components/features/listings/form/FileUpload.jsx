import React, { useState } from 'react';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { FormLabel } from './FormControls';
import { useToast } from '../../../../context/ToastContext';
import apiClient from '../../../../services/apiClient';

const FileUpload = ({ label, subtitle, files = [], setFiles }) => {
  const { addToast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if ((files || []).length + selectedFiles.length > 5) {
      addToast('Maximum 5 floor plans allowed.', 'error');
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const form = new FormData();
          form.append('file', file);
          
          try {
            const res = await apiClient.post('/media/upload', form, {
              headers: { 'Content-Type': undefined },
            });
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
      setFiles((prev) => [...(Array.isArray(prev) ? prev : []), ...validUrls]);
      
      if (validUrls.length > 0) {
        addToast(`${validUrls.length} floor plans uploaded successfully.`, 'success');
      }
    } catch (error) {
      addToast('An error occurred during upload.', 'error');
    } finally {
      setUploading(false);
      // Reset input
      if (e.target) e.target.value = '';
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => (prev || []).filter((_, i) => i !== indexToRemove));
  };

  const currentFiles = Array.isArray(files) ? files : [];

  return (
    <div className="w-full space-y-4">
      {label && <FormLabel label={label} />}
      
      <div className="relative group">
        <input 
          type="file" 
          multiple 
          accept="image/*,application/pdf"
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
          disabled={uploading}
        />
        <div className={`
          border-2 border-dashed rounded-2xl p-10 transition-all duration-300 flex flex-col items-center justify-center gap-3
          ${uploading ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800' : 'bg-[#fafaf8] dark:bg-[#111827]/30 border-[#ece7d9] dark:border-slate-800 group-hover:border-[#ccab59] group-hover:bg-[#ccab59]/5'}
        `}>
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#ccab59] animate-spin" />
              <p className="text-[13px] font-bold text-[#ccab59]">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-[#ccab59]" />
              </div>
              <div className="text-center">
                <p className="text-[14px] text-slate-600 dark:text-slate-300">
                  Drop your files here or <span className="text-[#a38847] font-bold">browse</span>
                </p>
                {subtitle && <p className="text-[12px] text-slate-400 mt-1">{subtitle}</p>}
              </div>
            </>
          )}
        </div>
      </div>

      {/* File Previews */}
      {currentFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentFiles.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group p-3 bg-white dark:bg-slate-800 border border-[#ece7d9] dark:border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden flex-shrink-0">
                {url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                  <img src={url} alt="Preview" onError={(e) => { e.currentTarget.style.opacity = '0.3'; }} className="w-full h-full object-cover" />
                ) : (
                  <FileText size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">Floor Plan {index + 1}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#ccab59] hover:underline">View File</a>
              </div>
              <button 
                onClick={() => removeFile(index)}
                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
