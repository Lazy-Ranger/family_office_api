import { Request, Response, NextFunction } from 'express';
import { IError } from '../../interfaces';
import { valueToBoolean } from '../../utils/common';
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export default class ErrorHandlerMiddleware {
  handleErrors(
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const status = valueToBoolean(err.statusCode )
      ? err.statusCode 
      : valueToBoolean(err.description)
      ? err.status
      : 500;
    const message = valueToBoolean(err.data)
      ? err.data
      : 'Internal Server Error';

    if (status === 500) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    if (typeof next === 'function') {
      next();
    }

    res.status(Number(status));
    res.json({ code: status, message});
  }

  static asyncTryCatchMiddleware(handler: Middleware): Middleware {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req as Request, res as Response, next as NextFunction);
      } catch (e) {
        next(e)
      }
    };
  }
}
