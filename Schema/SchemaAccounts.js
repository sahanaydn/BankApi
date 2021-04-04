const Joi = require("joi");

const Account = Joi.object({
    currencyCode: Joi.string().valid("TRY", "USD", "EUR").required(),
    balance: Joi.number().precision(2).required(),
  });

module.exports=Account;