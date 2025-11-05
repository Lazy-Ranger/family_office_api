import { Router } from 'express';
import AssetController from '../controllers/asset.controller';

export const ASSETS_ROUTER = Router();

ASSETS_ROUTER.post('/assets', AssetController.createAsset);
ASSETS_ROUTER.get('/assets', AssetController.getAssets);
ASSETS_ROUTER.put('/asset/:id', AssetController.updateAsset);
ASSETS_ROUTER.delete('/asset/:id', AssetController.deleteAsset);
