import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            // Using the application's auth context for isolated API management
            const response = await forgotPassword(email);
            setMessage(response.data?.message || response.message || 'If this email exists in our system, a reset link has been sent.');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'We could not process your request at this time. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0d18] px-4">
            {/* Minimal Premium Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mt-64 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ccab59]/5 rounded-full blur-3xl -mr-64 -mb-64 animate-pulse" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-blue-500/10 transition-all duration-500">
                    
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 bg-[#ccab59] rounded-2xl flex items-center justify-center mx-auto text-white font-serif font-black text-3xl mb-6 shadow-lg shadow-[#ccab59]/20 italic">
                            V
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight mb-2">
                            Reset Password
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-xs mx-auto">
                            Enter your verified email address to receive a secure recovery link.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <p className="text-emerald-700 dark:text-emerald-400 text-[13px] font-bold leading-relaxed">{message}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-red-700 dark:text-red-400 text-[13px] font-bold leading-relaxed">{error}</p>
                        </div>
                    )}

                    {!message ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider opacity-70 italic">
                                    Account Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ccab59] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="admin@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-[#ccab59]/10 focus:border-[#ccab59] transition-all outline-none dark:text-white font-bold placeholder:font-medium placeholder:text-slate-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading || !email}
                                className="w-full py-4 relative group overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed bg-[#ccab59] shadow-xl shadow-[#ccab59]/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ccab59] to-[#b0944d] opacity-100 transition-opacity" />
                                <div className="relative flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            Request Reset Link
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    ) : (
                        <div className="pt-2 pb-4 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm italic font-medium">
                                Please check your inbox and verify the secure link provided to regain access.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-800/50">
                        <Link to="/login" className="inline-flex items-center text-slate-400 hover:text-[#ccab59] transition-colors text-xs font-black uppercase tracking-widest group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Return to Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
