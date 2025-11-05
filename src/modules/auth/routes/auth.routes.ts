import { Router } from "express";
import AUTH_CONTROLLER from "../controllers/auth.controller";
import { createUserSchema, loginSchema } from "../schemas";
import {authorizedToken} from '../../../shared/middlewares/authorized-token.middleware'
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators'

export const AUTH_ROUTER = Router();
const { validate } = new ValidatorMiddleware();

AUTH_ROUTER.post("/login", validate(loginSchema), AUTH_CONTROLLER.loginUser);

AUTH_ROUTER.post("/register", authorizedToken, validate(createUserSchema), AUTH_CONTROLLER.registerUser);