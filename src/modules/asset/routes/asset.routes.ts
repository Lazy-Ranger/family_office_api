import { Router } from 'express';
import AssetController from '../controllers/asset.controller';
import ValidatorMiddleware from '../../../shared/middlewares/validators/joi.validators';
import { createRLAssetSchema, updateRLAssetSchema } from '../schemas';

export const ASSETS_ROUTER = Router();
const { validate } = new ValidatorMiddleware()

ASSETS_ROUTER.post('/add',validate(createRLAssetSchema), AssetController.createAsset);
ASSETS_ROUTER.get('/data', AssetController.getAssets);
ASSETS_ROUTER.get('/subcategory-page/:id', AssetController.getSubcategoryPage);
ASSETS_ROUTER.get('/:id', AssetController.getAssetById);
ASSETS_ROUTER.patch('/:id', validate(updateRLAssetSchema), AssetController.updateAsset);
ASSETS_ROUTER.delete('/:id', AssetController.deleteAsset);
