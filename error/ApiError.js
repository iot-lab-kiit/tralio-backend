class ApiError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

  static unauthorized(message) {
    return new ApiError(message, 401);
  }

  static forbidden(message) {
    return new ApiError(message, 403);
  }
}

module.exports = ApiError;

