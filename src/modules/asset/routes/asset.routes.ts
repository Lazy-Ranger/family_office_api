import { Router } from 'express';
import AssetController from '../controllers/asset.controller';
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators';
import { createAssetSchema, updateAssetSchema } from '../schemas';

export const ASSETS_ROUTER = Router();
const { validate } = new ValidatorMiddleware()

ASSETS_ROUTER.post('/add', validate(createAssetSchema), AssetController.createAsset);
ASSETS_ROUTER.get('/data', AssetController.getAssets);
ASSETS_ROUTER.patch('/:id', validate(updateAssetSchema), AssetController.updateAsset);
ASSETS_ROUTER.delete('/:id', AssetController.deleteAsset);
