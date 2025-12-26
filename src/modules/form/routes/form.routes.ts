
import { Router } from 'express';
import FormController from '../controllers/form.controller';

export const FORM_ROUTER = Router();

FORM_ROUTER.get('/', FormController.formmaster);

