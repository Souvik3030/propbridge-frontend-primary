import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fafafa] dark:bg-[#0a101f] px-4">
      {/* ── CLEAN BACKGROUND AMBIANCE ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-[#ccab59]/10 dark:bg-[#ccab59]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-slate-100 dark:bg-white/[0.01] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
        
        {/* Simple Professional Branding */}
        <div className="text-center mb-12">
            {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ccab59] text-white font-serif font-black text-2xl mb-6 shadow-xl shadow-[#ccab59]/20 border border-white/20">
                P
            </div> */}
            <h1 className="text-2xl font-serif font-black text-slate-900 dark:text-white tracking-widest uppercase mb-1">
                Prop<span className="text-[#ccab59]">Bridge</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                Property Management Platform
            </p>
        </div>

        {/* ── MINIMAL LOGIN CARD ── */}
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-black/5 dark:shadow-black/20 border border-slate-200/60 dark:border-white/5 p-10">
          
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Sign In
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-medium italic">Secure access to your enterprise dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#ccab59] transition-colors">
                  <Mail className="w-5 h-5 ml-1" />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="email@propbridge.com"
                  autoComplete="username"
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 rounded-2xl focus:ring-4 focus:ring-[#ccab59]/10 focus:border-[#ccab59]/40 transition-all outline-none dark:text-white font-bold text-sm placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-[#ccab59] hover:underline underline-offset-2">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#ccab59] transition-colors">
                  <Lock className="w-5 h-5 ml-1" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 rounded-2xl focus:ring-4 focus:ring-[#ccab59]/10 focus:border-[#ccab59]/40 transition-all outline-none dark:text-white font-bold text-sm placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-[#ccab59] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
                <Button 
                type="submit" 
                className="w-full py-4 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 group transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest text-[11px]"
                loading={loading}
                >
                Log In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
          </form>
        </div>
        
        {/* Simple Professional Footer */}
        <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.1em]">
                <ShieldCheck className="w-3.5 h-3.5" />
                PropBridge Secured Session &bull; &copy; 2026 
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
