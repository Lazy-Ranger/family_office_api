import { Request, Response } from 'express';
import AssetService from '../services/asset.service';
import { HttpSessionRequest } from '../../../../src/interfaces/user-session.interface';
import loggerService from '../../../shared/services/logger.service';

class AssetController {
	createAsset = async (req: Request, res: Response) => {
		try {
			const sessionReq = req as HttpSessionRequest;
			const userSession = sessionReq.user;
			const userId = userSession?.id;
			req.body = { ...(req.body || {}), created_by: userId, updated_by: userId };
			const newAsset = await AssetService.createAsset(req.body, userId);
			 await loggerService.log({userId,action: 'ASSET_CREATED',method: 'POST',endpoint: '/assets/add',
					reqBody: req.body,
					resBody: newAsset,
					statusCode: 201,
				  });
			return res.status(201).json(newAsset);
		} catch (error) {
			const err = error as { message?: string; statusCode?: number };
			const msg = err.message || 'Internal server error';
			return res.status(err.statusCode || 400).json({ error: msg });
		}
	}
	getAssets = async (req: Request, res: Response) => {
		
		const sessionReq = req as HttpSessionRequest;
			const userSession = sessionReq.user;
			const userId = userSession?.id;
		const subcategory_id = parseInt(String(req.query.subcategory_id), 10);
		try {
			const { page, limit, sortField, sortOrder, ...filters } = req.query;

			const pageNum = Array.isArray(page) ? Number(page[0]) : page ? Number(page as unknown as string) : undefined;
			const limitNum = Array.isArray(limit) ? Number(limit[0]) : limit ? Number(limit as unknown as string) : undefined;
			const sortFieldStr = Array.isArray(sortField) ? String(sortField[0]) : sortField ? String(sortField) : undefined;
			const sortOrderStrRaw = Array.isArray(sortOrder) ? String(sortOrder[0]) : sortOrder ? String(sortOrder) : undefined;
			const sortOrderNormalized = sortOrderStrRaw && sortOrderStrRaw.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

			const assetsList = await AssetService.getAssets( subcategory_id, {
					page: pageNum,
					limit: limitNum,
					sortField: sortFieldStr,
					sortOrder: sortOrderNormalized as 'ASC' | 'DESC',
					filters,
					});
					await loggerService.log({
						  userId: userId,
						  action: "ASSET_DATA_RETRIEVED",
						  method: "GET",
						  endpoint: "/assets/data",
						  reqBody: userId,
						  resBody: assetsList,
						  statusCode: 201
						});
			return res.status(200).json(assetsList);
		} catch (error) {
			await loggerService.log({
						  userId: userId,
						  action: "ASSET_DATA_RETRIEVED",
						  method: "GET",
						  endpoint: "/assets/data",
						  reqBody: userId,
						  resBody: null,
						  statusCode: res.statusCode || 500,
						  error: (error as Error).message
						});
			return res.status(500).json({ error: (error as Error).message });
		}
	}
	getSubcategoryPage = async (req: Request, res: Response) => {
		const subcategory_id = parseInt(req.params.id, 10);

		try {
			const subcategoryPage = await AssetService.getSubcategoryPage(subcategory_id);
			return res.status(200).json(subcategoryPage);
		} catch (error) {
			const err = error as { message?: string; statusCode?: number };
			return res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
		}
	}
	getAssetById = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const asset = await AssetService.getAssetById(id);
			return res.status(200).json(asset);
		}
		catch (error) {
			const err = error as { message?: string; statusCode?: number };
			return res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
		}
	}
	updateAsset = async (req: Request, res: Response) => {
		const { id } = req.params;
			const sessionReq = req as HttpSessionRequest;
			const userSession = sessionReq.user;
			const userId = userSession?.id;
		try {
			// set updated_by on the incoming body so update validators and logs can see it
			req.body = { ...(req.body || {}), updated_by: userId };
			const updatedAsset = await AssetService.updateAsset(Number(id), req.body, userId);
				await loggerService.log({
				  userId: userId,
				  action: "ASSET_UPDATED",
				  method: "PATCH",
				  endpoint: `/assets/${userId}`,
				  reqBody: req.body,
				  resBody: null,
				  statusCode: 201
				});
			return res.status(200).json(updatedAsset);
		} catch (error) {
			const err = error as { message?: string; statusCode?: number };
			await loggerService.log({
				  userId: userId,
				  action: "ASSET_UPDATED",
				  method: "PATCH",
				  endpoint: `/assets/${userId}`,
				  reqBody: req.body,
				  resBody: null,
				  statusCode: err.statusCode || 500,
				  error: err.message || 'Internal server error'
				});
			return res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
		}
	}
	deleteAsset = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await AssetService.deleteAsset(Number(id));
			await loggerService.log({
			userId: Number(id),
			action: "ASSET_DELETED",
			method: "DELETE",
			endpoint: `/assets/${id}`,
			reqBody: null,
			resBody: null,
			statusCode: 201
			});
			return res.status(204).send();
		} catch (error) {
			return res.status(500).json({ error: (error as Error).message });
		}
	}

}


export default new AssetController();