import { Request, Response } from 'express';
import AssetService from '../services/asset.service';


class AssetController {
	createAsset = async (req: Request, res: Response) => {
		try {
			const userSession = (req as any).user;
			const userId = userSession?.id;
			const newAsset = await AssetService.createAsset(req.body, userId);
			return res.status(201).json(newAsset);
		} catch (error) {
			const msg = (error as any)?.message || 'Internal server error';
			return res.status((error as any)?.statusCode || 400).json({ error: msg });
		}
	}
	getAssets = async (req: Request, res: Response) => {
		try {
			const userSession = (req as any).user;
			const userId = userSession?.id;
			const { page, limit, sortField, sortOrder, ...filters } = req.query;
			const assetsList = await AssetService.getAssets(userId, {
					page: page ? Number(page) : undefined,
					limit: limit ? Number(limit) : undefined,
					sortField: sortField as string,
					sortOrder: (sortOrder as any) || 'ASC',
					filters,
					});
			return res.status(200).json(assetsList);
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}
	updateAsset = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const userSession = (req as any).user;
			const userId = userSession?.id;
			const updatedAsset = await AssetService.updateAsset(Number(id), req.body, userId);
			return res.status(200).json(updatedAsset);
		} catch (error) {
			return res.status((error as any)?.statusCode || 500).json({ error: (error as any)?.message || (error as Error).message });
		}
	}
	deleteAsset = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await AssetService.deleteAsset(Number(id));
			return res.status(204).send();
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}

}


export default new AssetController();