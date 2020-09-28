'use strict';
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const config = require('../config/config');


const encrypt =  function (data) {
  try {    
    let cipher = crypto.createCipher(algorithm, config.session.encryptionKey);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
  }
  catch(err){
    throw err;
  }
};

const decrypt =  function (data) {
  try {    
    let encryptedText = Buffer.from(data, 'hex');
    let decipher = crypto.createDecipher(algorithm,config.session.encryptionKey);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
  catch(err){
    throw err;
  }
};

exports = module.exports = { encrypt , decrypt  }
