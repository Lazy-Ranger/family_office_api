import { Router } from "express";
import ROLE_CONTROLLER from "../controller/roles.controller";
import { roleSchema } from "../schema";
import { PERMISSIONS } from "../../../config";
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators'
import { canAny } from '../../../shared/middlewares/authorized-token.middleware'

export const ROLES_ROUTER = Router();
const { validate } = new ValidatorMiddleware();

ROLES_ROUTER.post("/create", canAny([PERMISSIONS.CREATE_ROLE, PERMISSIONS.ALL]), validate(roleSchema), ROLE_CONTROLLER.create);

ROLES_ROUTER.get('/list', canAny([PERMISSIONS.CREATE_ROLE, PERMISSIONS.ALL]), ROLE_CONTROLLER.list);
