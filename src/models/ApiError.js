import { get } from 'lodash';

class ApiError {
  constructor({ message, status, originalError, isServerError }) {
    this.message = message;
    this.status = status;
    this.isServerError = isServerError;
    this.originalError = originalError;
  }

  static from(originalError) {
    const parsedErr = get(originalError, 'graphQLErrors[0]', originalError);
    const message = get(parsedErr, 'message', 'Something went wrong');
    const status = get(parsedErr, 'status', 500);
    const isServerError = status >= 500 && status < 600;

    return new ApiError({ message, status, originalError, isServerError });
  }
}

export default ApiError;
