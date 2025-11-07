import Joi from "joi";

const htmlRegex = /^(?!.*<.*?>).*$/s;
export const roleSchema = Joi.object({
  name: Joi.string().required().pattern(htmlRegex).messages({
    'string.pattern.base': 'HTML tags are not allowed',
  }),
  permissions: Joi.array().items(Joi.number()).required(),
});
