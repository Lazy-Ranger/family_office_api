import { Router } from "express";
import entityController from "../controllers/entity.controller";

export const ENTITY_ROUTER = Router();

ENTITY_ROUTER.get("/entities",entityController.getEntity);
