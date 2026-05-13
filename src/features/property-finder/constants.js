/**
 * Property Finder Integration Constants
 * Consistent with DLD (Dubai Land Department) and ADREC (Abu Dhabi Real Estate Centre) requirements.
 */

export const EMIRATES = {
  DUBAI: 'dubai',
  ABU_DHABI: 'abu_dhabi',
  NORTHERN_EMIRATES: 'northern_emirates',
};

export const EMIRATE_OPTIONS = [
  { value: EMIRATES.DUBAI, label: 'Dubai (DLD)', licenseRequired: true },
  { value: EMIRATES.ABU_DHABI, label: 'Abu Dhabi (ADREC)', licenseRequired: true },
  { value: EMIRATES.NORTHERN_EMIRATES, label: 'Northern Emirates', licenseRequired: false },
];

export const CATEGORIES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
};

export const PROPERTY_TYPES = {
  [CATEGORIES.RESIDENTIAL]: [
    'apartment', 'villa', 'townhouse', 'penthouse', 'compound', 
    'duplex', 'full_floor', 'half_floor', 'whole_building', 'land',
    'rest_house', 'chalet', 'farm', 'twin_house', 'cabin', 'ivilla',
    'hotel_apartment', 'palace', 'bungalow', 'roof', 'bulk_sale_unit',
    'bulk_rent_unit'
  ],
  [CATEGORIES.COMMERCIAL]: [
    'office_space', 'shop', 'warehouse', 'showroom', 'labor_camp', 
    'factory', 'whole_building', 'land', 'restaurant', 'co_working_space',
    'retail', 'staff_accommodation', 'medical_facility', 'clinic',
    'cafeteria', 'business_center', 'full_floor', 'half_floor'
  ]
};

export const PURPOSES = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

export const SIZE_UNITS = [
  { value: 'sqft', label: 'Sq Ft' },
  { value: 'sqm', label: 'Sq M' },
];

export const COMPLIANCE_STATUS = {
  PENDING: 'pending',
  PASSED: 'passed',
  FAILED: 'failed',
};

export const PUBLICATION_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
};

export const PROJECT_STATUS_OPTIONS = [
  { value: 'completed', label: 'Completed' },
  { value: 'off_plan', label: 'Off-Plan' },
  { value: 'completed_primary', label: 'Completed (Primary)' },
  { value: 'off_plan_primary', label: 'Off-Plan (Primary)' },
];

export const PF_COUNTRIES = {
  UAE: 'uae',
  EGYPT: 'egypt',
  BAHRAIN: 'bahrain',
  SAUDI_ARABIA: 'saudi_arabia',
  QATAR: 'qatar',
};

export const PF_CURRENCY_COUNTRY = {
  AED: PF_COUNTRIES.UAE,
  EGP: PF_COUNTRIES.EGYPT,
  BHD: PF_COUNTRIES.BAHRAIN,
  SAR: PF_COUNTRIES.SAUDI_ARABIA,
  QAR: PF_COUNTRIES.QATAR,
};

export const normalizePFSlug = (value) => {
  const normalized = value?.toLowerCase?.().trim().replace(/\s+/g, '-').replace(/_/g, '-');
  if (!normalized) return '';

  const aliases = {
    office: 'office-space',
    showroom: 'show-room',
  };

  return aliases[normalized] || normalized;
};

export const PF_AMENITY_OPTIONS = [
  { value: 'central-ac', label: 'Central A/C' },
  { value: 'built-in-wardrobes', label: 'Built-in Wardrobes' },
  { value: 'kitchen-appliances', label: 'Kitchen Appliances' },
  { value: 'security', label: 'Security' },
  { value: 'concierge', label: 'Concierge' },
  { value: 'private-gym', label: 'Private Gym' },
  { value: 'shared-gym', label: 'Shared Gym' },
  { value: 'private-jacuzzi', label: 'Private Jacuzzi' },
  { value: 'shared-spa', label: 'Shared Spa' },
  { value: 'covered-parking', label: 'Covered Parking' },
  { value: 'maids-room', label: 'Maids Room' },
  { value: 'barbecue-area', label: 'Barbecue Area' },
  { value: 'shared-pool', label: 'Shared Pool' },
  { value: 'childrens-pool', label: 'Children\'s Pool' },
  { value: 'private-garden', label: 'Private Garden' },
  { value: 'private-pool', label: 'Private Pool' },
  { value: 'view-of-water', label: 'View of Water' },
  { value: 'walk-in-closet', label: 'Walk-in Closet' },
  { value: 'lobby-in-building', label: 'Lobby in Building' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'waters', label: 'Water' },
  { value: 'sanitation', label: 'Sanitation' },
  { value: 'no-services', label: 'No Services' },
  { value: 'fixed-phone', label: 'Fixed Phone' },
  { value: 'fibre-optics', label: 'Fibre Optics' },
  { value: 'flood-drainage', label: 'Flood Drainage' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'networked', label: 'Networked' },
  { value: 'view-of-landmark', label: 'View of Landmark' },
  { value: 'dining-in-building', label: 'Dining in Building' },
  { value: 'conference-room', label: 'Conference Room' },
  { value: 'study', label: 'Study' },
  { value: 'maid-service', label: 'Maid Service' },
  { value: 'childrens-play-area', label: 'Children\'s Play Area' },
  { value: 'pets-allowed', label: 'Pets Allowed' },
  { value: 'vastu-compliant', label: 'Vastu Compliant' },
];

