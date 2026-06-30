const Joi = require('joi');

exports.registerSchema = Joi.object({
  username: Joi.string().max(100).required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),

  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required'
  })
});

exports.loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});