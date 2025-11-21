import { Router } from "express";
import USERS_CONTROLLER from "../controllers/user.controller";
import { createUserSchema } from "../schema";
import { PERMISSIONS } from "../../../config";
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators'
import { canAny } from '../../../shared/middlewares/authorized-token.middleware'

export const USERS_ROUTER = Router();
const { validate } = new ValidatorMiddleware();

USERS_ROUTER.post("/create", validate(createUserSchema), USERS_CONTROLLER.registerUser);
USERS_ROUTER.get("/list", USERS_CONTROLLER.getUsers);
USERS_ROUTER.patch("/update/:id", canAny([PERMISSIONS.UPDATE_ROLE, PERMISSIONS.ALL]), USERS_CONTROLLER.updateUser);
USERS_ROUTER.delete("/delete/:id", canAny([PERMISSIONS.DELETE_ROLE, PERMISSIONS.ALL]), USERS_CONTROLLER.deleteUser);
