import React from 'react';
import { FormCheckbox, FormInput, FormSelect } from './FormControls';

const DependentFields = ({ group, visible, required, formData, onChange, errors = {} }) => {
  if (!visible) return null;

  const showPermit = !group || group === 'permit';
  const showProperty = !group || group === 'property';
  const showPricing = !group || group === 'pricing';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* ■■ Permit Group ■■ */}
      {showPermit && visible.permitNumber && (
        <FormInput
          name="permitNumber"
          label={
            Number(formData.emirate_id) === 1 ? "RERA Permit Number" : 
            Number(formData.emirate_id) === 2 ? "ADREC Permit Number" : "Permit Number"
          }
          required={required.permitNumber}
          placeholder="e.g. 2024-12345"
          value={formData.permitNumber || ''}
          onChange={onChange}
          error={errors.permitNumber}
        />
      )}

      {showPermit && visible.building && (
        <FormInput
          name="building"
          label="Building / Tower Name"
          required={required.building}
          placeholder="e.g. Burj Khalifa"
          value={formData.building || ''}
          onChange={onChange}
          error={errors.building}
        />
      )}

      {/* ■■ Property Info Group ■■ */}
      {showProperty && (
        <>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormInput
                name="size"
                label="Property Size"
                required={required.size}
                placeholder="0.00"
                value={formData.size || formData.builtUpArea || ''}
                onChange={onChange}
                error={errors.size}
              />
            </div>
            <div className="w-32">
              <FormSelect
                name="size_unit"
                label="Unit"
                required={required.size_unit}
                value={formData.size_unit || 'sqft'}
                onChange={onChange}
                options={[
                  { value: 'sqft', label: 'Sq Ft' },
                  { value: 'sqm', label: 'Sq M' }
                ]}
                error={errors.size_unit}
              />
            </div>
          </div>

          {visible.bedrooms && (
            <FormSelect
              name="bedrooms"
              label="Bedrooms"
              required={required.bedrooms}
              value={formData.bedrooms ?? ''}
              onChange={onChange}
              options={[
                { value: '', label: 'Select' },
                { value: '0', label: 'Studio' },
                ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(n => ({ value: String(n), label: String(n) }))
              ]}
              error={errors.bedrooms}
            />
          )}

          {visible.bathrooms && (
            <FormSelect
              name="bathrooms"
              label="Bathrooms"
              required={required.bathrooms}
              value={formData.bathrooms ?? ''}
              onChange={onChange}
              options={[
                { value: '', label: 'Select' },
                { value: '0', label: 'None' },
                ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(n => ({ value: String(n), label: String(n) }))
              ]}
              error={errors.bathrooms}
            />
          )}

          <FormSelect
            name="furnished"
            label="Furnished Status"
            value={formData.furnished || 'unfurnished'}
            onChange={onChange}
            options={[
              { value: 'furnished', label: 'Furnished' },
              { value: 'unfurnished', label: 'Unfurnished' },
              { value: 'semi-furnished', label: 'Semi-furnished' }
            ]}
            error={errors.furnished}
          />

          <FormInput
            name="unitNumber"
            label="Unit Number"
            placeholder="e.g. 101"
            value={formData.unitNumber || ''}
            onChange={onChange}
            error={errors.unitNumber}
          />

          <FormInput
            name="parkings"
            label="Parking Spaces"
            placeholder="e.g. 1"
            value={formData.parkings || ''}
            onChange={onChange}
            error={errors.parkings}
          />

          {visible.floorNumber && (
            <FormInput
              name="floorNumber"
              label="Floor Number"
              placeholder="e.g. 5"
              value={formData.floorNumber || ''}
              onChange={onChange}
              error={errors.floorNumber}
            />
          )}

          {visible.numberOfFloors && (
            <FormInput
              name="numberOfFloors"
              label="Total Floors"
              placeholder="e.g. 1"
              value={formData.numberOfFloors || ''}
              onChange={onChange}
              error={errors.numberOfFloors}
            />
          )}

          {visible.plotSize && (
            <FormInput
              name="plotSize"
              label="Plot Size (sqft)"
              required={required.plotSize}
              placeholder="0.00"
              value={formData.plotSize || ''}
              onChange={onChange}
              error={errors.plotSize}
            />
          )}

          {visible.privatePool && (
            <FormSelect
              name="privatePool"
              label="Private Pool"
              required={required.privatePool}
              value={formData.privatePool ? 'true' : 'false'}
              onChange={(e) => onChange({ target: { name: 'privatePool', value: e.target.value === 'true', type: 'checkbox', checked: e.target.value === 'true' } })}
              options={[
                { value: 'false', label: 'No' },
                { value: 'true', label: 'Yes' }
              ]}
              error={errors.privatePool}
            />
          )}

          {visible.hotelName && (
            <FormInput
              name="hotelName"
              label="Hotel Name"
              required={required.hotelName}
              placeholder="Enter Hotel Name"
              value={formData.hotelName || ''}
              onChange={onChange}
              error={errors.hotelName}
            />
          )}

          {visible.zoningType && (
            <FormSelect
              name="zoningType"
              label="Zoning Type"
              required={required.zoningType}
              value={formData.zoningType || ''}
              onChange={onChange}
              options={[
                { value: '', label: 'Select Zoning' },
                { value: 'residential', label: 'Residential' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'mixed', label: 'Mixed Use' },
                { value: 'industrial', label: 'Industrial' }
              ]}
              error={errors.zoningType}
            />
          )}

          {visible.fitted && (
            <FormSelect
              name="fitted"
              label="Fitted Status"
              required={required.fitted}
              value={formData.fitted || 'no'}
              onChange={onChange}
              options={[
                { value: 'yes', label: 'Fully Fitted' },
                { value: 'no', label: 'Shell & Core' },
                { value: 'partially', label: 'Partially Fitted' }
              ]}
              error={errors.fitted}
            />
          )}

          <FormSelect
            name="finishing_type"
            label="Finishing Type"
            value={formData.finishing_type || ''}
            onChange={onChange}
            options={[
              { value: '', label: 'Select Finishing' },
              { value: 'fully-finished', label: 'Fully Finished' },
              { value: 'semi-finished', label: 'Semi Finished' },
              { value: 'unfinished', label: 'Unfinished' }
            ]}
            error={errors.finishing_type}
          />
        </>
      )}

      {/* ■■ Pricing Group ■■ */}
      {showPricing && (
        <>
          {visible.rentFrequency && (
            <FormSelect
              name="rentFrequency"
              label="Rent Period"
              required={required.rentFrequency}
              value={formData.rentFrequency || ''}
              onChange={onChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'yearly', label: 'Yearly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'daily', label: 'Daily' }
              ]}
              error={errors.rentFrequency}
            />
          )}

          {visible.cheques && (
            <FormSelect
              name="cheques"
              label="No. of Cheques"
              value={formData.cheques || ''}
              onChange={onChange}
              options={[
                { value: '', label: 'Select' },
                ...[1, 2, 3, 4, 6, 8, 12].map(val => ({ value: String(val), label: String(val) }))
              ]}
              error={errors.cheques}
            />
          )}

          <div className="flex items-center gap-4 py-4">
             <FormCheckbox 
               label="Short Term Rental" 
               id="short_term" 
               name="short_term" 
               checked={formData.short_term} 
               onChange={onChange} 
             />
          </div>

          {visible.availableFrom && (
            <FormInput
              name="availableFrom"
              label="Available From"
              type="date"
              value={formData.availableFrom || ''}
              onChange={onChange}
              error={errors.availableFrom}
            />
          )}

          {visible.ownershipType && (
            <FormSelect
              name="ownershipType"
              label="Ownership"
              required={required.ownershipType}
              value={formData.ownershipType || ''}
              onChange={onChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'freehold', label: 'Freehold' },
                { value: 'leasehold', label: 'Leasehold' }
              ]}
              error={errors.ownershipType}
            />
          )}
        </>
      )}

      {/* ■■ Off-Plan Group (Part of Property) ■■ */}
      {showProperty && visible.developer && (
        <FormInput
          name="developer"
          label="Developer Name"
          required={required.developer}
          placeholder="Enter Developer"
          value={formData.developer || ''}
          onChange={onChange}
          error={errors.developer}
        />
      )}

      {showProperty && visible.projectName && (
        <FormInput
          name="projectName"
          label="Project Name"
          required={required.projectName}
          placeholder="Enter Project Name"
          value={formData.projectName || ''}
          onChange={onChange}
          error={errors.projectName}
        />
      )}

      {showProperty && visible.completionDate && (
        <FormInput
          name="completionDate"
          label="Completion Date"
          type="date"
          required={required.completionDate}
          value={formData.completionDate || ''}
          onChange={onChange}
          error={errors.completionDate}
        />
      )}

      {showProperty && visible.paymentPlan && (
        <FormInput
          name="paymentPlan"
          label="Payment Plan Details"
          placeholder="Enter payment plan info..."
          value={formData.paymentPlan || ''}
          onChange={onChange}
          error={errors.paymentPlan}
        />
      )}
      {visible.userConfirmedDataIsCorrect && (
        <div className="col-span-full mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl">
          <FormCheckbox
            id="userConfirmedDataIsCorrect"
            name="userConfirmedDataIsCorrect"
            label="I confirm that all provided information is correct and matches REGA regulatory requirements."
            checked={formData.userConfirmedDataIsCorrect}
            onChange={onChange}
            error={errors.userConfirmedDataIsCorrect}
          />
        </div>
      )}
    </div>
  );
};


export default DependentFields;
