import { Router } from "express";
import USERS_CONTROLLER from "../controllers/user.controller";
import { createUserSchema } from "../schema";
import { PERMISSIONS } from "../../../config";
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators'
import { canAny } from '../../../shared/middlewares/authorized-token.middleware'

export const USERS_ROUTER = Router();
const { validate } = new ValidatorMiddleware();

USERS_ROUTER.post("/create", canAny(['Users', PERMISSIONS.ALL]), validate(createUserSchema), USERS_CONTROLLER.registerUser);
USERS_ROUTER.get("/list", canAny([ 'Users',PERMISSIONS.ALL]),USERS_CONTROLLER.getUsers);
USERS_ROUTER.patch("/update/:id", canAny([ 'Users',PERMISSIONS.ALL]), USERS_CONTROLLER.updateUser);
USERS_ROUTER.delete("/delete/:id", canAny([ 'Users',PERMISSIONS.ALL]), USERS_CONTROLLER.deleteUser);
