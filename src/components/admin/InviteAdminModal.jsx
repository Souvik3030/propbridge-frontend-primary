import React, { useState } from 'react';
import { Mail, Loader2, X, Send, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useInviteAdmin } from '../../hooks/useAdmin';

const ROLES = [
  { id: 'admin', name: 'Administrator' },
  { id: 'agent', name: 'Listing Agent' },
  { id: 'owner', name: 'Listing Owner' }
];

const InviteAdminModal = ({ isOpen, onClose, companyName, companyId, hasAdmin, showInviteLater = false }) => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [error, setError] = useState('');

  const { 
    mutateAsync: inviteMutation, 
    isPending: isSubmitting 
  } = useInviteAdmin();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required');
      return;
    }

    setError('');
    try {
      await inviteMutation({
        email,
        role: selectedRole,
        company_id: companyId,
        is_send_now: true
      });
      
      addToast(`Invitation sent successfully`, 'success');
      onClose();
    } catch (err) {
      if (err.status === 422 && err.data?.errors?.email) {
        setError(err.data.errors.email[0]);
      } else {
        setError(err.message || 'Failed to send invitation.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Viewport Boundary Wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        
        {/* Fixed Backdrop that always covers the screen */}
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
        
        {/* Simple Modal Card */}
        <div className="relative bg-white dark:bg-slate-900 w-full text-left max-w-md rounded-3xl shadow-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-1">
                {hasAdmin ? 'Invite Team Member' : 'Invite Admin'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Onboard a new user to <span className="text-[#ccab59] font-medium">{companyName || 'the company'}</span>.
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Recipient Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="admin@example.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border ${error ? 'border-red-400' : 'border-slate-100 dark:border-white/5'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#ccab59]/20 transition-all placeholder:text-slate-300 dark:text-white`}
                />
              </div>
              {error && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1">{error}</p>}
            </div>

            {/* Simple Role Select - Conditional */}
            {hasAdmin && (
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Assigned Role
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#ccab59] transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] focus:outline-none focus:border-[#ccab59]/40 focus:ring-4 focus:ring-[#ccab59]/5 transition-all appearance-none cursor-pointer text-slate-600 dark:text-slate-400 shadow-sm"
                  >
                    {ROLES.map((role) => (
                      <option key={role.id} value={role.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans uppercase tracking-widest text-[10px]">
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within:text-[#ccab59] transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#ccab59] hover:bg-[#b0944d] disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#ccab59]/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Invitation
                  </>
                )}
              </button>

              {showInviteLater && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-[11px] uppercase tracking-widest transition-colors flex items-center justify-center"
                >
                  Invite Later
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="px-8 py-4 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Recipient will receive setup instructions via email
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default InviteAdminModal;
