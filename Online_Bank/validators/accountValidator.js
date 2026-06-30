const Joi = require('joi');

exports.accountSchema = Joi.object({
  accountType: Joi.string().valid('Savings', 'Checking', 'Business').required()
});