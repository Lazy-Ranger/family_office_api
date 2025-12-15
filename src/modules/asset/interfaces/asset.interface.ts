export interface IRealEstateAsset {
  id?: number;

  assetCategoryId: number;
  assetSubcategoryId: number;
  assetTypeId: number;  //asset_sub_sub_category_id

  is_active?: boolean;

  property_name: string;
  built_up_area_sqft: number;

  date_of_construction?: Date | null;

  possession_status?: 'Under Construction' | 'Completed' | 'Ready to Move';
  possession_letter?: string | null;

  expected_possession_date?: Date | null;
  possession_date?: Date | null;

  age_of_property_years?: number | null;

  ownership_type: 'Sole' | 'Joint' | 'HUF' | 'Company' | 'Trust';
  ownership_percentage?: number | null;
  number_of_owner?: number | null;

  is_property_tax_paid?: boolean;

  is_oc_cc_available?: boolean;
  is_rera_registered?: boolean;

  address: string;
  locality: string;
  pin_code?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string;

  purchase_date: Date;
  purchase_price: number;

  recent_valuation_date?: Date | null;

  current_market_value?: number | null;

  loan_linked?: boolean;
  emi_amount?: number | null;
  emi_frequency?: string | null;
  next_emi_date?: Date | null;
  is_property_insured?: boolean;
  property_insurance_premium?: number | null;

  loan_amount?: number | null;
  outstanding_amount?: number | null;

  maintenance_applicable?: boolean;
  monthly_maintenance_amount?: number | null;
  maintenance_frequency?: 'Monthly' | 'Quarterly' | 'Yearly' | null;

  property_tax_amount?: number | null;
  major_repair_expenses?: number | null;

  remarks?: string | null;
  status?: 'Active' | 'Sold' | 'Inactive';
  occupancy_type?: 'Leased/Rented' | 'Self-Occupied' | 'Vacant' | null;

  sale_date?: Date | null;
  sale_value?: number | null;

  tenant_name?: string | null;
  monthly_rent?: number | null;
  security_deposit?: number | null;
  rent_frequency?: string | null;
  rent_collected_status?: string | null;

  lease_start?: Date | null;
  lease_end?: Date | null;
  lease_renew_date?: Date | null;
  property_manager?: string | null;
  property_manager_salary?: number | null;

  sale_deed: string | null;
  allotment_letter?: string | null;
  occupancy_certificate_oc?: string | null;
  completion_certificate_cc?: string | null;
  noc_from_society?: string | null;
  encumbrance_certificate: string | null;

  description?: string | null;

land_area_sqft?: number | null;
carpet_area_sqft?: number | null;

geo_latitude?: number | null;
geo_longitude?: number | null;

investment_type?: string | null;

unit_count?: number | null;
unit_price?: number | null;
investment_yield_percent?: number | null;
insurance_start_date?: Date | null;
insurance_expiry_date?: Date | null;
last_renovation_date?: Date | null;

facility_management_company?: string | null;

land_conversion_certificate?: string | null;
environment_clearance?: string | null;
building_plan_approval?: string | null;

  created_by: number;
  updated_by: number;
  created_at?: Date;
  updated_at?: Date;
}
