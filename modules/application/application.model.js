
const {APIError,STATUS_CODES,ERROR_CODES} = require('../../utils/errorProvider');
const { getDB } = require('../../utils/mongoUtil');
const { encrypt, decrypt } = require('../../utils/encryptionUtil');
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');

/**
  * Create User
  * @param {Object} body - The object payload.
  * @param {Object} auth - The auth header object.
  * @returns {Promise<User, APIError>}
  */
 const createUser = async (body) => {
  try {
    const db = getDB();
    const users = db.collection('demoDb');

    const payload = {
      user_name : body.user_name,
      password : encrypt(body.password),
      email : body.email,
      created_at: moment.utc().format('ddd MMM DD YYYY HH:mm:ss z'),
      updated_at: moment.utc().format('ddd MMM DD YYYY HH:mm:ss z')
    };

    const result = await users.insertOne(payload);

    if (result && result.insertedCount === 1) {
      return result.ops[0];
    }
    else {
      throw new APIError('Unable To Create User',ERROR_CODES.INTERNAL_SERVER_ERROR);
    }
  } catch (e) {
    throw e
  }
};


/**
  * Get user by user_name
  * @param {String} userName - The userName of user.
  * @returns {Promise<User, APIError>}
  */
 const getUserByUsername = async (userName) => {
  try {
    const db = getDB();
    const users = db.collection('demoDb');
    const results = await users.findOne({ user_name: userName });
    
    if (results) {
      results.password = decrypt(results.password);
      return results;
    }
  } catch (e) {
    throw e
  }
};

module.exports = { createUser, getUserByUsername };
