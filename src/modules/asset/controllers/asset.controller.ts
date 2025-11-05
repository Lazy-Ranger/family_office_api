import { Request, Response } from 'express';
import asset from '../../../models/asset';


class AssetController {
	createAsset = async (req: Request, res: Response) => {
		try {
			const newAsset = await asset.create(req.body);
			return res.status(201).json(newAsset);
		} catch (error) {
			return res.status(400).json({ error: (error as Error).message });
		}
	}
	getAssets = async (req: Request, res: Response) => {
		try {
			const assetsList = await asset.findAll();
			return res.status(200).json(assetsList);
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}
	updateAsset = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const [updatedRows] = await asset.update(req.body, { where: { id } });
			if (updatedRows === 0) {
				return res.status(404).json({ error: 'Asset not found' });
			}
			const updatedAsset = await asset.findByPk(id);
			return res.status(200).json(updatedAsset);
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}
	deleteAsset = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const deletedRows = await asset.destroy({ where: { id } });
			if (deletedRows === 0) {
				return res.status(404).json({ error: 'Asset not found' });
			}
			return res.status(204).send();
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}

}


export default new AssetController();