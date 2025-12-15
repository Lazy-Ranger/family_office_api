import Joi from "joi";

export const assetSubCategorySchema = Joi.object({
  id: Joi.number().integer().optional(),

  name: Joi.string().min(1).max(255).required().messages({
    'string.base': 'Subcategory name must be a string',
    'string.empty': 'Subcategory name is required',
  }),

  description: Joi.string().allow('', null).optional(),

  totalValue: Joi.number().precision(2).required().messages({
    'number.base': 'Total value must be a number',
    'any.required': 'Total value is required',
  }),

  portfolioPercentage: Joi.number().precision(2).min(0).max(100).required().messages({
    'number.base': 'Portfolio percentage must be a number',
    'any.required': 'Portfolio percentage is required',
  }),

  aggregatedKPIs: Joi.object()
    .pattern(Joi.string(), Joi.number().precision(2))
    .optional()
    .messages({
      'object.base': 'Aggregated KPIs must be an object with numeric values',
    }),

  assetCategoryId: Joi.number().integer().required().messages({
    'number.base': 'Asset category ID must be a number',
    'any.required': 'Asset category ID is required',
  }),

  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});



export const assetCategorySchema = Joi.object({
  id: Joi.number().integer().optional(),
  
  name: Joi.string().min(1).max(255).required().messages({
    'string.base': 'Category name must be a string',
    'string.empty': 'Category name is required',
  }),

  description: Joi.string().allow('', null).optional(),
  icon: Joi.string().allow('', null).optional(),
  color: Joi.string().allow('', null).optional(),

  totalValue: Joi.number().precision(2).required().messages({
    'number.base': 'Total value must be a number',
    'any.required': 'Total value is required',
  }),

  portfolioPercentage: Joi.number().precision(2).min(0).max(100).required().messages({
    'number.base': 'Portfolio percentage must be a number',
    'any.required': 'Portfolio percentage is required',
  }),

  aggregatedKPIs: Joi.object()
    .pattern(Joi.string(), Joi.number().precision(2))
    .optional()
    .messages({
      'object.base': 'Aggregated KPIs must be an object with numeric values',
    }),

  subCategories: Joi.array().items(assetSubCategorySchema).optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const familySchema = Joi.object({
  groupName: Joi.string().min(1).required().messages({
    "string.empty": "Group name is required",
  }),

  groupContactName: Joi.string().allow("", null),

  relationshipId: Joi.number().integer().allow(null),
  relationshipManager: Joi.string().allow("", null),

  address_1: Joi.string().allow("", null),
  address_2: Joi.string().allow("", null),
  city: Joi.string().allow("", null),
  state: Joi.string().allow("", null),

  pincode: Joi.string().allow("", null),
  phoneNo: Joi.string().allow("", null),
  mobileNo: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null),

  inceptionDate: Joi.date().allow(null),

  advisorId: Joi.number().integer().allow(null),
  advisorName: Joi.string().allow("", null),

  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
});
export const assetSubSubCategorySchema = Joi.object({
  sub_category_id: Joi.number().integer().required(),

  name: Joi.string()
    .max(100)
    .required(),

  code: Joi.string()
    .max(20)
    .required(),

  description: Joi.string()
    .max(255)
    .allow(null, ""),

  is_active: Joi.boolean().allow(null),

  created_by: Joi.string()
    .max(50)
    .allow(null, ""),

  updated_by: Joi.string()
    .max(50)
    .allow(null, ""),
});
