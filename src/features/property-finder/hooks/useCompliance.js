import { z } from 'zod';
import { useMemo } from 'react';
import { EMIRATES, PROPERTY_TYPES, CATEGORIES } from '../constants';

/**
 * Zod Validation Schema for Property Finder Listing
 * Implements dynamic conditional logic using superRefine.
 */
export const listingSchema = z.object({
  emirate: z.enum([EMIRATES.DUBAI, EMIRATES.ABU_DHABI, EMIRATES.NORTHERN_EMIRATES]),
  
  permit_number: z.string()
    .min(3, 'Permit number is required')
    .max(50, 'Permit number too long'),
  
  license_number: z.string().optional(),

  pf_location_id: z.number({ required_error: 'Location is required' }),
  
  category: z.enum([CATEGORIES.RESIDENTIAL, CATEGORIES.COMMERCIAL]),
  
  type: z.string().min(1, 'Property type is required'),
  
  purpose: z.enum(['sale', 'rent']),
  
  title_en: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(255, 'Title too long'),
  
  description_en: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description too long'),
  
  price: z.coerce.number()
    .min(1, 'Price must be greater than 0'),
  
  size: z.coerce.number()
    .min(1, 'Size must be greater than 0'),
  
  size_unit: z.enum(['sqft', 'sqm']),
  
  images: z.array(z.string().url())
    .min(1, 'At least 1 image is required')
    .max(30, 'Maximum 30 images allowed'),
  
  bedrooms: z.coerce.number().optional().nullable(),
  bathrooms: z.coerce.number().optional().nullable(),
}).superRefine((data, ctx) => {
  // Conditional validation: License Number (ORN) Required for Dubai and Abu Dhabi
  if ([EMIRATES.DUBAI, EMIRATES.ABU_DHABI].includes(data.emirate)) {
    if (!data.license_number || data.license_number.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Broker License (ORN) is required for Dubai and Abu Dhabi',
        path: ['license_number'],
      });
    }
  }
});

/**
 * useCompliance Hook
 * Returns the stable listing schema.
 */
export const usePFSchema = () => {
  return useMemo(() => listingSchema, []);
};

/**
 * Helper to get available property types for a chosen category
 */
export const getPropertyTypes = (category) => {
  return PROPERTY_TYPES[category] || [];
};
