import Joi from "joi";

export const entitySchema = Joi.object({
  entityName: Joi.string().min(1).max(255).required(),

  address1: Joi.string().allow(null, ""),
  address2: Joi.string().allow(null, ""),
  city: Joi.string().allow(null, ""),
  pincode: Joi.string().allow(null, ""),
  state: Joi.string().allow(null, ""),

  panNumber: Joi.string().max(20).allow(null, ""),
  occupation: Joi.string().allow(null, ""),
  status: Joi.string().allow(null, ""),

  groupId: Joi.number().integer().required(),   // MUST have familyId
  groupName: Joi.string().allow(null, ""),

  advisorId: Joi.number().integer().allow(null),
  advisorName: Joi.string().allow(null, ""),

  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

