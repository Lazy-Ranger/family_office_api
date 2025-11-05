import { HttpBaseException } from "./http-base-exceptions.class";

export class ServiceUnavailableException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Service Unavailable") {
    super(503, objectOrError, description);
  }
}

export class UnprocessableEntityException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Unprocessable Entity") {
    super(422, objectOrError, description);
  }
}

export class ForbiddenException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Forbidden") {
    super(403, objectOrError, description);
  }
}

export class NotFoundException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Not Found") {
    super(404, objectOrError, description);
  }
}

export class ConflictException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Conflict") {
    super(409, objectOrError, description);
  }
}

export class UnauthorizedException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Unauthorized") {
    super(401, objectOrError, description);
  }
}

export class BadRequestException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Bad Request") {
    super(400, objectOrError, description);
  }
}

export class UnsupportedMediaTypeException extends HttpBaseException {
  constructor(objectOrError?: any, description = "Unsupported Media Type") {
    super(415, objectOrError, description);
  }
}
