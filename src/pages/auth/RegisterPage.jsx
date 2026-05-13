import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0d18] px-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ccab59]/5 rounded-full blur-3xl -mr-64 -mb-64 animate-pulse" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-blue-500/10 border border-white dark:border-slate-800 p-10">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-[#ccab59] rounded-xl flex items-center justify-center mx-auto text-white font-serif font-black text-2xl mb-4 shadow-lg shadow-[#ccab59]/20">V</div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight mb-2">Join VortexWeb</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Start your property investment journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none dark:text-white font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  autoComplete="username"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none dark:text-white font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none dark:text-white font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 px-1 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>By joining, you agree to our Terms and Privacy Policy.</span>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all hover:scale-[1.02] mt-4"
              loading={loading}
            >
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
            Already registered? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
