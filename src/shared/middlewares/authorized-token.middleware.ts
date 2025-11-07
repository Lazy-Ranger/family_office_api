import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";
import { httpException, UnauthorizedException, ForbiddenException } from "../../utils/http";
import { JwtService } from "../services";
import { HttpSessionRequest, User } from '../../interfaces'
import { LTR_OBJECT, ERRORS_LITERAL } from '../../config'
import { valueToBoolean } from '../../utils/common'
import RoleService, { IRoleService } from '../../modules/roles/service/role.service'


type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export interface UserWithPermissions extends User {
  permissions: string[];
  can: Function
  canAny: Function
}

export const authorizedToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new UnauthorizedException();
    }
    const request = req as HttpSessionRequest;
    const user = JwtService.verify(token) as UserWithPermissions
    if (typeof user === LTR_OBJECT) {
      const userPermissions = await RoleService.getPermissions(user.id as number);
      request.permissions = userPermissions;
      user.can = (permissionList: string | string[]) => {
        const requiredPermissions = Array.isArray(permissionList)
          ? permissionList
          : permissionList.split('|');
        return requiredPermissions.every((p) =>
          request.permissions.includes(p)
        );
      };

      user.canAny = (permissionList: string | string[]) => {
        const requiredPermissions = Array.isArray(permissionList)
          ? permissionList
          : permissionList.split('|');
        return requiredPermissions.some((p) =>
          request.permissions.includes(p)
        );
      };
    }
    Object.assign(req, { user });
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return httpException(res, new UnauthorizedException("Token expired"));
    }
    if (err instanceof JsonWebTokenError) {
      return httpException(res, new UnauthorizedException("Invalid token"));
    }
    if (err instanceof NotBeforeError) {
      return httpException(res, new UnauthorizedException("Token not active yet"));
    }
    return httpException(res, err);
  }
}

export const can = (permissionList: string | string[]): Middleware => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const request = req as HttpSessionRequest
    const user = request.user as unknown as UserWithPermissions
    const allFound = valueToBoolean(user)
      ? user.can(permissionList)
      : false;
    if (!valueToBoolean(allFound)) {
      throw new ForbiddenException(ERRORS_LITERAL.DENIED_RESOURCE);
    }
    next();
  };
}

export const canAny = (permissionList: string | string[]): Middleware => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const request = req as HttpSessionRequest
    const user = request.user as unknown as UserWithPermissions
    const anyFound = valueToBoolean(request.user)
      ? user?.canAny(permissionList)
      : false;
    if (!valueToBoolean(anyFound)) {
      throw new ForbiddenException(ERRORS_LITERAL.DENIED_RESOURCE);
    }
    next();
  };
}
