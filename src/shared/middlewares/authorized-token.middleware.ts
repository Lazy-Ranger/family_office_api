import { Request, Response, NextFunction } from "express";
import { httpException, UnauthorizedException } from "../../utils/http";
import { JwtService } from "../services";

export function authorizedToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = JwtService.verify(token);

    Object.assign(req, { user }); //req.user = user

    next();
  } catch (err) {
    return httpException(res, err);
  }
}
