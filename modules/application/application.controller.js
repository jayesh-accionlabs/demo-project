const { APIError, AuthenticationError, ERROR_CODES } = require('../../utils/errorProvider');
const Application = require('./application.model');
const schemavalidtor = require('../../utils/schemaValidator');
const schemas = require('./application.schema');

/**
 * Create new user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const create = async (req, res, next) => {
  try {

    const result = await Application.createUser(req.body);

    res.json({
      message: "User Created Successfully",
      user_details: result
    });
  }
  catch (err) {
    next(err);
  }
}

/**
 * Get existing user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const getUser = async (req, res, next) => {
  try {
    const result = await Application.getUserByUsername(req.query.userName);

    res.json({
      message: "User Fetched Successfully",
      user_details: result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getUser };
