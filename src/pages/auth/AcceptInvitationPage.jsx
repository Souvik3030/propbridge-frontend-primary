import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, XCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

const AcceptInvitationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { acceptInvitation, isAuthenticated } = useAuth();
  
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  // VULN-14 fix: Block authenticated users from using invitation links.
  // VULN-04 fix: Scrub the token from the URL immediately after reading it
  // to prevent it from persisting in browser history, Referer headers, or
  // being captured by analytics/extension scripts.
  useEffect(() => {
    if (token) {
      window.history.replaceState(null, '', '/register');
    }
  }, [token]);

  const handlePasswordChange = (val) => {
    setFormData({ ...formData, password: val });
    setPasswordValidation({
      length: val.length >= 8,
      upper: /[A-Z]/.test(val),
      lower: /[a-z]/.test(val),
      number: /[0-9]/.test(val),
      special: /[^A-Za-z0-9]/.test(val)
    });
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // VULN-14 fix: If the user is already logged in, they should not be able
  // to complete a new invitation registration. Redirect them home.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      addToast('Invalid invitation link. No token found.', 'error');
      return;
    }

    if (!isPasswordValid) {
      addToast('Please meet all password requirements', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        token: token
      };

      // VULN-05 fix: Removed console.log that exposed the raw password and token.

      const success = await acceptInvitation(payload);
      if (success) {
        setIsRegistered(true);
      }
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-[#0a0d18] px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2rem] p-10 shadow-2xl text-center z-10">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic">Missing Access Token</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">This registration link is incomplete. Please check your invitation email.</p>
          <Link to="/login" className="inline-flex items-center text-[#ccab59] font-black hover:underline uppercase tracking-widest text-[10px]">
            Go to Login <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0d18] px-4">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mt-64 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ccab59]/5 rounded-full blur-3xl -mr-64 -mb-64 animate-pulse" />

        <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 rounded-[2rem] p-10 shadow-2xl text-center relative z-10">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tight">Registration Complete</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
            Your account has been created successfully. <br/>
            <span className="block mt-4 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              Please verify your email address before logging in.
            </span>
          </p>
          <Link to="/login" className="inline-flex items-center justify-center w-full py-4 text-white bg-[#ccab59] hover:bg-[#b0944d] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#ccab59]/20 transition-all hover:scale-[1.02]">
            Go to Login <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0d18] px-4 pb-12 pt-8">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ccab59]/5 rounded-full blur-3xl -mr-64 -mb-64 animate-pulse" />

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-white dark:border-slate-800 p-8 md:p-12">
          
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-[#ccab59] rounded-2xl flex items-center justify-center mx-auto text-white font-serif font-black text-3xl mb-6 shadow-lg shadow-[#ccab59]/20 italic">V</div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tight mb-2">
              Finalize Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your details to complete registration.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70 italic">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ccab59] transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-[#ccab59]/10 focus:border-[#ccab59] transition-all outline-none dark:text-white font-bold"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70 italic">Choose Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ccab59] transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-[#ccab59]/10 focus:border-[#ccab59] transition-all outline-none dark:text-white font-bold"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#ccab59] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70 italic">Confirm Security Phrase</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ccab59] transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-[#ccab59]/10 focus:border-[#ccab59] transition-all outline-none dark:text-white font-bold"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#ccab59] transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Checklist */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Security Requirements</div>
              <div className={`flex items-center gap-2 text-[10px] font-bold ${passwordValidation.length ? 'text-emerald-500' : 'text-slate-400'}`}>
                {passwordValidation.length ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current opacity-30" />}
                8+ Characters
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-bold ${passwordValidation.upper ? 'text-emerald-500' : 'text-slate-400'}`}>
                {passwordValidation.upper ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current opacity-30" />}
                Uppercase Letter
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-bold ${passwordValidation.lower ? 'text-emerald-500' : 'text-slate-400'}`}>
                {passwordValidation.lower ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current opacity-30" />}
                Lowercase Letter
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-bold ${passwordValidation.number ? 'text-emerald-500' : 'text-slate-400'}`}>
                {passwordValidation.number ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current opacity-30" />}
                Number
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-bold ${passwordValidation.special ? 'text-emerald-500' : 'text-slate-400'}`}>
                {passwordValidation.special ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current opacity-30" />}
                Special Character
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-5 bg-[#ccab59] hover:bg-[#b0944d] text-white font-black rounded-2xl shadow-xl shadow-[#ccab59]/20 flex items-center justify-center gap-2 group transition-all hover:scale-[1.02] mt-4 uppercase tracking-widest text-xs"
              loading={submitting}
              disabled={!isPasswordValid || !formData.name || formData.password !== formData.confirmPassword}
            >
              Complete Registration <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-tighter italic">
            Secure Enterprise Encryption Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitationPage;
