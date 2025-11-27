import { Router } from "express";
import ROLE_CONTROLLER from "../controller/roles.controller";
import { roleSchema } from "../schema";
import { PERMISSIONS } from "../../../config";
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators'
import { canAny } from '../../../shared/middlewares/authorized-token.middleware'

export const ROLES_ROUTER = Router();
const { validate } = new ValidatorMiddleware();

ROLES_ROUTER.post("/create", canAny(['CreateRole', PERMISSIONS.ALL]), validate(roleSchema), ROLE_CONTROLLER.create);

ROLES_ROUTER.get('/list', canAny(['ViewRole', PERMISSIONS.ALL]), ROLE_CONTROLLER.list);

ROLES_ROUTER.get('/permissions/:id', canAny(['ViewRole', PERMISSIONS.ALL]), ROLE_CONTROLLER.listPermissions);

ROLES_ROUTER.get('/permissions', canAny(['ViewRole', PERMISSIONS.ALL]), ROLE_CONTROLLER.listAllPermissions);

ROLES_ROUTER.get('/role-permissions/:id', canAny(['ViewRole', PERMISSIONS.ALL]), ROLE_CONTROLLER.listRolePermissions);
 
ROLES_ROUTER.patch('/update/:id', canAny(['UpdateRole', PERMISSIONS.ALL]), validate(roleSchema), ROLE_CONTROLLER.edit);

ROLES_ROUTER.delete('/delete/:id', canAny(['DeleteRole', PERMISSIONS.ALL]), ROLE_CONTROLLER.delete);

