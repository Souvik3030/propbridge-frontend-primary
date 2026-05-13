import React, { useEffect, useState } from 'react';
import api from '../../services/apiClient';
import { User, Shield, Building, Mail, Fingerprint, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const ApiTestPage = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setStatus('loading');
      try {
        const responseData = await api.get('/auth/me', { withCredentials: true });
        setUserData(responseData);
        setStatus('success');
      } catch (err) {
        console.error('Auth Test Failed:', err);
        setError(err.message || 'Failed to fetch user data. Are you logged in?');
        setStatus('error');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0d18] p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#ccab59]" />
              Authentication Diagnostics
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Verifying current session and permission context from <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[#ccab59]">/auth/me</code>
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Refresh Diagnostics
          </button>
        </div>

        {status === 'loading' && (
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl p-20 rounded-[2rem] border border-white dark:border-slate-800 shadow-2xl shadow-blue-500/5 flex flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-500/50" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">Establishing Secure Connection...</p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Interrogating authentication server for session data.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 dark:bg-red-500/5 p-12 rounded-[2rem] border border-red-100 dark:border-red-500/20 shadow-2xl shadow-red-500/5 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-2">Unauthorized or Network Error</h2>
            <p className="text-red-500/70 font-medium mb-8 max-w-sm">{error}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                Return to Login
              </button>
            </div>
          </div>
        )}

        {status === 'success' && userData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* User Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white dark:border-slate-800 shadow-2xl shadow-slate-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccab59]/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-800 p-1 mb-4 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-white/5">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.email)}`} 
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white capitalize mb-1">{userData.name}</h3>
                  <div className="px-3 py-1 bg-[#ccab59]/10 text-[#ccab59] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                    {userData.role}
                  </div>
                  
                  <div className="w-full space-y-4 text-left pt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fingerprint className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">User Identifier</p>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-500 truncate max-w-[180px]">{userData.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Company ID</p>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-500 truncate max-w-[180px]">{userData.company_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-emerald-500 text-sm font-black uppercase tracking-wider">Session Valid</p>
                  <p className="text-emerald-500/70 text-[11px] font-medium leading-tight">Your credentials have been successfully verified by the edge server.</p>
                </div>
              </div>
            </div>

            {/* Permissions Matrix Content */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white dark:border-slate-800 shadow-2xl shadow-slate-500/5 h-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-500" />
                    Permission Manifest
                  </h3>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {userData.permissions?.length || 0} Scopes Active
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userData.permissions?.map((permission, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 group hover:border-blue-500/30 transition-all"
                    >
                      <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center text-blue-500 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300 capitalize tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {permission}
                      </span>
                    </div>
                  ))}
                </div>

                {(!userData.permissions || userData.permissions.length === 0) && (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-50 italic">
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <p>No explicit permissions returned for this session.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            VortexWeb Platform Infrastructure — Session Registry
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: HTTPS/TLS 1.3</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payload: JSON/JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;
