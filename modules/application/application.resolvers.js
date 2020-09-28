const config = require('../../config/config');
const Application = require('./application.model');
const schema = require('./application.schema');
const validateSchema = require("../../utils/schemaValidator");
const { AuthenticationError, APIError, ERROR_CODES } = require('../../utils/errorProvider');
const dd = require('device-detector-js');

module.exports = {
  // Query: {
  //   getUsers: async (parent, args, context, info) => {
  //     const result = await Application.getUserDetails(context.authScope.user_id);

  //     return {
  //       message: "User Fetched Successfully",
  //       user_details: result
  //     };
  //   }
  // },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      validateSchema(args.input, schema.createUserSchema);

      const result = await Application.createUser(args.input);
      
      return {
        message : "User Added Successfully",
        user_details : result
      };
    },

    getUser: async (parent, args, context, info) => {
      validateSchema(args.input, schema.geteUserSchema);

      const result = await Application.getUserByUsername(args.input.user_name);

      return {
        message: "User Fetched Successfully",
        user_details: result
      };
    }
  }
}