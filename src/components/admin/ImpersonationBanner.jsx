import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowLeftCircle, Loader2 } from 'lucide-react';
import { useLeaveImpersonation } from '../../hooks/useAdmin';
import { useAuth } from '../../context/AuthContext';

/**
 * Global administrative session banner — shown at the very top of the app
 * whenever the Superadmin is currently impersonating another user.
 */
const ImpersonationBanner = () => {
  const { user, isImpersonating } = useAuth();
  const { mutate: leave, isPending } = useLeaveImpersonation();

  if (!isImpersonating) return null;

  const handleLeave = () => {
    // Confirmation handled by the mutation's onSuccess redirect
    leave();
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white overflow-hidden z-50 flex-shrink-0 border-b border-white/10 shadow-xl">
      {/* Subtle organic pattern for premium feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Administrative Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-300 animate-ping absolute" />
            <div className="w-2 h-2 rounded-full bg-indigo-300 relative" />
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold min-w-0 tracking-tight">
            <Eye className="w-4 h-4 flex-shrink-0 text-indigo-300" />
            <span className="hidden sm:inline opacity-90">Executive Preview Active — Managing as</span>
            <span className="sm:hidden opacity-90">Managing as</span>
            <strong className="font-extrabold truncate text-white">{user?.name}</strong>
            <span className="px-2 py-0.5 bg-white/15 rounded-md text-[9px] font-black uppercase tracking-[0.1em] border border-white/20 flex-shrink-0">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Right: End Session Button */}
        <button
          onClick={handleLeave}
          disabled={isPending}
          className="flex-shrink-0 flex items-center gap-1.5 bg-white text-[#1e1b4b] hover:bg-slate-50 px-4 py-1.5 rounded-lg text-xs font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.1)] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <ArrowLeftCircle className="w-3.5 h-3.5" />
          )}
          End Administrator Session
        </button>
      </div>
    </div>
  );
};

export default ImpersonationBanner;
