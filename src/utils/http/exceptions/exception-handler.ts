import { Response } from "express";
import { HttpBaseException } from "./http-base-exceptions.class";
import { ServiceUnavailableException } from "./http-exceptions";

function createBody(objectOrError: object | string, description: string, statusCode: number) {
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return typeof objectOrError === "object" && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
  
  export function httpException(res: Response, exception: HttpBaseException | Error | unknown, message = "") {

    let isHttpBaseException = false;

    if(exception instanceof HttpBaseException) {
        isHttpBaseException = true;
    }
  
    if ((message && !isHttpBaseException) || exception instanceof ServiceUnavailableException) {
      console.log(message, exception);
    }
  
    const preparedException = isHttpBaseException ? exception : new ServiceUnavailableException();

    const { data, description, statusCode } = preparedException as HttpBaseException;
    const body = createBody(data, description, statusCode);
  
    res.statusCode = statusCode;
    res.json(body);
  }
 