import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';

// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
  // Handle malformed JSON body error dari express.json()
  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400)) {
    return response(res, 400, 'Invalid JSON payload', null);
  }

  // Handle ClientError and its subclasses (InvariantError, NotFoundError)
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error('Unhandled error:', err);
  return response(res, status, message, null);
};

export default ErrorHandler;