const STATUS_CODES = {
  SUCCESS: 200,
  BAD_REQUEST:400,
  UNAUTHORIZED:401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR:500
}

const ERROR_CODES = {
  BAD_REQUEST:"BAD_REQUEST", 
  UNAUTHORIZED:'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR:'INTERNAL_SERVER_ERROR', 
  TWILIO_SERVICE_ERROR:'TWILIO_SERVICE_ERROR',
  TWILIO_INVALID_NUMBER:'TWILIO_INVALID_NUMBER',
  TWILIO_MAX_SEND_ATTEMPTS_ERROR:'TWILIO_MAX_SEND_ATTEMPTS_ERROR',
  TWILIO_TOO_MANY_REQUESTS: 'TWILIO_TOO_MANY_REQUESTS',
  TWILIO_VERIFICATION_CODE_EXPIRED_OR_NOT_FOUND:'TWILIO_VERIFICATION_CODE_EXPIRED_OR_NOT_FOUND',
  TWILIO_VERIFICATION_CODE_INVALID:'TWILIO_VERIFICATION_CODE_INVALID',
  TWILIO_VERIFICATION_CODE_MAX_ATTEMPTS:'TWILIO_VERIFICATION_CODE_MAX_ATTEMPTS',
  BARCODE_DECODE_ERROR:'BARCODE_DECODE_ERROR',
  FILE_NO_ATTACHED:'FILE_NO_ATTACHED',
  WORKFLOW_ERROR:'WORKFLOW_ERROR'
}
/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message,errorCode, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = STATUS_CODES[errorCode] ? STATUS_CODES[errorCode] : STATUS_CODES.INTERNAL_SERVER_ERROR;
    this.isPublic = isPublic;
    this.errorCode = ERROR_CODES[errorCode] ? ERROR_CODES[errorCode] : ERROR_CODES.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class APIError extends ExtendableError {
  constructor(message='Something went wrong', errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR , isPublic = true) {
    super(message,errorCode, isPublic);
  }
}

class AuthenticationError extends ExtendableError {
  constructor(message="Unauthroized Access", isPublic = true) {
    super(message,ERROR_CODES.UNAUTHORIZED,  isPublic);
  }
}

class ValidationError extends ExtendableError {
  constructor(message, isPublic = true) {
    super(message, ERROR_CODES.VALIDATION_ERROR, isPublic);
  }
}


module.exports = {APIError,AuthenticationError,ValidationError,ExtendableError,ERROR_CODES,STATUS_CODES};
