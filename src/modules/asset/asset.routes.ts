import { Router } from 'express';
import { createAsset, deleteAsset, getAssets, updateAsset } from './asset.controller';

const routes = Router();

routes.post('/assets', createAsset);
routes.get('/assets', getAssets);
routes.put('/asset/:id', updateAsset);
routes.delete('/asset/:id', deleteAsset);

export default routes;