const COMMERCIAL_GCC_AMENITIES = [
  'shared-gym', 'covered-parking', 'networked', 'shared-pool',
  'dining-in-building', 'conference-room', 'lobby-in-building', 'vastu-compliant',
];

const COMMERCIAL_EGYPT_AMENITIES = [
  'shared-gym', 'covered-parking', 'networked', 'dining-in-building',
  'conference-room', 'lobby-in-building',
];

const COMMERCIAL_BAHRAIN_QATAR_AMENITIES = [
  'central-ac', 'security', 'balcony', 'shared-gym', 'covered-parking',
  'networked', 'shared-pool', 'private-garden', 'private-pool',
  'view-of-water', 'dining-in-building', 'conference-room', 'lobby-in-building',
];

const SAUDI_UTILITIES = [
  'electricity', 'waters', 'sanitation', 'no-services',
  'fixed-phone', 'fibre-optics', 'flood-drainage',
];

const RESIDENTIAL_UAE_AMENITIES = [
  'central-ac', 'built-in-wardrobes', 'kitchen-appliances', 'security',
  'concierge', 'maid-service', 'balcony', 'private-gym', 'shared-gym',
  'private-jacuzzi', 'shared-spa', 'covered-parking', 'maids-room', 'study',
  'childrens-play-area', 'pets-allowed', 'barbecue-area', 'shared-pool',
  'childrens-pool', 'private-garden', 'private-pool', 'view-of-water',
  'view-of-landmark', 'walk-in-closet', 'lobby-in-building', 'vastu-compliant',
];

const RESIDENTIAL_EGYPT_AMENITIES = [
  'central-ac', 'built-in-wardrobes', 'kitchen-appliances', 'security',
  'balcony', 'shared-gym', 'shared-spa', 'covered-parking', 'maids-room',
  'study', 'shared-pool', 'childrens-pool', 'private-garden', 'private-pool',
  'view-of-water', 'view-of-landmark', 'walk-in-closet', 'lobby-in-building',
];

const RESIDENTIAL_BAHRAIN_QATAR_AMENITIES = [
  'central-ac', 'built-in-wardrobes', 'kitchen-appliances', 'security',
  'concierge', 'maid-service', 'balcony', 'private-gym', 'shared-gym',
  'private-jacuzzi', 'shared-spa', 'covered-parking', 'maids-room', 'study',
  'childrens-play-area', 'pets-allowed', 'barbecue-area', 'shared-pool',
  'childrens-pool', 'private-garden', 'private-pool', 'view-of-water',
  'view-of-landmark', 'walk-in-closet', 'lobby-in-building',
];

const RESIDENTIAL_SAUDI_AMENITIES = [
  'central-ac', 'built-in-wardrobes', 'kitchen-appliances', 'security',
  'concierge', 'private-gym', 'shared-gym', 'private-jacuzzi', 'shared-spa',
  'covered-parking', 'maids-room', 'barbecue-area', 'shared-pool',
  'childrens-pool', 'private-garden', 'private-pool', 'view-of-water',
  'walk-in-closet', 'lobby-in-building', ...SAUDI_UTILITIES,
];

