const Joi = require("joi");

const Transactions = Joi.object({
    senderAccountNumber: Joi.number().integer().required(),
    receiverAccountNumber: Joi.number().integer().required(),
    amount: Joi.number().precision(2).required()
  });

module.exports=Transactions;