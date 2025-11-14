
import { Router } from 'express';
import MASTER_CONTROLLER from '../controller/master.controller';

export const MASTER_ROUTER = Router();

MASTER_ROUTER.get('/', MASTER_CONTROLLER.master);