const PF_AMENITY_RULES = {
  [PF_COUNTRIES.UAE]: [
    { category: 'commercial', types: ['farm', 'land'], amenities: [] },
    { category: 'commercial', types: ['bulk-rent-unit', 'bulk-sale-unit', 'business-center', 'co-working-space', 'factory', 'full-floor', 'half-floor', 'labor-camp', 'office-space', 'retail', 'shop', 'show-room', 'staff-accommodation', 'villa', 'warehouse', 'whole-building'], amenities: COMMERCIAL_GCC_AMENITIES },
    { category: 'residential', types: ['land'], amenities: [] },
    { category: 'residential', types: ['apartment', 'bulk-rent-unit', 'bulk-sale-unit', 'bungalow', 'compound', 'duplex', 'full-floor', 'half-floor', 'hotel-apartment', 'penthouse', 'townhouse', 'villa', 'whole-building'], amenities: RESIDENTIAL_UAE_AMENITIES },
  ],
  [PF_COUNTRIES.EGYPT]: [
    { category: 'commercial', types: ['farm', 'land'], amenities: [] },
    { category: 'commercial', types: ['bulk-rent-unit', 'bulk-sale-unit', 'cafeteria', 'clinic', 'co-working-space', 'factory', 'full-floor', 'half-floor', 'hotel-apartment', 'medical-facility', 'office-space', 'restaurant', 'retail', 'shop', 'show-room', 'staff-accommodation', 'villa', 'warehouse', 'whole-building'], amenities: COMMERCIAL_EGYPT_AMENITIES },
    { category: 'residential', types: ['land'], amenities: [] },
    { category: 'residential', types: ['apartment', 'bulk-rent-unit', 'bulk-sale-unit', 'bungalow', 'cabin', 'chalet', 'duplex', 'full-floor', 'half-floor', 'hotel-apartment', 'palace', 'penthouse', 'roof', 'townhouse', 'twin-house', 'villa', 'whole-building'], amenities: RESIDENTIAL_EGYPT_AMENITIES },
  ],
  [PF_COUNTRIES.BAHRAIN]: [
    { category: 'commercial', types: ['land'], amenities: [] },
    { category: 'commercial', types: ['bulk-rent-unit', 'bulk-sale-unit', 'hotel-apartment', 'labor-camp', 'medical-facility', 'office-space', 'retail', 'shop', 'show-room', 'staff-accommodation', 'warehouse', 'whole-building'], amenities: COMMERCIAL_BAHRAIN_QATAR_AMENITIES },
    { category: 'residential', types: ['land'], amenities: [] },
    { category: 'residential', types: ['apartment', 'bulk-rent-unit', 'bulk-sale-unit', 'bungalow', 'chalet', 'compound', 'duplex', 'hotel-apartment', 'penthouse', 'townhouse', 'villa', 'whole-building'], amenities: RESIDENTIAL_BAHRAIN_QATAR_AMENITIES },
  ],
  [PF_COUNTRIES.SAUDI_ARABIA]: [
    { category: 'commercial', types: ['farm', 'land'], amenities: SAUDI_UTILITIES },
    { category: 'commercial', types: ['factory', 'office-space', 'shop', 'show-room', 'warehouse', 'whole-building'], amenities: ['central-ac', 'security', 'balcony', 'shared-gym', 'covered-parking', 'networked', 'view-of-water', 'view-of-landmark', 'dining-in-building', 'conference-room', 'lobby-in-building', ...SAUDI_UTILITIES] },
    { category: 'residential', types: ['farm', 'land'], amenities: SAUDI_UTILITIES },
    { category: 'residential', types: ['apartment', 'chalet', 'compound', 'full-floor', 'rest-house', 'villa', 'whole-building'], amenities: RESIDENTIAL_SAUDI_AMENITIES },
  ],
  [PF_COUNTRIES.QATAR]: [
    { category: 'commercial', types: ['land'], amenities: [] },
    { category: 'commercial', types: ['bulk-rent-unit', 'bulk-sale-unit', 'labor-camp', 'office-space', 'retail', 'shop', 'show-room', 'staff-accommodation', 'villa', 'warehouse', 'whole-building'], amenities: COMMERCIAL_BAHRAIN_QATAR_AMENITIES },
    { category: 'residential', types: ['land'], amenities: [] },
    { category: 'residential', types: ['apartment', 'bulk-rent-unit', 'bulk-sale-unit', 'compound', 'duplex', 'hotel-apartment', 'penthouse', 'townhouse', 'villa', 'whole-building'], amenities: RESIDENTIAL_BAHRAIN_QATAR_AMENITIES },
  ],
};

export const getPFCountryFromCurrency = (currency = 'AED') =>
  PF_CURRENCY_COUNTRY[currency?.toUpperCase?.()] || PF_COUNTRIES.UAE;

export const getAllowedAmenityValues = ({ country, currency, category, propertyType } = {}) => {
  const countryKey = country || getPFCountryFromCurrency(currency);
  const categoryKey = category?.toLowerCase?.();
  const typeKey = normalizePFSlug(propertyType);
  const rule = PF_AMENITY_RULES[countryKey]?.find(item =>
    item.category === categoryKey && item.types.includes(typeKey)
  );

  return rule?.amenities || [];
};

export const getAllowedAmenityOptions = (params) => {
  const allowed = new Set(getAllowedAmenityValues(params));
  return PF_AMENITY_OPTIONS.filter(option => allowed.has(option.value));
};
