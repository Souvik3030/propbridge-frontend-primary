import { useState, useCallback, useEffect, useMemo } from 'react';
import { useToast } from '../../../context/ToastContext';
import { useCreatePFListing, useUpdatePFListing } from '../api';
import { useAgentsQuery } from '../../../hooks/queries/useAgentQueries';
import {
  PROPERTY_TYPES,
  CATEGORIES,
  EMIRATES,
  getAllowedAmenityOptions,
  getAllowedAmenityValues,
  normalizePFSlug,
} from '../constants';
import { listingService, propertyFinderApi } from '../../../services';
import { UAE_EMIRATES } from '../../../components/features/listings/form/EmirateSelect';

// Emirate IDs as returned by GET /locations?level=1 (Standardized for DLD/ADREC)
const EMIRATE_IDS = {
  DUBAI: 1, ABU_DHABI: 2, SHARJAH: 3,
  AJMAN: 4, RAK: 5, FUJAIRAH: 6, UAQ: 7,
};

// Property types that require bedroom/bathroom fields
const RESIDENTIAL_TYPES = [
  'apartment', 'villa', 'townhouse', 'penthouse', 'hotel_apartment', 'duplex',
  'palace', 'bungalow', 'ivilla', 'twin_house', 'compound', 'chalet', 'rest_house', 'farm'
];

const PF_PROPERTY_TYPE_MAP = {
  full_floor: 'full-floor',
  half_floor: 'half-floor',
  whole_building: 'whole-building',
  rest_house: 'rest-house',
  twin_house: 'twin-house',
  hotel_apartment: 'hotel-apartment',
  bulk_sale_unit: 'bulk-sale-unit',
  bulk_rent_unit: 'bulk-rent-unit',
  office: 'office-space',
  office_space: 'office-space',
  showroom: 'show-room',
  show_room: 'show-room',
  labor_camp: 'labor-camp',
  co_working_space: 'co-working-space',
  staff_accommodation: 'staff-accommodation',
  medical_facility: 'medical-facility',
  business_center: 'business-center',
};

const normalizePFPropertyType = (value) => {
  const normalized = value?.toLowerCase?.().trim().replace(/\s+/g, '_');
  if (!normalized) return '';
  return PF_PROPERTY_TYPE_MAP[normalized] || normalized.replace(/_/g, '-');
};

const normalizeFormPropertyType = (value) => {
  const normalized = value?.toLowerCase?.().trim().replace(/\s+/g, '_').replace(/-/g, '_');
  if (!normalized) return '';
  if (normalized === 'show_room') return 'showroom';
  if (normalized === 'office') return 'office_space';
  return normalized;
};

const normalizeFinishingType = (value) => {
  const normalized = value?.toLowerCase?.().trim().replace(/\s+/g, '-').replace(/_/g, '-');
  const allowed = ['fully-finished', 'semi-finished', 'unfinished'];
  return allowed.includes(normalized) ? normalized : 'fully-finished';
};

const normalizeUaeEmirate = ({ emirateId, emirate, uaeEmirate }) => {
  const rawValue = uaeEmirate || emirate || '';
  const normalized = rawValue.toLowerCase().trim().replace(/[-\s]+/g, '_');

  if (normalized === 'dubai') return 'dubai';
  if (normalized === 'abu_dhabi') return 'abu_dhabi';
  if (
    ['sharjah', 'ajman', 'ras_al_khaimah', 'ras_al_kh', 'fujairah', 'umm_al_quwain', 'umm_al_q'].includes(normalized)
  ) {
    return 'northern_emirates';
  }

  const id = Number(emirateId);
  if (id === EMIRATE_IDS.DUBAI) return 'dubai';
  if (id === EMIRATE_IDS.ABU_DHABI) return 'abu_dhabi';
  if ([EMIRATE_IDS.SHARJAH, EMIRATE_IDS.AJMAN, EMIRATE_IDS.RAK, EMIRATE_IDS.FUJAIRAH, EMIRATE_IDS.UAQ].includes(id)) {
    return 'northern_emirates';
  }

  if (normalized.includes('dubai')) return 'dubai';
  if (normalized.includes('abu_dhabi')) return 'abu_dhabi';
  return 'northern_emirates';
};

const normalizeBedrooms = (value) => {
  if (value === '' || value === undefined || value === null) return undefined;
  return Number(value) === 0 ? 'studio' : String(value);
};

