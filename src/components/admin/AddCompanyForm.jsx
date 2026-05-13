import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import InviteAdminModal from './InviteAdminModal';
import { useCreateCompany } from '../../hooks/useAdmin';

// VULN-09 fix: Validate logo_url is a safe HTTPS URL before submitting.
// This prevents javascript: URIs, data: URIs, and HTTP (non-TLS) image sources
// from being stored and later rendered in <img> tags across the admin UI.
const validateLogoUrl = (url) => {
  if (!url || url.trim() === '') return true; // field is optional
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false; // not a valid URL at all
  }
};

const AddCompanyForm = () => {
  const { addToast } = useToast();
  const [errors, setErrors] = useState({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyId, setNewCompanyId] = useState(null);

  const { 
    mutateAsync: createCompanyMutation, 
    isPending: isSubmitting 
  } = useCreateCompany();

  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    plan: 'Free',
    logo_url: '',
    pf_api_key: '',
    bitrix_oauth_token: '',
    currency: 'AED',
    timezone: 'Asia/Dubai',
    is_active: 'true'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // VULN-09: Validate logo URL on the client before sending to backend.
      if (formData.logo_url && !validateLogoUrl(formData.logo_url)) {
        setErrors(prev => ({ ...prev, logo_url: ['Logo URL must be a valid HTTPS URL (e.g. https://assets.com/logo.png).'] }));
        addToast('Please correct the highlighted errors', 'error');
        return;
      }

      const payload = {
        name: formData.name,
        domain: formData.domain,
        plan: formData.plan.toLowerCase(),
        logo_url: formData.logo_url,
        pf_api_key: formData.pf_api_key,
        bitrix_oauth_token: formData.bitrix_oauth_token,
        settings: {
          theme: 'dark',
          currency: formData.currency,
          timezone: formData.timezone
        },
        is_active: formData.is_active === 'true'
      };

      const response = await createCompanyMutation(payload);
      addToast(response.message || 'Company created successfully!', 'success');
      
      const companyData = response.company || response.data || response;
      setNewCompanyName(companyData?.name || payload.name);
      setNewCompanyId(companyData?.id);
      setShowInviteModal(true);

      setFormData({
        name: '',
        domain: '',
        plan: 'Free',
        logo_url: '',
        pf_api_key: '',
        bitrix_oauth_token: '',
        currency: 'AED',
        timezone: 'Asia/Dubai',
        is_active: 'true'
      });

    } catch (error) {
      if (error.status === 422 && error.data?.errors) {
        setErrors(error.data.errors);
        addToast('Please correct the highlighted errors', 'error');
      } else {
        const msg = error.message || 'Failed to create company';
        addToast(msg, 'error');
      }
    }
  };

  const renderError = (field) => {
    const errorArr = errors[field];
    if (!errorArr || !errorArr.length) return null;
    return (
      <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
        {errorArr[0]}
      </p>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200/50 dark:border-white/5 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500 text-left"
      >
        <h3 className="text-[#ccab59] font-serif font-bold text-xl mb-6">
          Add New Company
        </h3>

        <div className="space-y-6">
          {/* Row 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Company Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Company LLC"
                className={`w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.name ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-300 dark:text-white`}
              />
              {renderError('name')}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Domain
              </label>
              <input
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                type="text"
                placeholder="company.com"
                autoComplete="off"
                className={`w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.domain ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-300 dark:text-white`}
              />
              {renderError('domain')}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Plan
              </label>
              <div className="relative">
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.plan ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all dark:text-white`}
                >
                  <option>Free</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {renderError('plan')}
            </div>
          </div>

          {/* Row 2: Integrations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Logo URL
              </label>
              <input
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                type="text"
                placeholder="https://assets.com/logo.png"
                className={`w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.logo_url ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-300 dark:text-white`}
              />
              {renderError('logo_url')}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                PF API KEY
              </label>
              <input
                name="pf_api_key"
                value={formData.pf_api_key}
                onChange={handleChange}
                type="password"
                placeholder="••••••••••••••••"
                autoComplete="off"
                className={`w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.pf_api_key ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-300 dark:text-white`}
              />
              {renderError('pf_api_key')}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                BitrixOauth Token
              </label>
              <input
                name="bitrix_oauth_token"
                value={formData.bitrix_oauth_token}
                onChange={handleChange}
                type="password"
                placeholder="••••••••••••••••"
                autoComplete="off"
                className={`w-full px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.bitrix_oauth_token ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-slate-300 dark:text-white`}
              />
              {renderError('bitrix_oauth_token')}
            </div>
          </div>

          {/* Row 3: Settings & Submit */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Currency
              </label>
              <div className="relative">
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors['settings.currency'] ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all dark:text-white`}
                >
                  <option value="AED">AED - UAE Dirham</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-[1.5px] -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {renderError('settings.currency')}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Timezone
              </label>
              <div className="relative">
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors['settings.timezone'] ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all dark:text-white`}
                >
                  <option value="Asia/Dubai">(GMT+04:00) Dubai</option>
                  <option value="UTC">UTC / GMT</option>
                  <option value="Europe/London">(GMT+00:00) London</option>
                  <option value="America/New_York">(GMT-05:00) New York</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-[1.5px] -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {renderError('settings.timezone')}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                Status
              </label>
              <div className="relative">
                <select
                  name="is_active"
                  value={formData.is_active}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-3 bg-[#fcfcfc] dark:bg-slate-800/50 border ${errors.is_active ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 dark:border-white/5 focus:ring-[#ccab59]/20'} rounded-xl text-sm focus:outline-none focus:ring-4 transition-all dark:text-white`}
                >
                  <option value="true">Active (True)</option>
                  <option value="false">Inactive (False)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-[1.5px] -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {renderError('is_active')}
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[46px] bg-[#ccab59] disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-xl flex items-center justify-center hover:bg-[#b0944d] transition-all hover:scale-[1.02] shadow-lg shadow-[#ccab59]/20 disabled:shadow-none disabled:scale-100"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-1" strokeWidth={3} />
                    <span className="font-bold text-sm">Create Company</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      <InviteAdminModal 
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        companyName={newCompanyName}
        companyId={newCompanyId}
        showInviteLater={true}
      />
    </>
  );
};

export default AddCompanyForm;
