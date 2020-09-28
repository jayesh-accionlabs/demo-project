const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate)


const createUserSchema = {
  body : 
    Joi.object(
      {
        user_name : Joi.string().required(),
        password : Joi.string().required(),
        email :  Joi.string().required()
      }
    )
};

const geteUserSchema = {
  body : 
    Joi.object(
      {
        user_name : Joi.string().required(),
      }
    )
};

module.exports = {
  createUserSchema,
  geteUserSchema
};