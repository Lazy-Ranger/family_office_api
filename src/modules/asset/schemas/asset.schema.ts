import Joi from "joi";

// Schema for creating an asset
export const createAssetSchema = Joi.object({
    assetTitle: Joi.string().min(1).max(255).optional().allow(null, ''),
    securityName: Joi.string().optional().allow(null, ''),
    // Category/subcategory are numeric ids in DB
    assetCategoryId: Joi.number().integer().required().messages({
        'number.base': 'assetCategoryId must be a number',
        'any.required': 'assetCategoryId is required',
    }),

    assetSubcategoryId: Joi.number().integer().required().messages({
        'number.base': 'assetSubcategoryId must be a number',
        'any.required': 'assetSubcategoryId is required',
    }),

    entityId: Joi.string().uuid().required().messages({
        'string.empty': 'entityId is required',
        'string.guid': 'entityId must be a valid UUID',
    }),

    assetType: Joi.string().optional(),
    acquisitionDate: Joi.date().optional().allow(null),

    currentValue: Joi.number().precision(2).required().messages({
        'number.base': 'currentValue must be a number',
        'any.required': 'currentValue is required',
    }),

    // Real estate / common fields
    purchaseDate: Joi.date().optional().allow(null),
    purchasePrice: Joi.number().precision(2).optional().allow(null),
    location: Joi.string().max(255).optional().allow(null),
    acquiredDate: Joi.date().optional().allow(null),
    document: Joi.string().max(255).optional().allow(null),
    propertyCategory: Joi.string().max(255).optional().allow(null),
    numberOfOwner: Joi.number().integer().optional().allow(null),

    // Financials / maintenance
    propertyTax: Joi.number().precision(2).optional().allow(null),
    houseManager: Joi.string().max(255).optional().allow(null),
    managerSalary: Joi.number().precision(2).optional().allow(null),
    houseInsurancePremium: Joi.number().precision(2).optional().allow(null),
    rentPremiumFrequency: Joi.string().optional().allow(null),
    nextPremiumDate: Joi.date().optional().allow(null),
    dueDate: Joi.date().optional().allow(null),
    monthlyMaintenance: Joi.number().precision(2).optional().allow(null),
    tenantName: Joi.string().optional().allow(null),
    monthlyRent: Joi.number().precision(2).optional().allow(null),
    securityDeposit: Joi.number().precision(2).optional().allow(null),
    rentFrequency: Joi.string().optional().allow(null),
    rentCollectedStatus: Joi.string().optional().allow(null),

    // Lease details
    leaseStart: Joi.date().optional().allow(null),
    leaseEnd: Joi.date().optional().allow(null),
    leaseRenewDate: Joi.date().optional().allow(null),

    // Loan / EMI
    loanAmountOutstanding: Joi.number().precision(2).optional().allow(null),
    emiAmount: Joi.number().precision(2).optional().allow(null),
    emiFrequency: Joi.string().optional().allow(null),
    nextEmiDate: Joi.date().optional().allow(null),

    // Vehicle specific
    brand: Joi.string().max(255).optional().allow(null),
    referenceNumber: Joi.string().max(255).optional().allow(null),
    registrationNumber: Joi.string().max(255).optional().allow(null),
    acquisitionMode: Joi.string().optional().allow(null),
    insuredValue: Joi.number().precision(2).optional().allow(null),
    insurerName: Joi.string().optional().allow(null),
    premiumAmount: Joi.number().precision(2).optional().allow(null),
    premiumFrequency: Joi.string().optional().allow(null),
    policyRenewalDate: Joi.date().optional().allow(null),
    reportDate: Joi.date().optional().allow(null, ''),
    security: Joi.string().optional().allow(null, ''),
    quantity: Joi.number().precision(4).optional().allow(null, ''),
    averagePrice: Joi.number().precision(2).optional().allow(null, ''),
    acquisationCost: Joi.number().precision(2).optional().allow(null, ''),
    marketPrice: Joi.number().precision(2).optional().allow(null, ''),
    marketValue: Joi.number().precision(2).optional().allow(null, ''),
    unrealizedGainLoss: Joi.number().precision(2).optional().allow(null, ''),
    realizedGainLoss: Joi.number().precision(2).optional().allow(null, ''),
    accruedInterest: Joi.number().precision(2).optional().allow(null, ''),
    marketPriceDate: Joi.date().optional().allow(null, ''),


    additionalNotes: Joi.string().optional().allow(null),

    // Auditing fields — stamp server-side when possible; make optional so
    // unauthenticated clients (or tests) won't get a validation error.
    created_by: Joi.number().integer().optional().allow(null).messages({
        'number.base': 'created_by must be a number',
    }),
    updated_by: Joi.number().integer().optional().allow(null).messages({
        'number.base': 'updated_by must be a number',
    }),
});

