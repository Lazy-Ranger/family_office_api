import Joi from "joi";

export const createRLAssetSchema = Joi.object({
  assetCategoryId: Joi.number().integer().required(),
  assetSubcategoryId: Joi.number().integer().required(),
  assetTypeId: Joi.number().integer().required(),

  entityId: Joi.string().uuid().required().messages({
        'string.empty': 'entityId is required',
        'string.guid': 'entityId must be a valid UUID',
    }),
  is_active: Joi.boolean().default(true),

  property_name: Joi.string().max(100).required(),
  built_up_area_sqft: Joi.number().integer().positive().max(99999).required(),

  date_of_construction: Joi.date().less("now").optional().allow(null),

  possession_status: Joi.string().valid(
    "Under Construction",
    "Completed",
    "Ready to Move"
  ).optional(),

  occupancy_type: Joi.string().valid(
    "Leased/Rented",
    "Self-Occupied",
    "Vacant"
  ).optional().allow(null),

  possession_letter: Joi.string().max(150).optional().allow(null),
  expected_possession_date: Joi.when("possession_status", {
    is: "Under Construction",
    then: Joi.date().greater("now").allow(null),
    otherwise: Joi.date().optional().allow(null)
  }),

  possession_date: Joi.date().optional().allow(null),

  ownership_type: Joi.string()
    .valid("Sole", "Joint", "HUF", "Company", "Trust")
    .required(),

  ownership_percentage: Joi.when("ownership_type", {
    is: "Joint",
    then: Joi.number().min(0).max(100).precision(2).required(),
    otherwise: Joi.number().min(0).max(100).precision(2).optional().allow(null)
  }),

  number_of_owner: Joi.number().integer().min(1).optional().allow(null),

  is_property_tax_paid: Joi.boolean().optional(),

  is_oc_cc_available: Joi.boolean().optional(),
  is_rera_registered: Joi.boolean().optional(),

  address: Joi.string().max(100).required(),
  locality: Joi.string().max(100).required(),
  pin_code: Joi.string().pattern(/^\d{6}$/).optional().allow(null),
  city: Joi.string().pattern(/^[A-Za-z ]+$/).optional().allow(null),
  state: Joi.string().pattern(/^[A-Za-z ]+$/).optional().allow(null),
  country: Joi.string().max(50).optional().default("India"),

  purchase_date: Joi.date().less("now").required(),
  purchase_price: Joi.number().positive().precision(2).required(),

  recent_valuation_date: Joi.date().less("now").optional().allow(null),

  current_market_value: Joi.number().positive().precision(2).optional().allow(null),

  loan_linked: Joi.boolean().optional(),
  emi_amount: Joi.number().precision(2).optional().allow(null),
  emi_frequency: Joi.string().max(255).optional().allow(null),
  next_emi_date: Joi.date().optional().allow(null),
  is_property_insured: Joi.boolean().optional(),
  property_insurance_premium: Joi.number().precision(2).optional().allow(null),

  loan_amount: Joi.when("loan_linked", {
    is: true,
    then: Joi.number().min(0).precision(2).required(),
    otherwise: Joi.number().min(0).precision(2).optional().allow(null)
  }),

  outstanding_amount: Joi.when("loan_linked", {
    is: true,
    then: Joi.number().min(0).precision(2).required(),
    otherwise: Joi.number().min(0).precision(2).optional().allow(null)
  }),

  maintenance_applicable: Joi.boolean().optional(),

  monthly_maintenance_amount: Joi.when("maintenance_applicable", {
    is: true,
    then: Joi.number().positive().precision(2).required(),
    otherwise: Joi.number().positive().precision(2).optional().allow(null)
  }),

  maintenance_frequency: Joi.string()
    .valid("Monthly", "Quarterly", "Yearly")
    .optional()
    .allow(null),

  property_tax_amount: Joi.number().positive().precision(2).optional().allow(null),
  major_repair_expenses: Joi.number().positive().precision(2).optional().allow(null),

  remarks: Joi.string().optional().allow(null),

  status: Joi.string().valid("Active", "Sold", "Inactive").optional(),

  sale_date: Joi.when("status", {
    is: "Sold",
    then: Joi.date().less("now").required(),
    otherwise: Joi.date().optional().allow(null)
  }),

  sale_value: Joi.when("status", {
    is: "Sold",
    then: Joi.number().positive().precision(2).required(),
    otherwise: Joi.number().positive().precision(2).optional().allow(null)
  }),

  tenant_name: Joi.string().max(255).optional().allow(null),
  monthly_rent: Joi.number().precision(2).optional().allow(null),
  security_deposit: Joi.number().precision(2).optional().allow(null),
  rent_frequency: Joi.string().max(255).optional().allow(null),
  rent_collected_status: Joi.string().max(255).optional().allow(null),

  lease_start: Joi.date().optional().allow(null),
  lease_end: Joi.date().optional().allow(null),
  lease_renew_date: Joi.date().optional().allow(null),

  rental_income_per_month: Joi.number().precision(2).optional().allow(null),

  property_manager: Joi.string().max(255).optional().allow(null),
  property_manager_salary: Joi.number().precision(2).optional().allow(null),

  sale_deed: Joi.string().max(150).optional().allow(null),
  allotment_letter: Joi.string().max(150).optional().allow(null),
  occupancy_certificate_oc: Joi.string().max(150).optional().allow(null),
  completion_certificate_cc: Joi.string().max(150).optional().allow(null),
  noc_from_society: Joi.string().max(150).optional().allow(null),
  encumbrance_certificate: Joi.string().max(150).optional().allow(null),
  description: Joi.string().optional().allow(null),

land_area_sqft: Joi.number().precision(2).positive().optional().allow(null),
carpet_area_sqft: Joi.number().precision(2).positive().optional().allow(null),

geo_latitude: Joi.number().precision(6).optional().allow(null),
geo_longitude: Joi.number().precision(6).optional().allow(null),

investment_type: Joi.string().max(50).optional().allow(null),

unit_count: Joi.number().integer().positive().optional().allow(null),
unit_price: Joi.number().precision(2).positive().optional().allow(null),
investment_yield_percent: Joi.number().precision(2).positive().optional().allow(null),
insurance_start_date: Joi.date().optional().allow(null),
insurance_expiry_date: Joi.date().optional().allow(null),
last_renovation_date: Joi.date().optional().allow(null),

facility_management_company: Joi.string().max(255).optional().allow(null),

land_conversion_certificate: Joi.string().max(150).optional().allow(null),
environment_clearance: Joi.string().max(150).optional().allow(null),
building_plan_approval: Joi.string().max(150).optional().allow(null),

  created_by: Joi.number().integer().required(),
  updated_by: Joi.number().integer().required(),
});

