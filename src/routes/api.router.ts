import { Router } from "express";
import assetRoutes from '../modules/asset/asset.routes';

const router = Router();

router.use('/assets', assetRoutes);

export default router;