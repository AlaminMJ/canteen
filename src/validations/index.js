import Joi from "joi";

export const registerValidation = (data) => {
  const schma = Joi.object({
    name: Joi.string().required().trim().max(255).min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(15),
    comfirmPassword: Joi.ref("password").required(),
  });
  return schma.validate(data);
};

export const loginValidation = (data) => {
  const schma = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(15),
  });
  return schma.validateAsync(data);
};
