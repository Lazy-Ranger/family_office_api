import { Request, Response } from 'express';
import AssetService from '../services/asset.service';


class AssetController {
	createAsset = async (req: Request, res: Response) => {
		try {
			const newAsset = await AssetService.createAsset(req.body);
			return res.status(201).json(newAsset);
		} catch (error) {
			return res.status(400).json({ error: (error as Error).message });
		}
	}
	getAssets = async (req: Request, res: Response) => {
		try {
			const assetsList = await AssetService.getAssets();
			return res.status(200).json(assetsList);
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}
	updateAsset = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const updatedAsset = await AssetService.updateAsset(Number(id), req.body);
			return res.status(200).json(updatedAsset);
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
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