import Joi from "joi";

export const createUserSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  last_name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8) // enforce strong password
    .max(128)
    .required(),

  role: Joi.string()
    .valid("STUDENT", "TEACHER", "ADMIN")
    .required(),

  phone_number: Joi.string()
    .pattern(/^[0-9+\-()\s]{7,20}$/) // basic phone validation
    .optional(),

  department: Joi.string()
    .max(100)
    .optional(),

  is_active: Joi.boolean().default(true),

  last_login: Joi.date().iso().optional(),

  created_at: Joi.date().iso().optional(),
  updated_at: Joi.date().iso().optional(),
});
