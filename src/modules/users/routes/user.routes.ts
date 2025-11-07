import { Router } from "express";
import USERS_CONTROLLER from "../controllers/user.controller";
import { createUserSchema } from "../schema";
import { PERMISSIONS } from "../../../config";
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators'
import { canAny } from '../../../shared/middlewares/authorized-token.middleware'

export const USERS_ROUTER = Router();
const { validate } = new ValidatorMiddleware();

USERS_ROUTER.post("/create", canAny([PERMISSIONS.CREATE_ROLE, PERMISSIONS.ALL]), validate(createUserSchema), USERS_CONTROLLER.registerUser);