// Schema for updating an asset — all fields optional
export const updateAssetSchema = Joi.object({
    assetTitle: Joi.string().min(1).max(255).optional(),
    assetCategoryId: Joi.number().integer().optional(),
    assetSubcategoryId: Joi.number().integer().optional(),
    entityId: Joi.string().uuid().optional(),
    assetType: Joi.string().optional(),
    acquisitionDate: Joi.date().optional().allow(null),
    currentValue: Joi.number().precision(2).optional(),
    purchaseDate: Joi.date().optional().allow(null),
    purchasePrice: Joi.number().precision(2).optional().allow(null),
    ownerId: Joi.string().uuid().optional().allow(null),
    location: Joi.string().max(255).optional().allow(null),
    acquiredDate: Joi.date().optional().allow(null),
    document: Joi.string().max(255).optional().allow(null),
    propertyCategory: Joi.string().max(255).optional().allow(null),
    numberOfOwner: Joi.number().integer().optional().allow(null),
    propertyTax: Joi.number().precision(2).optional().allow(null),
    houseManager: Joi.string().max(255).optional().allow(null),
    managerSalary: Joi.number().precision(2).optional().allow(null),
    houseInsurancePremium: Joi.number().precision(2).optional().allow(null),
    rentPremiumFrequency: Joi.string().optional().allow(null),
    nextPremiumDate: Joi.date().optional().allow(null),
    dueDate: Joi.date().optional().allow(null),
    monthlyMaintenance: Joi.number().precision(2).optional().allow(null),
    tenantName: Joi.string().optional().allow(null),
    monthlyRent: Joi.number().precision(2).optional().allow(null),
    securityDeposit: Joi.number().precision(2).optional().allow(null),
    rentFrequency: Joi.string().optional().allow(null),
    rentCollectedStatus: Joi.string().optional().allow(null),
    leaseStart: Joi.date().optional().allow(null),
    leaseEnd: Joi.date().optional().allow(null),
    leaseRenewDate: Joi.date().optional().allow(null),
    loanAmountOutstanding: Joi.number().precision(2).optional().allow(null),
    emiAmount: Joi.number().precision(2).optional().allow(null),
    emiFrequency: Joi.string().optional().allow(null),
    nextEmiDate: Joi.date().optional().allow(null),
    brand: Joi.string().max(255).optional().allow(null),
    referenceNumber: Joi.string().max(255).optional().allow(null),
    registrationNumber: Joi.string().max(255).optional().allow(null),
    acquisitionMode: Joi.string().optional().allow(null),
    insuredValue: Joi.number().precision(2).optional().allow(null),
    insurerName: Joi.string().optional().allow(null),
    premiumAmount: Joi.number().precision(2).optional().allow(null),
    premiumFrequency: Joi.string().optional().allow(null),
    policyRenewalDate: Joi.date().optional().allow(null),
    reportDate: Joi.date().optional(),
    security: Joi.string().optional().allow(null, ''),
    securityName: Joi.string().optional().allow(null, ''),
    quantity: Joi.number().precision(4).optional(),
    averagePrice: Joi.number().precision(2).optional(),
    purchaseDateSecurity: Joi.date().optional(),
    acquisationCost: Joi.number().precision(2).optional(),
    marketPrice: Joi.number().precision(2).optional(),
    marketValue: Joi.number().precision(2).optional(),
    unrealizedGainLoss: Joi.number().precision(2).optional(),
    realizedGainLoss: Joi.number().precision(2).optional(),
    accruedInterest: Joi.number().precision(2).optional(),
    marketPriceDate: Joi.date().optional(),

    additionalNotes: Joi.string().optional().allow(null),
    created_by: Joi.number().integer().optional(),
    updated_by: Joi.number().integer().optional(),
});