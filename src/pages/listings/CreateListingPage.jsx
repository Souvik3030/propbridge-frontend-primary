import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Check,
  Loader2,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useListingSync } from '../../features/property-finder/hooks/useListingSync';
import { CATEGORIES, PROJECT_STATUS_OPTIONS } from '../../features/property-finder/constants';

// UI Components
import FormSection from '../../components/features/listings/form/FormSection';
import { FormInput, FormSelect, FormTextArea, FormCheckbox, FormRadio } from '../../components/features/listings/form/FormControls';
import PFLocationSearch from '../../features/property-finder/components/PFLocationSearch';
import ImageUpload from '../../components/features/listings/form/ImageUpload';
import FileUpload from '../../components/features/listings/form/FileUpload';
import DependentFields from '../../components/features/listings/form/DependentFields';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    formData,
    setFormData,
    handleInputChange,
    handlePFLocationSelect,
    toggleAmenity,
    availableTypes,
    availableAmenities,
    syncListing,
    isPending,
    agents,
    visibleFields,
    requiredFields,
    errors,
    complianceStatus,
    handleFetchCompliance
  } = useListingSync();

  const handleSave = async () => {
    const result = await syncListing();
    if (result && result.id) {
      addToast('Listing created successfully!', 'success');
      navigate(`/listings/success/${result.id}`);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#f3efe6]/80 dark:bg-[#0a0d18]/80 backdrop-blur-md z-10 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[#ccab59] font-bold text-[14px] hover:opacity-80 transition-opacity"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            <h1 className="text-[24px] font-black text-slate-900 dark:text-white tracking-tight">Create Listing</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-[14px] border border-[#ece7d9] dark:border-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="px-6 py-2.5 bg-[#ccab59] text-white rounded-xl font-black text-[14px] flex items-center gap-2 hover:bg-[#b89a4f] transition-colors shadow-lg shadow-[#ccab59]/20"
            >
              {isPending ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              Create Listing
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Location Section */}
          <FormSection title="Location" subtitle="Property mapping and location details">
            <div className="space-y-6">
              <PFLocationSearch
                selectedLocation={formData.pf_location_name}
                onSelect={handlePFLocationSelect}
              />

              {formData.pf_location_id && (
                <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-900/40 border border-[#ece7d9] dark:border-slate-800 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#ece7d9] dark:border-slate-800/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ccab59]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-800 dark:text-slate-200">Verified Location Details</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Emirate', value: formData.emirate || formData.uae_emirate },
                      { label: 'City', value: formData.pf_city },
                      { label: 'Community', value: formData.pf_community },
                      { label: 'Sub-Community', value: formData.pf_subcommunity },
                      { label: 'Building / Tower', value: formData.pf_building },
                      { label: 'Latitude', value: formData.latitude },
                      { label: 'Longitude', value: formData.longitude },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</p>
                        <div className="text-[13px] font-bold text-slate-700 dark:text-slate-200 truncate">
                          {value || <span className="text-slate-300 dark:text-slate-600 font-normal italic">Not specified</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FormSection>

          {/* Compliance Section */}
          <FormSection title="Compliance/Permits" subtitle="Required permits and licenses">
            {formData.is_exempt_area ? (
              <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-3xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="text-[14px] font-black text-blue-800 dark:text-blue-300">Permit Exemption Area</h3>
                  <p className="text-[12px] font-medium text-blue-600/80">This location is exempt from standard permit requirements.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <FormInput
                    name="permitNumber"
                    label={Number(formData.emirate_id) === 2 ? "ADREC Permit Number" : "DLD Permit Number"}
                    placeholder="Enter permit number"
                    value={formData.permitNumber || ''}
                    onChange={handleInputChange}
                    error={errors.permitNumber}
                  />
                  <button
                    type="button"
                    onClick={handleFetchCompliance}
                    disabled={complianceStatus === 'loading' || !formData.permitNumber}
                    className={`h-[48px] px-6 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all border ${complianceStatus === 'loading'
                        ? 'bg-slate-100 text-slate-400 border-slate-200'
                        : complianceStatus === 'success'
                          ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                          : 'bg-[#ccab59] text-white border-[#ccab59] hover:shadow-lg'
                      }`}
                  >
                    {complianceStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                    {complianceStatus === 'success' ? 'Verified' : 'Verify Permit'}
                  </button>
                  <FormInput
                    name="advertisement_number"
                    label="Ad Number (RERA/DTCM)"
                    placeholder="Enter Ad Number"
                    value={formData.advertisement_number || ''}
                    onChange={handleInputChange}
                    error={errors.advertisement_number}
                  />
                </div>
              </div>
            )}
          </FormSection>

          {/* Basic Info Section */}
          <FormSection title="Basic Info" subtitle="General listing details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput name="referenceNo" label="Reference No." required value={formData.referenceNo} readOnly error={errors.referenceNo} />
              <FormSelect
                name="purpose"
                label="Type"
                required
                value={formData.purpose}
                onChange={handleInputChange}
                options={['Rent', 'Sale']}
                error={errors.purpose}
              />
              <FormSelect
                name="category"
                label="Category"
                required
                value={formData.category}
                onChange={handleInputChange}
                options={[
                  { value: CATEGORIES.RESIDENTIAL, label: 'Residential' },
                  { value: CATEGORIES.COMMERCIAL, label: 'Commercial' },
                  { value: 'off_plan', label: 'Off-Plan' }
                ]}
                error={errors.category}
              />
              <FormSelect
                name="propertyType"
                label="Property Type"
                required
                value={formData.propertyType}
                onChange={handleInputChange}
                options={availableTypes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ') }))}
                error={errors.propertyType}
              />
              <FormSelect
                name="projectStatus"
                label="Project Status"
                required
                value={formData.projectStatus}
                onChange={handleInputChange}
                options={PROJECT_STATUS_OPTIONS}
                error={errors.projectStatus}
              />
            </div>
          </FormSection>

          {/* Pricing Section */}
          <FormSection title="Pricing" subtitle="Set pricing and rental details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <FormInput
                name="price"
                label="Price"
                required
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                error={errors.price}
              />
              <FormSelect
                name="price_currency"
                label="Currency"
                required
                value={formData.price_currency || 'AED'}
                onChange={handleInputChange}
                options={['AED', 'SAR', 'BHD', 'QAR', 'USD']}
              />
              <div className="flex items-center h-[48px]">
                <FormCheckbox
                  id="price_on_request"
                  name="price_on_request"
                  label="Price on Request"
                  checked={formData.price_on_request || false}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[#ece7d9] dark:border-slate-800/50">
              <DependentFields
                group="pricing"
                visible={visibleFields}
                required={requiredFields}
                formData={formData}
                onChange={handleInputChange}
                errors={errors}
              />
            </div>
          </FormSection>

          {/* Property Details Section */}
          <FormSection title="Property Details" subtitle="Full property specifications">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="titleEn" label="Title (English)" required value={formData.titleEn} onChange={handleInputChange} error={errors.titleEn} />
                <FormInput name="titleAr" label="Title (Arabic)" dir="rtl" value={formData.titleAr} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormTextArea name="descEn" label="Description (English)" required value={formData.descEn} onChange={handleInputChange} error={errors.descEn} />
                <FormTextArea name="descAr" label="Description (Arabic)" dir="rtl" value={formData.descAr} onChange={handleInputChange} />
              </div>
              <div className="mt-8 pt-8 border-t border-[#ece7d9] dark:border-slate-800/50">
                <DependentFields
                  group="property"
                  visible={visibleFields}
                  required={requiredFields}
                  formData={formData}
                  onChange={handleInputChange}
                  errors={errors}
                />
              </div>
              <div className="mt-8 pt-8 border-t border-[#ece7d9] dark:border-slate-800/50">
                <p className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-4">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.map(amenity => (
                    <button
                      key={amenity.value}
                      type="button"
                      onClick={() => toggleAmenity(amenity.value)}
                      className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all border ${formData.amenities.includes(amenity.value)
                          ? 'bg-[#ccab59] border-[#ccab59] text-white shadow-md'
                          : 'bg-white dark:bg-[#111827] border-[#ece7d9] dark:border-slate-800 text-slate-600'
                        }`}
                    >
                      {amenity.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Media Section */}
          <FormSection title="Media" subtitle="Upload photos, floor plans and links">
            <ImageUpload
              images={formData.images}
              setImages={(update) => setFormData(prev => ({
                ...prev,
                images: typeof update === 'function' ? update(prev.images || []) : update
              }))}
            />
            {errors.images && <p className="mt-2 text-red-500 text-[12px] font-bold">{errors.images}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <FormInput name="virtual_tour_url" label="Virtual Tour URL" value={formData.virtual_tour_url} onChange={handleInputChange} />
              <FileUpload
                label="Floor Plans"
                files={formData.floor_plans}
                setFiles={(update) => setFormData(prev => ({
                  ...prev,
                  floor_plans: typeof update === 'function' ? update(prev.floor_plans || []) : update
                }))}
              />
            </div>
          </FormSection>

          {/* Agent Section */}
          <FormSection title="Agent Info" subtitle="Agent and owner details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormSelect
                name="agent_id"
                label="Listing Agent"
                required
                value={formData.agent_id}
                onChange={handleInputChange}
                options={agents.map(a => ({ value: a.publicProfile_id, label: a.name }))}
                error={errors.agent_id}
              />
              <FormSelect
                name="owner"
                label="Listing Owner"
                required
                value={formData.owner}
                onChange={handleInputChange}
                options={['Select Owner', 'VortexWeb Properties', 'Private Owner']}
              />
            </div>
          </FormSection>

          {/* Publishing Section */}
          <FormSection title="Publishing Status">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Live', 'Unpublish', 'Save as Draft', 'Archived'].map(status => (
                <FormRadio
                  key={status}
                  label={status}
                  id={status}
                  name="status"
                  checked={formData.status === status}
                  onChange={() => setFormData(prev => ({ ...prev, status }))}
                />
              ))}
            </div>
          </FormSection>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold border border-[#ece7d9] dark:border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-10 py-3 bg-[#ccab59] text-white rounded-xl font-black text-[15px] flex items-center gap-2 hover:bg-[#b89a4f] shadow-xl shadow-[#ccab59]/30"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            Create Listing
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateListingPage;
