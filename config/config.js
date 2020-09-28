const Joi = require("@hapi/joi")

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .default('local'),
  PORT: Joi.number()
    .default(4040),
  ENCRYPTION_KEY: Joi.string().required(),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  session: {
    http_only: envVars.COOKIES_HTTP_ONLY,
    secure: envVars.COOKIES_SECURE,
    encryptionKey: envVars.ENCRYPTION_KEY
  },
  logsFolder: 'logs',
  mongo: {
    host: "mongodb://localhost:27017/demoDb"
  }
};

module.exports = config;