const normalizeBathrooms = (value) => {
  if (value === '' || value === undefined || value === null) return undefined;
  return Number(value) === 0 ? 'none' : String(value);
};

const buildPFPrice = ({ purpose, price, currency, rentFrequency, cheques, hidePrice, priceOnRequest }) => {
  const listingType = purpose?.toLowerCase?.() === 'rent' ? 'rent' : 'sale';
  const period = listingType === 'rent' ? (rentFrequency || 'yearly') : 'sale';
  const amount = Number(price);

  return {
    amounts: Number.isFinite(amount) && amount > 0 ? { [period]: amount } : undefined,
    currency: currency || 'AED',
    numberOfCheques: cheques ? Number(cheques) : undefined,
    onRequest: Boolean(priceOnRequest || hidePrice),
    type: period,
  };
};

export const useListingSync = (initialData = null, id = null) => {
  const { addToast } = useToast();

  const { mutateAsync: createListing, isPending: isCreating } = useCreatePFListing();
  const { mutateAsync: updateListing, isPending: isUpdating } = useUpdatePFListing();

  // Dynamic Visibility & Validation State
  const [requiredFields, setRequired] = useState({});
  const [visibleFields, setVisible] = useState({});
  const [errors, setErrors] = useState({});
  const [complianceResult, setComplianceResult] = useState(null);
  const [isCheckingCompliance, setIsCheckingCompliance] = useState(false);
  const [complianceStatus, setComplianceStatus] = useState('idle');



  const { data: agents = [], isLoading: isLoadingAgents } = useAgentsQuery();

  const [formData, setFormData] = useState(initialData || {
    // ── Core Required ──────────────────────────────────
    purpose: 'sale',
    category: CATEGORIES.RESIDENTIAL,
    referenceNo: 'VW-' + Date.now().toString().slice(-10),
    propertyType: 'apartment',
    price: '',
    price_currency: 'AED',
    size: '',
    size_unit: 'sqft',
    titleEn: '',
    descEn: '',
    titleAr: '',
    descAr: '',
    images: [],
    agent_id: '',

    // ── Location ───────────────────────────────────────
    emirate: '',
    emirate_id: '',
    pf_location_id: '',
    pf_location_name: '',
    pf_city: '',
    pf_community: '',
    pf_subcommunity: '',
    pf_building: '',
    uae_emirate: '',
    street_direction: '',
    latitude: '',
    longitude: '',
    city: '',
    community: '',
    subCommunity: '',
    building: '',
    pfLocation: '',
    bayutLocation: '',

    // ── Property Details ───────────────────────────────
    bedrooms: '1',
    bathrooms: '1',
    builtUpArea: '',
    plotSize: '',
    unitNumber: '',
    floorNo: '',
    floorNumber: '',
    numberOfFloors: '',
    parkings: '',
    furnished: 'unfurnished',
    privatePool: false,
    hotelName: '',
    fitted: 'no',
    zoningType: '',
    projectStatus: 'Ready',
    amenities: [],

    // ── Pricing & Rental ───────────────────────────────
    rentFrequency: 'yearly',
    cheques: '',
    availableFrom: '',
    ownershipType: '',
    hidePrice: false,
    short_term: false,

    // ── Permit / Compliance ────────────────────────────
    permitNumber: '',
    permit_license_number: '',
    permit_id: '',
    permit_sub_permit: '',
    dtcm_permit: '',
    client_type: '',
    advertisement_number: '',

    // ── Media & Links ──────────────────────────────────
    videoLink: '',
    view360: '',
    virtual_tour_url: '',
    floor_plans: [],
    watermark: true,

    // ── Off-Plan / Project ─────────────────────────────
    developer: '',
    titleDeed: '',
    buildYear: '',
    offPlan: false,
    projectName: '',
    project_id: '',
    completionDate: '',
    paymentPlan: '',

    // ── Publishing ─────────────────────────────────────
    agent: 'Select Agent',
    owner: 'Select Owner',
    portals: {
      pf: false,
      bayut: false,
      dubizzle: false,
      website: false
    },
    status: 'Save as Draft',
    is_exempt_area: false,
    finishing_type: 'fully-finished',
    userConfirmedDataIsCorrect: false,
    size_unit: 'sqft',

    // ── Additional Fields (from API Docs) ────────────────
    age: '',
    landNumber: '',
    mojDeedLocationDescription: '',
    ownerName: '',
    plotNumber: '',
  });

  const [emirateRules, setEmirateRules] = useState(null);
  const [rulesLoading, setRulesLoading] = useState(false);


  // ■■ RECALCULATE DEPENDENT FIELDS WHEN PARENT VALUES CHANGE ■■
  useEffect(() => {
    const emirateId = Number(formData.emirate_id);
    const purpose = formData.purpose?.toLowerCase();
    const propertyType = normalizeFormPropertyType(formData.propertyType);
    const category = formData.category?.toLowerCase();

    const newRequired = {};
    const newVisible = {};

    // 1. EMIRATE -> Permit / Compliance Rules (AE Specific)
    newVisible.permitNumber = true;
    if (emirateId === EMIRATE_IDS.DUBAI || emirateId === EMIRATE_IDS.ABU_DHABI) {
      newRequired.permitNumber = true;
      newRequired.advertisement_number = true;
      newRequired.building = true;
      newVisible.building = true;
    }

    // 2. PURPOSE (Listing Type)
    if (purpose === 'rent') {
      newRequired.rentFrequency = true;
      newVisible.rentFrequency = true;
      newVisible.cheques = true;
      newVisible.availableFrom = true;
    } else if (purpose === 'sale') {
      newRequired.ownershipType = true;
      newVisible.ownershipType = true;
    }

    // 3. CATEGORY
    if (category === CATEGORIES.RESIDENTIAL || category === 'residential') {
      newRequired.bedrooms = true;
      newVisible.bedrooms = true;

      // Bathrooms Required if listing type is not Land or Farm
      if (!['land', 'farm'].includes(propertyType)) {
        newRequired.bathrooms = true;
        newVisible.bathrooms = true;
      }
    } else if (category === 'off_plan') {
      newRequired.developer = true;
      newRequired.projectName = true;
      newRequired.completionDate = true;
      newVisible.developer = true;
      newVisible.projectName = true;
      newVisible.completionDate = true;
      newVisible.paymentPlan = true;
    }

    // 4. PROPERTY TYPE
    if (['villa', 'townhouse', 'land'].includes(propertyType)) {
      newRequired.plotSize = true;
      newVisible.plotSize = true;
    }

    if (propertyType === 'penthouse') {
      newRequired.privatePool = true;
      newVisible.privatePool = true;
    }

    if (propertyType === 'hotel_apartment') {
      newRequired.hotelName = true;
      newVisible.hotelName = true;
    }

    if (propertyType === 'land') {
      newRequired.zoningType = true;
      newVisible.zoningType = true;
    }

    if (['office', 'retail', 'warehouse'].includes(propertyType)) {
      newRequired.fitted = true;
      newVisible.fitted = true;
    }

    if (propertyType === 'co_working_space') {
      newRequired.parkings = true; // Map to hasParkingSpace
      newVisible.parkings = true;
    }

    // Floor rules for apartments/offices
    if (['apartment', 'penthouse', 'hotel_apartment', 'office'].includes(propertyType)) {
      newVisible.floorNumber = true;
      newVisible.numberOfFloors = true;
    }

    setRequired(newRequired);
    setVisible(newVisible);
  }, [formData.emirate_id, formData.purpose, formData.propertyType, formData.category]);


  // Fetch Emirate Rules when ID changes (AE Specific)
  useEffect(() => {
    const fetchRules = async () => {
      if (!formData.emirate_id) {
        setEmirateRules(null);
        return;
      }
      setRulesLoading(true);
      try {
        const rules = await propertyFinderApi.getEmirateRules(formData.emirate_id);
        setEmirateRules(rules);
      } catch (err) {
        console.error('[useListingSync] Rules fetch failed:', err);
        setEmirateRules(null);
      } finally {
        setRulesLoading(false);
      }
    };
    fetchRules();
  }, [formData.emirate_id]);

  // Exemption Check (DIFC, JAFZA, etc.)
  useEffect(() => {
    if (emirateRules?.exempt_areas && formData.pf_location_name) {
      const isExempt = emirateRules.exempt_areas.some(area =>
        formData.pf_location_name.toUpperCase().includes(area.toUpperCase())
      );
      setFormData(prev => ({ ...prev, is_exempt_area: isExempt }));
    } else {
      setFormData(prev => ({ ...prev, is_exempt_area: false }));
    }
  }, [emirateRules, formData.pf_location_name]);



  const availableTypes = PROPERTY_TYPES[formData.category] || [];
  const availableAmenities = useMemo(() => getAllowedAmenityOptions({
    currency: formData.price_currency,
    category: formData.category,
    propertyType: normalizePFPropertyType(formData.propertyType),
  }), [formData.category, formData.price_currency, formData.propertyType]);
  const isLicenseRequired = [EMIRATE_IDS.DUBAI, EMIRATE_IDS.ABU_DHABI].includes(Number(formData.emirate_id));

  useEffect(() => {
    const allowedAmenities = new Set(availableAmenities.map(amenity => amenity.value));
    setFormData(prev => {
      const currentAmenities = Array.isArray(prev.amenities) ? prev.amenities : [];
      const nextAmenities = currentAmenities
        .map(normalizePFSlug)
        .filter(amenity => allowedAmenities.has(amenity));

      if (
        currentAmenities.length === nextAmenities.length &&
        currentAmenities.every((amenity, index) => normalizePFSlug(amenity) === nextAmenities[index])
      ) {
        return prev;
      }

      return { ...prev, amenities: nextAmenities };
    });
  }, [availableAmenities]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        category: value,
        propertyType: PROPERTY_TYPES[value][0]
      }));
      return;
    }

    if (name === 'emirate_id') {
      const selectedEmirate = UAE_EMIRATES.find(e => String(e.id) === String(value));
      setFormData(prev => ({
        ...prev,
        emirate_id: value,
        emirate: selectedEmirate?.label || '',
        // Clear all hierarchical location IDs when emirate changes
        city_id: '',
        city: '',
        community_id: '',
        community: '',
        sub_community_id: '',
        subCommunity: '',
        building_id: '',
        building: ''
      }));
      return;
    }

    if (name === 'permitNumber') {
      setComplianceStatus('idle');
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: checked }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (checked ? true : false) : value
      }));
    }
  }, [setFormData]);



  const handlePFLocationSelect = (location) => {
    if (!location) {
      setFormData(prev => ({
        ...prev,
        pf_location_id: '',
        pf_location_name: '',
        pf_city: '',
        pf_community: '',
        pf_subcommunity: '',
        pf_building: '',
        uae_emirate: '',
        emirate: '',
        emirate_id: '',
        latitude: '',
        longitude: '',
        permitNumber: ''
      }));
      setComplianceStatus(null);
      return;
    }

    // Auto-detect emirate ID
    const emirateMap = {
      dubai: 1,
      abu_dhabi: 2,
      sharjah: 3,
      ajman: 4,
      ras_al_khaimah: 5,
      ras_al_kh: 5,
      fujairah: 6,
      umm_al_quwain: 7,
      umm_al_q: 7,
    };

    // Normalize string for lookup
    const emirateKey = location.uae_emirate?.toLowerCase().trim().replace(/[-\s]+/g, '_');
    const detectedId = emirateMap[emirateKey] ||
      (location.uae_emirate?.toLowerCase().includes('dubai') ? 1 :
        location.uae_emirate?.toLowerCase().includes('abu dhabi') ? 2 : null);

    setFormData(prev => ({
      ...prev,
      pf_location_id: location.id,
      pf_location_name: location.location,
      pf_city: location.city === '-' ? '' : (location.city || ''),
      pf_community: location.community === '-' ? '' : (location.community || ''),
      pf_subcommunity: location.sub_community === '-' ? '' : (location.sub_community || ''),
      pf_building: location.building === '-' ? '' : (location.building || ''),
      uae_emirate: location.uae_emirate,
      emirate: location.uae_emirate,
      latitude: location.latitude,
      longitude: location.longitude,
      emirate_id: detectedId || prev.emirate_id,
      permitNumber: ''
    }));
    setComplianceStatus(null);
  };


  const toggleAmenity = useCallback((amenity) => {
    const normalizedAmenity = normalizePFSlug(amenity);
    const allowedAmenities = new Set(getAllowedAmenityValues({
      currency: formData.price_currency,
      category: formData.category,
      propertyType: normalizePFPropertyType(formData.propertyType),
    }));

    if (!allowedAmenities.has(normalizedAmenity)) return;

    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.map(normalizePFSlug).includes(normalizedAmenity)
        ? prev.amenities.filter(a => normalizePFSlug(a) !== normalizedAmenity)
        : [...prev.amenities, normalizedAmenity]
    }));
  }, [formData.category, formData.price_currency, formData.propertyType]);

  const syncListing = async () => {
    // 1. Mandatory Context & Core Validations
    setErrors({}); // Clear previous errors
    const newErrors = {};

    // ── Always-required fields ──────────────────────────────────────────────
    if (!formData.referenceNo) newErrors.referenceNo = "Reference number is required.";
    if (!formData.agent_id || Number(formData.agent_id) < 1) newErrors.agent_id = "Please select a Listing Agent.";
    if (!formData.emirate_id || Number(formData.emirate_id) < 1) newErrors.emirate_id = "Please select an Emirate via the location search.";
    if (!formData.pf_location_id) newErrors.pf_location_id = "Please select a PF location.";
    if (!formData.titleEn || formData.titleEn.trim().length < 10) newErrors.titleEn = "Title (English) must be at least 10 characters.";
    if (!formData.descEn || formData.descEn.trim().length < 20) newErrors.descEn = "Description (English) must be at least 20 characters.";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Price must be greater than 0.";
    if (!formData.price_currency) newErrors.price_currency = "Currency is required.";
    const sizeVal = formData.size || formData.builtUpArea;
    if (!sizeVal || Number(sizeVal) <= 0) newErrors.size = "Property size must be greater than 0.";
    if (!formData.size_unit) newErrors.size_unit = "Size unit is required.";
    if (formData.images.length === 0) newErrors.images = "At least one property image is required.";

    // ── Dependent Required Fields ───────────────────────────────────────────
    if (requiredFields.permitNumber && !formData.permitNumber) newErrors.permitNumber = "Permit number is required.";
    if (requiredFields.building && !formData.building) newErrors.building = "Building name is required.";
    if (requiredFields.dldPermit && !formData.dldPermit) newErrors.dldPermit = "DLD Permit is required for Dubai Sale.";
    if (requiredFields.rentFrequency && !formData.rentFrequency) newErrors.rentFrequency = "Rent frequency is required.";
    if (requiredFields.ownershipType && !formData.ownershipType) newErrors.ownershipType = "Ownership type is required.";
    if (requiredFields.bedrooms && formData.bedrooms === '') newErrors.bedrooms = "Number of bedrooms is required.";
    if (requiredFields.bathrooms && formData.bathrooms === '') newErrors.bathrooms = "Number of bathrooms is required.";
    // Short-term DTCM permit
    if (formData.short_term && !formData.dtcm_permit) newErrors.dtcm_permit = "DTCM Permit number is required for short-term rentals.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast("Please check the highlighted fields for errors.", "error");

      // Auto-scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0] || document.querySelector(`[id="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => element.focus(), 500);
      }
      return false;
    }

    // 2. Project Status Mapping
    let mappedProjectStatus = formData.projectStatus?.toLowerCase().replace('-', '_');
    if (mappedProjectStatus === 'ready') mappedProjectStatus = 'completed';

    // 3. Payload Construction
    let sizeValue = Number(formData.size || formData.builtUpArea || 0);
    let plotSizeValue = Number(formData.plotSize || 0);

    // Convert SQM to SQFT if necessary (API expects SQFT)
    if (formData.size_unit === 'sqm') {
      sizeValue = Math.round(sizeValue * 10.7639);
      plotSizeValue = Math.round(plotSizeValue * 10.7639);
    }

    const propertyType = normalizePFPropertyType(formData.propertyType);
    const agentId = Number(formData.agent_id);
    const finishingType = normalizeFinishingType(formData.finishing_type);
    const uaeEmirate = normalizeUaeEmirate({
      emirateId: formData.emirate_id,
      emirate: formData.emirate,
      uaeEmirate: formData.uae_emirate,
    });
    const allowedAmenities = new Set(getAllowedAmenityValues({
      currency: formData.price_currency,
      category: formData.category,
      propertyType,
    }));
    const payload = {
      // ── Core fields ──────────────────────────────────────
      reference: formData.referenceNo,
      agent_id: agentId,
      created_by: { id: agentId },
      location_id: Number(formData.pf_location_id),
      emirate_id: Number(formData.emirate_id),
      uae_emirate: uaeEmirate,
      uaeEmirate,
      type: propertyType,
      listing_type: (formData.purpose || 'sale').toLowerCase(),
      category: formData.category?.toLowerCase(),
      property_type: propertyType,

      // Flattened fields based on backend validation errors
      price: Number(formData.price),
      price_currency: formData.price_currency || 'AED',
      size_sqft: Number(sizeValue),
      title: formData.titleEn,
      title_en: formData.titleEn,
      title_ar: formData.titleAr || undefined,
      description: formData.descEn,
      description_en: formData.descEn,
      description_ar: formData.descAr || undefined,

      bedrooms: (formData.category === 'residential' || formData.category === CATEGORIES.RESIDENTIAL) ? Number(formData.bedrooms) : undefined,
      bathrooms: (formData.category === 'residential' || formData.category === CATEGORIES.RESIDENTIAL) ? Number(formData.bathrooms) : undefined,

      images: Array.isArray(formData.images) ? formData.images : [],
      media: {
        images: (Array.isArray(formData.images) ? formData.images : []).map(url => ({
          original: url,
          caption: ''
        }))
      },

      // Permit / Compliance (Flattened)
      permit_number: formData.permitNumber || undefined,
      permit_license_number: formData.permit_license_number || undefined,
      permit_id: formData.permit_id || undefined,
      permit_sub_permit: formData.permit_sub_permit || undefined,
      dtcm_permit: formData.dtcm_permit || undefined,
      client_type: formData.client_type || undefined,
      advertisement_number: formData.advertisement_number || undefined,
      building_name: formData.building || formData.pf_building || undefined,

      // ── Other fields ─────────────────────────────────────────────
      rent_period: formData.rentFrequency,
      rent_frequency: formData.rentFrequency,
      cheques: formData.cheques ? Number(formData.cheques) : undefined,
      available_from: formData.availableFrom,
      ownership_type: formData.ownershipType,
      short_term: formData.short_term || false,
      developer_name: formData.developer,
      project_name: formData.projectName,
      project_id: formData.project_id || undefined,
      completion_date: formData.completionDate,
      plot_size_sqft: formData.plotSize ? Number(formData.plotSize) : undefined,
      private_pool: formData.privatePool,
      hotel_name: formData.hotelName,
      zoning_type: formData.zoningType,
      fitted: formData.fitted,
      finishing_type: finishingType,
      finishingType,
      furnished: formData.furnished?.toLowerCase(),
      parking: formData.parkings ? Number(formData.parkings) : undefined,
      parking_spaces: formData.parkings ? Number(formData.parkings) : undefined,
      floor_number: formData.floorNumber ? Number(formData.floorNumber) : undefined,
      total_floors: formData.numberOfFloors ? Number(formData.numberOfFloors) : undefined,
      number_of_floors: formData.numberOfFloors ? Number(formData.numberOfFloors) : undefined,
      latitude: formData.latitude ? Number(formData.latitude) : undefined,
      longitude: formData.longitude ? Number(formData.longitude) : undefined,
      virtual_tour_url: formData.virtual_tour_url || formData.view360 || undefined,
      floor_plans: formData.floor_plans?.length ? formData.floor_plans : undefined,
      price_on_request: formData.price_on_request || formData.hidePrice,
      amenities: Array.isArray(formData.amenities)
        ? formData.amenities
          .map(normalizePFSlug)
          .filter(amenity => allowedAmenities.has(amenity))
        : [],
      project_status: mappedProjectStatus,
    };

    // Clean payload
    Object.keys(payload).forEach(key => {
      if (payload[key] === undefined || payload[key] === '' || payload[key] === null) {
        delete payload[key];
      }
    });

    const selectedAmenities = Array.isArray(formData.amenities)
      ? formData.amenities
        .map(normalizePFSlug)
        .filter(amenity => allowedAmenities.has(amenity))
      : [];

    const standardPayload = {
      amenities: selectedAmenities,
      assignedTo: { id: agentId },
      availableFrom: formData.availableFrom || undefined,
      bathrooms: formData.category === CATEGORIES.RESIDENTIAL ? normalizeBathrooms(formData.bathrooms) : undefined,
      bedrooms: formData.category === CATEGORIES.RESIDENTIAL ? normalizeBedrooms(formData.bedrooms) : undefined,
      builtUpArea: Number(sizeValue),
      category: formData.category?.toLowerCase(),
      compliance: (formData.permitNumber || formData.advertisement_number || formData.permit_license_number) ? {
        listingAdvertisementNumber: formData.advertisement_number || formData.permitNumber || undefined,
        type: Number(formData.emirate_id) === EMIRATE_IDS.ABU_DHABI ? 'adrec' : 'rera',
        issuingClientLicenseNumber: formData.permit_license_number || undefined,
        userConfirmedDataIsCorrect: Boolean(formData.userConfirmedDataIsCorrect),
      } : undefined,
      createdBy: { id: agentId },
      description: {
        en: formData.descEn,
        ar: formData.descAr || undefined,
      },
      developer: formData.developer || undefined,
      finishingType,
      floorNumber: formData.floorNumber ? String(formData.floorNumber) : undefined,
      furnishingType: formData.furnished?.toLowerCase() || 'unfurnished',
      hasGarden: selectedAmenities.includes('private-garden') || undefined,
      hasKitchen: selectedAmenities.includes('kitchen-appliances') || undefined,
      hasParkingOnSite: Boolean(formData.parkings) || selectedAmenities.includes('covered-parking') || undefined,
      location: { id: Number(formData.pf_location_id) },
      media: {
        images: (Array.isArray(formData.images) ? formData.images : []).map(url => ({
          original: { url },
        })),
        videos: (formData.videoLink || formData.virtual_tour_url || formData.view360) ? {
          default: formData.videoLink || undefined,
          view360: formData.virtual_tour_url || formData.view360 || undefined,
        } : undefined,
      },
      numberOfFloors: formData.numberOfFloors ? Number(formData.numberOfFloors) : undefined,
      parkingSlots: formData.parkings ? Number(formData.parkings) : undefined,
      plotSize: plotSizeValue || undefined,
      price: buildPFPrice({
        purpose: formData.purpose,
        price: formData.price,
        currency: formData.price_currency,
        rentFrequency: formData.rentFrequency,
        cheques: formData.cheques,
        hidePrice: formData.hidePrice,
        priceOnRequest: formData.price_on_request,
      }),
      projectStatus: mappedProjectStatus,
      reference: formData.referenceNo,
      size: Number(sizeValue),
      street: formData.street_direction ? { direction: formData.street_direction } : undefined,
      title: {
        en: formData.titleEn,
        ar: formData.titleAr || undefined,
      },
      type: propertyType,
      uaeEmirate,
      unitNumber: formData.unitNumber || undefined,

      // Additional Fields (from API Docs)
      age: formData.age ? Number(formData.age) : undefined,
      landNumber: formData.landNumber || undefined,
      mojDeedLocationDescription: formData.mojDeedLocationDescription || undefined,
      ownerName: formData.ownerName || undefined,
      plotNumber: formData.plotNumber || undefined,
    };


    try {
      let result;
      if (id) {
        result = await updateListing({ id, data: standardPayload });
        if (result?.id) {
          const validation = await listingService.validateListing(result.id);
          setComplianceResult(validation);
        }
      } else {
        result = await createListing(standardPayload);
        if (result?.id) {
          const validation = await listingService.validateListing(result.id);
          setComplianceResult(validation);
        }
      }
      return result;
    } catch (error) {
      console.error('[useListingSync] sync failed:', error);
      
      // Parse server-side validation errors
      if (error.response?.status === 422 || error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        const mappedErrors = {};
        
        // Comprehensive Mapping Layer (API Key -> Form Key)
        const keyMap = {
          'reference': 'referenceNo',
          'title': 'titleEn',
          'title.en': 'titleEn',
          'description': 'descEn',
          'description.en': 'descEn',
          'type': 'propertyType',
          'listing_type': 'purpose',
          'uaeEmirate': 'uae_emirate',
          'price': 'price',
          'price.amounts.sale': 'price',
          'price.amounts.yearly': 'price',
          'permit_number': 'permitNumber',
          'advertisement_number': 'advertisement_number',
          'location': 'pf_location_id',
          'images': 'images',
          'age': 'age',
          'landNumber': 'landNumber',
          'ownerName': 'ownerName',
          'plotNumber': 'plotNumber'
        };
        
        Object.keys(apiErrors).forEach(key => {
          const formKey = keyMap[key] || key;
          // Flatten array of errors into a single string
          mappedErrors[formKey] = Array.isArray(apiErrors[key]) ? apiErrors[key][0] : apiErrors[key];
        });
        
        setErrors(mappedErrors);
        addToast("Validation failed. Please check the highlighted fields.", "error");
        
        // Auto-scroll to first server-side error with prominent highlighting
        const firstErrorField = Object.keys(mappedErrors)[0];
        const element = document.getElementsByName(firstErrorField)[0] || 
                      document.querySelector(`[id="${firstErrorField}"]`) ||
                      document.querySelector(`[name*="${firstErrorField}"]`);
                      
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Add a temporary shake animation to the field
          element.style.transition = 'transform 0.1s ease-in-out';
          const shake = [
            'translateX(0)', 'translateX(-10px)', 'translateX(10px)', 
            'translateX(-10px)', 'translateX(10px)', 'translateX(0)'
          ];
          let i = 0;
          const interval = setInterval(() => {
            element.style.transform = shake[i];
            i++;
            if (i >= shake.length) {
              clearInterval(interval);
              element.style.transform = 'none';
            }
          }, 50);
          
          setTimeout(() => element.focus(), 500);
        }
      } else {
        addToast(error.response?.data?.message || "Failed to save listing. Please try again.", "error");
      }
      return false;
    }
  };

  const handleRecheckCompliance = async () => {
    if (!id) {
      addToast("Please save the listing as a draft before running a compliance check.", "info");
      return;
    }

    setIsCheckingCompliance(true);
    try {
      const result = await listingService.checkCompliance(id);
      setComplianceResult(result);

      // Auto-fill validated data from PF Compliance API
      if (result?.verifiedData) {
        setFormData(prev => ({
          ...prev,
          price: result.verifiedData.price || prev.price,
          purpose: result.verifiedData.listingType === 'rent' ? 'Rent' :
            result.verifiedData.listingType === 'sale' ? 'Sale' : prev.purpose,
          category: result.verifiedData.saleType || prev.category
        }));
        addToast("Compliance check completed. Form data updated with verified permit details.", "success");
      } else {
        addToast("Compliance check completed.", "success");
      }
    } catch {
      addToast("Compliance check failed.", "error");
    } finally {
      setIsCheckingCompliance(false);
    }
  };


  const handleFetchCompliance = async () => {
    if (!formData.permitNumber) {
      addToast("Please enter a Permit number first.", "warning");
      return;
    }

    setComplianceStatus('loading');
    try {
      let permitType = 'dld';
      if (emirateRules?.emirate_id === 2) permitType = 'adrec';

      const pfData = await propertyFinderApi.getComplianceDetails(formData.permitNumber, permitType);

      // AE / DLD / ADREC Path
      const propertyData = pfData?.data?.[0]?.property;
      if (propertyData) {
        setFormData(prev => ({
          ...prev,
          price: String(propertyData.value || prev.price),
          size: String(propertyData.size || prev.size),
          builtUpArea: String(propertyData.size || prev.builtUpArea),
          bedrooms: String(propertyData.roomsCount || prev.bedrooms),
          purpose: propertyData.permitType === 'Sell' ? 'sale' :
            propertyData.permitType === 'Rent' ? 'rent' : prev.purpose,
          propertyType: normalizeFormPropertyType(propertyData.listing_type) || prev.propertyType,
          unitNumber: propertyData.unitNumber || prev.unitNumber,
        }));
        addToast("Permit verified. Form auto-filled with official data.", "success");
        setComplianceStatus('success');
      } else {
        setComplianceStatus('error');
        addToast("Could not find property details for this permit.", "error");
      }
    } catch (error) {
      console.error('Compliance fetch failed:', error);
      setComplianceStatus('error');
      addToast("Failed to verify permit details. Please check your inputs.", "error");
    }
  };


  return {
    formData,
    setFormData,
    errors,
    visibleFields,
    requiredFields,
    emirateRules,
    rulesLoading,
    handleInputChange,
    handlePFLocationSelect,
    handleFetchCompliance,
    complianceStatus,
    setComplianceStatus,
    toggleAmenity,
    availableTypes,
    availableAmenities,
    isLicenseRequired,
    syncListing,
    isPending: isCreating || isUpdating,
    agents,
    isLoadingData: isLoadingAgents,
    complianceResult,
    isCheckingCompliance,
    handleRecheckCompliance
  };
};
