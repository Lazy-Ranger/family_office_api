import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import {BadRequestException} from "../../../utils/http/exceptions";
import { httpException } from "../../../utils/http";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export default class ValidatorMiddleware {
  validate(schema: Schema): Middleware {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,   // collect all errors
        stripUnknown: true,  // remove unexpected fields
      });

      if (error) {
        return httpException(res,  new BadRequestException(error.details.map(d => d.message).join(", ")));
      }
      req.body = value;
      next();
    };
  }
}
