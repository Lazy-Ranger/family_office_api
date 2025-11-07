import { Router } from "express";
import { AUTH_ROUTER } from "../modules/auth";
import {ASSETS_ROUTER} from '../modules/asset'
import { ROLES_ROUTER } from "../modules/roles";
import { USERS_ROUTER } from "../modules/users";
import {authorizedToken} from "../shared/middlewares/authorized-token.middleware";

export const API_ROUTER = Router();

// Auth routes
API_ROUTER.use("/auth", AUTH_ROUTER);

// Users router
API_ROUTER.use("/users", authorizedToken, USERS_ROUTER);

// Assets router 

API_ROUTER.use("/assets", authorizedToken, ASSETS_ROUTER);

// Roles router
API_ROUTER.use("/roles", authorizedToken, ROLES_ROUTER);