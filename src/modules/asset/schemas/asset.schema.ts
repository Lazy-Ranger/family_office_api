import Joi from 'joi';

export const createAssetSchema = Joi.object({
  rows: Joi.array()
    .items(
      Joi.object({
        asset_category_id: Joi.number().integer().required(),
        asset_subcategory_id: Joi.number().integer().required(),
        field_key: Joi.string().max(255).required(),
        value: Joi.string().max(255).required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'any.required': 'Asset rows are required',
      'array.min': 'At least one asset field is required',
    }),
});


export const updateAssetSchema = Joi.object({
  asset_category_id: Joi.number().integer().required(),
  asset_subcategory_id: Joi.number().integer().required(),
  field_key: Joi.string().max(255).required(),
  value: Joi.string().max(255).required(),
}).min(1);
