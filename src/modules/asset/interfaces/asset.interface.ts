export interface IAsset {
  id: number;
  assetTitle: string;
  assetType?: string;
  acquisitionDate?: Date;
  currentValue: number;
  ownerId?: string | number;

  // Relations / foreign keys
  assetCategoryId?: string;
  assetSubcategoryId?: string;
  entityId?: string;

  // Real estate / common fields
  purchaseDate?: Date;
  purchasePrice?: number;
  location?: string;
  acquiredDate?: Date;
  document?: string;
  propertyCategory?: string;
  numberOfOwner?: number;

  // Financials / maintenance
  propertyTax?: number;
  houseManager?: string;
  managerSalary?: number;
  houseInsurancePremium?: number;
  rentPremiumFrequency?: string;
  nextPremiumDate?: Date;
  dueDate?: Date;
  monthlyMaintenance?: number;
  tenantName?: string;
  monthlyRent?: number;
  securityDeposit?: number;
  rentFrequency?: string;
  rentCollectedStatus?: string;

  // Lease details
  leaseStart?: Date;
  leaseEnd?: Date;
  leaseRenewDate?: Date;

  // Loan / EMI
  loanAmountOutstanding?: number;
  emiAmount?: number;
  emiFrequency?: string;
  nextEmiDate?: Date;

  // Vehicle specific
  brand?: string;
  referenceNumber?: string;
  registrationNumber?: string;
  acquisitionMode?: string;
  insuredValue?: number;
  insurerName?: string;
  premiumAmount?: number;
  premiumFrequency?: string;
  policyRenewalDate?: Date;

  // Misc
  additionalNotes?: string;

  // Auditing / metadata (both snake_case and camelCase allowed where used in project)
  created_by?: number;
  updated_by?: number;
  created_at?: Date;
  updated_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}