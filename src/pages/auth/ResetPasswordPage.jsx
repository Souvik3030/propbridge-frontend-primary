import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Loader2, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    const navigate = useNavigate();

    // VULN-04 fix: Scrub token and email from the URL immediately after reading
    // them to prevent persistence in browser history and Referer header leakage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (token || email) {
        window.history.replaceState(null, '', '/reset-password');
      }
    }, []);

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { resetPassword } = useAuth();
    
    // View toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password validation logic
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false
    });

    const handlePasswordChange = (val) => {
        setPassword(val);
        setPasswordValidation({
            length: val.length >= 8,
            upper: /[A-Z]/.test(val),
            lower: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[^A-Za-z0-9]/.test(val)
        });
    };

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isPasswordValid) {
            setError('Please meet all password requirements before submitting.');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('Passwords do not match. Please verify your entry.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await resetPassword({
                token: token,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });

            setMessage(response.data?.message || response.message || 'Your password has been reset successfully.');
            
            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (err) {
            if (err.response?.status === 422) {
                setError(err.response.data?.message || 'Validation failed. Check your password requirements.');
            } else {
                setError('An error occurred. The link may have expired or is invalid.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0d18] px-4">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl -ml-64 -mt-64 animate-pulse" />
                <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 rounded-[2rem] p-10 shadow-2xl relative z-10 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic">Invalid Link Detected</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">This password reset link is missing required security tokens. Please request a new recovery link.</p>
                    <Link to="/forgot-password" className="inline-flex items-center justify-center w-full py-4 text-white bg-[#ccab59] hover:bg-[#b0944d] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#ccab59]/20 transition-all hover:scale-[1.02]">
                        Request New Link <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0d18] px-4 pb-12 pt-8">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mt-64 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ccab59]/5 rounded-full blur-3xl -mr-64 -mb-64 animate-pulse" />

            <div className="w-full max-w-xl relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-white dark:border-slate-800 p-8 md:p-12">
                    
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-[#ccab59] rounded-2xl flex items-center justify-center mx-auto text-white font-serif font-black text-3xl mb-6 shadow-lg shadow-[#ccab59]/20 italic">V</div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tight mb-2">
                            New Password
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Securing account for <strong className="text-slate-700 dark:text-slate-300">{email}</strong></p>
                    </div>

                    {message && (
                        <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center text-center gap-3 animate-in fade-in slide-in-from-top-2 justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <p className="text-emerald-700 dark:text-emerald-400 text-sm font-bold">{message}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-red-700 dark:text-red-400 text-[13px] font-bold leading-relaxed">{error}</p>
                        </div>
                    )}

                    {!message && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70 italic">New Password</label>
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
                                            value={password}
                                            onChange={(e) => handlePasswordChange(e.target.value)}
                                            disabled={isLoading}
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

                                {/* Confirm New Password */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70 italic">Confirm New Password</label>
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
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            disabled={isLoading}
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
                            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 grid grid-cols-2 gap-x-4 gap-y-3 mt-2">
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

                            <button 
                                type="submit" 
                                disabled={isLoading || !isPasswordValid || password !== passwordConfirmation}
                                className="w-full py-4 relative group overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed bg-[#ccab59] shadow-xl shadow-[#ccab59]/20 flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest mt-4"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ccab59] to-[#b0944d] opacity-100 transition-opacity" />
                                <div className="relative flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Encrypting & Saving...
                                        </>
                                    ) : (
                                        <>
                                            Update Password
                                            <ShieldCheck className="w-4 h-4 ml-1" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
