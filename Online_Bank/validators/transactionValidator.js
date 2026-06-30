const Joi = require('joi');

// exports.transactionSchema = Joi.object({
//   amount: Joi.number().positive().required(),
//   type: Joi.string().valid('deposit', 'withdraw', 'transfer').required()
// });

// Seperate schemas
exports.depositSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().max(200).required()
});

exports.withdrawSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().max(200).required()
});

exports.transferSchema = Joi.object({
  toAccountId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().max(200).required()
});