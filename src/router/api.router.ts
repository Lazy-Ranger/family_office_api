import { Router } from "express";
import { AUTH_ROUTER } from "../modules/auth";
import { ASSETS_ROUTER } from '../modules/asset'
import { ROLES_ROUTER } from "../modules/roles";
import { USERS_ROUTER } from "../modules/users";
import { MASTER_ROUTER } from "../modules/master";
import { FORM_ROUTER } from "../modules/form";
import { authorizedToken } from "../shared/middlewares/authorized-token.middleware";
import { ENTITY_ROUTER } from "../modules/entity/routes";


export const API_ROUTER = Router();

// Auth routes
API_ROUTER.use("/auth", AUTH_ROUTER);

// Users router
API_ROUTER.use("/users", authorizedToken, USERS_ROUTER);

// Assets router 

API_ROUTER.use("/assets", authorizedToken, ASSETS_ROUTER);

API_ROUTER.use("/form", authorizedToken, FORM_ROUTER);

API_ROUTER.use("/entities", authorizedToken, ENTITY_ROUTER);

// Master router (categories/subcategories)
API_ROUTER.use('/master', authorizedToken, MASTER_ROUTER);

// Roles router
API_ROUTER.use("/roles", authorizedToken, ROLES_ROUTER);