export const updateRLAssetSchema = Joi.object({
  assetCategoryId: Joi.number().integer().optional(),
  assetSubcategoryId: Joi.number().integer().optional(),
  assetTypeId: Joi.number().integer().optional(),

  is_active: Joi.boolean().optional(),

  property_name: Joi.string().max(100).optional(),
  property_type: Joi.string().max(100).optional().allow(null),

  built_up_area_sqft: Joi.number().integer().positive().max(99999).optional(),

  date_of_construction: Joi.date().less("now").optional().allow(null),

  possession_status: Joi.string()
    .valid("Under Construction", "Completed", "Ready to Move")
    .optional(),

  possession_letter: Joi.string().max(150).optional().allow(null),

  expected_possession_date: Joi.when("possession_status", {
    is: "Under Construction",
    then: Joi.date().greater("now").optional().allow(null),
    otherwise: Joi.date().optional().allow(null)
  }),

  possession_date: Joi.date().optional().allow(null),

  ownership_type: Joi.string()
    .valid("Sole", "Joint", "HUF", "Company", "Trust")
    .optional(),

  ownership_percentage: Joi.when("ownership_type", {
    is: "Joint",
    then: Joi.number().min(0).max(100).precision(2).optional(),
    otherwise: Joi.number().min(0).max(100).precision(2).optional().allow(null)
  }),

  number_of_owner: Joi.number().integer().min(1).optional().allow(null),

  is_property_tax_paid: Joi.boolean().optional(),

  is_oc_cc_available: Joi.boolean().optional(),
  is_rera_registered: Joi.boolean().optional(),

  address: Joi.string().max(100).optional(),
  locality: Joi.string().max(100).optional(),
  pin_code: Joi.string().pattern(/^\d{6}$/).optional().allow(null),
  city: Joi.string().pattern(/^[A-Za-z ]+$/).optional().allow(null),
  state: Joi.string().pattern(/^[A-Za-z ]+$/).optional().allow(null),
  country: Joi.string().max(50).optional(),

  purchase_date: Joi.date().less("now").optional(),
  purchase_price: Joi.number().positive().precision(2).optional(),

  recent_valuation_date: Joi.date().less("now").optional().allow(null),

  current_market_value: Joi.number().positive().precision(2).optional().allow(null),

  loan_linked: Joi.boolean().optional(),

  emi_amount: Joi.number().precision(2).optional().allow(null),
  emi_frequency: Joi.string().max(255).optional().allow(null),
  next_emi_date: Joi.date().optional().allow(null),
  is_property_insured: Joi.boolean().optional(),
  property_insurance_premium: Joi.number().precision(2).optional().allow(null),

  loan_amount: Joi.when("loan_linked", {
    is: true,
    then: Joi.number().min(0).precision(2).optional(),
    otherwise: Joi.number().min(0).precision(2).optional().allow(null)
  }),

  outstanding_amount: Joi.when("loan_linked", {
    is: true,
    then: Joi.number().min(0).precision(2).optional(),
    otherwise: Joi.number().min(0).precision(2).optional().allow(null)
  }),

  maintenance_applicable: Joi.boolean().optional(),

  monthly_maintenance_amount: Joi.when("maintenance_applicable", {
    is: true,
    then: Joi.number().positive().precision(2).optional(),
    otherwise: Joi.number().positive().precision(2).optional().allow(null)
  }),

  maintenance_frequency: Joi.string()
    .valid("Monthly", "Quarterly", "Yearly")
    .optional()
    .allow(null),

  property_tax_amount: Joi.number().positive().precision(2).optional().allow(null),
  major_repair_expenses: Joi.number().positive().precision(2).optional().allow(null),

  remarks: Joi.string().optional().allow(null),

  status: Joi.string().valid("Active", "Sold", "Inactive").optional(),

  sale_date: Joi.when("status", {
    is: "Sold",
    then: Joi.date().less("now").optional(),
    otherwise: Joi.date().optional().allow(null)
  }),

  sale_value: Joi.when("status", {
    is: "Sold",
    then: Joi.number().positive().precision(2).optional(),
    otherwise: Joi.number().positive().precision(2).optional().allow(null)
  }),

  tenant_name: Joi.string().max(255).optional().allow(null),
  monthly_rent: Joi.number().precision(2).optional().allow(null),
  security_deposit: Joi.number().precision(2).optional().allow(null),
  rent_frequency: Joi.string().max(255).optional().allow(null),
  rent_collected_status: Joi.string().max(255).optional().allow(null),

  lease_start: Joi.date().optional().allow(null),
  lease_end: Joi.date().optional().allow(null),
  lease_renew_date: Joi.date().optional().allow(null),

  property_manager: Joi.string().max(255).optional().allow(null),
  property_manager_salary: Joi.number().precision(2).optional().allow(null),
  description: Joi.string().optional().allow(null),

land_area_sqft: Joi.number().precision(2).positive().optional().allow(null),
carpet_area_sqft: Joi.number().precision(2).positive().optional().allow(null),

geo_latitude: Joi.number().precision(6).optional().allow(null),
geo_longitude: Joi.number().precision(6).optional().allow(null),

investment_type: Joi.string().max(50).optional().allow(null),

unit_count: Joi.number().integer().positive().optional().allow(null),
unit_price: Joi.number().precision(2).positive().optional().allow(null),
investment_yield_percent: Joi.number().precision(2).positive().optional().allow(null),

insurance_expiry_date: Joi.date().optional().allow(null),
last_renovation_date: Joi.date().optional().allow(null),

facility_management_company: Joi.string().max(255).optional().allow(null),

land_conversion_certificate: Joi.string().max(150).optional().allow(null),
environment_clearance: Joi.string().max(150).optional().allow(null),
building_plan_approval: Joi.string().max(150).optional().allow(null),

  sale_deed: Joi.string().max(150).optional().allow(null),
  allotment_letter: Joi.string().max(150).optional().allow(null),
  occupancy_certificate_oc: Joi.string().max(150).optional().allow(null),
  completion_certificate_cc: Joi.string().max(150).optional().allow(null),
  noc_from_society: Joi.string().max(150).optional().allow(null),
  encumbrance_certificate: Joi.string().max(150).optional().allow(null),

  created_by: Joi.number().integer().optional(),
  updated_by: Joi.number().integer().optional(),
});