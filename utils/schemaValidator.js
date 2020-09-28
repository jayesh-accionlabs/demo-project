'use strict';
var Joi =  require("@hapi/joi");
var assignIn = require('lodash/assignIn');
var {ValidationError} = require('./errorProvider');


exports = module.exports = (payload,schema,disableAPIError) => {
  if (!schema) throw new Error('Please provide a validation schema');
    const errors = [];
    var joiOptions = {
        allowUnknown: false,
        abortEarly: false
      };
      const value = schema['body'].validate(payload,joiOptions);
      if (!value.error) {
        assignIn(payload, value);
      } else {
        value.error.details.forEach((error) => {
            errors.push(error.message);
        });
      }
      if (errors && errors.length > 0){
        const unifiedErrorMessage = errors.join(' and ');
        if(!!disableAPIError){
          return {errorDetails:value.error.details, unifiedError: errors}
        }
        else {
          throw new ValidationError(unifiedErrorMessage);
        }
      }
};

