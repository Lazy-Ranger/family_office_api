import { Router } from "express";
import { AUTH_ROUTER } from "../modules/auth";
import {ASSETS_ROUTER} from '../modules/asset'
// import { authorizedToken } from "../shared/middlewares";

export const API_ROUTER = Router();

// auth routes
API_ROUTER.use("/auth", AUTH_ROUTER);

// Assets router 

API_ROUTER.use("/assets", ASSETS_ROUTER);
