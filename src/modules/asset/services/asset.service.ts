import loggerService from '../../../shared/services/logger.service';
import asset from '../../../models/asset';
import { NotFoundException, BadRequestException } from '../../../utils/http';

export interface IAssetService {
  createAsset: (body: any, userId?: number) => Promise<any>;
  getAssets: (userId:number,options?: { page?: number; limit?: number; filters?: any; sortField?: string; sortOrder?: 'ASC' | 'DESC' }) => Promise<any[] | { data: any[]; count: number }>;
  updateAsset: (id: number, body: any, userId?: number) => Promise<any>;
  deleteAsset: (id: number) => Promise<void>;
}

class AssetService implements IAssetService {
  private assetModel: typeof asset;

  constructor() {
    this.assetModel = asset;
  }

  async createAsset(body: any, userId?: number) {
    if (userId) {
      body.created_by = userId;
      body.updated_by = userId;
    }
    try {
    const created = await this.assetModel.create(body as any);
    const log = await loggerService.log({
        userId: userId,
        action: "ASSET_CREATED",
        method: "POST",
        endpoint: "/assets/add",
        reqBody: body,
        resBody: created,
        // ip_address: body.ip_address,
        statusCode: 201
    });
    return (created.toJSON ? created.toJSON() : created) as any;
    } catch (error) {
      throw error;
    }
  }

  async getAssets(userId:number,options?: { page?: number; limit?: number; filters?: any; sortField?: string; sortOrder?: 'ASC' | 'DESC' }) {
    // If pagination options provided, return paginated response
    if (options && options.page && options.limit) {
      const page = Math.max(1, Math.floor(Number(options.page) || 1));
      const limit = Math.max(1, Math.floor(Number(options.limit) || 10));
      const offset = (page - 1) * limit;

      // simple filters passthrough — caller can provide a Sequelize-compatible `where` object in filters
      const where = options.filters || undefined;

  const order: any = options.sortField ? [[options.sortField, (options.sortOrder || 'ASC')]] : undefined;

  const findOpts: any = { where, offset, limit, include: [{ all: true, nested: true }] };
  if (order) findOpts.order = order;

  const { rows, count } = await this.assetModel.findAndCountAll(findOpts);

      return {
        data: rows.map((i) => (i.toJSON ? i.toJSON() : i)),
        count,
      };
    }

    // default: return full list with associations
    const list = await this.assetModel.findAll({ include: [{ all: true, nested: true }] });
    await loggerService.log({
        userId: userId,
        action: "ASSET_DATA_RETRIEVED",
        method: "GET",
        endpoint: "/assets/data",
        reqBody: null,
        resBody: list,
        statusCode: 201
    });
    return list.map((i) => (i.toJSON ? i.toJSON() : i)) as any[];
  }

  async updateAsset(id: number, body: any, userId?: number) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    if (userId) {
      body.updated_by = userId;
    }

    const [updatedRows] = await this.assetModel.update(body as any, { where: { id } });
    if (updatedRows === 0) {
      throw new NotFoundException('Asset not found');
    }

    const updated = await this.assetModel.findByPk(id, { include: [{ all: true, nested: true }] });
    if (!updated) {
      throw new NotFoundException('Asset not found');
    }
      await loggerService.log({
        userId: userId,
        action: "ASSET_UPDATED",
        method: "PATCH",
        endpoint: `/assets/${userId}`,
        reqBody: body,
        resBody: updated,
        statusCode: 201
    });
    return (updated.toJSON ? updated.toJSON() : updated) as any;
  }

  async deleteAsset(id: number, hardDelete = false): Promise<void> {
    if (!id) {
      throw new BadRequestException('id is required');
    }
    if (!hardDelete) {
      await this.assetModel.update({ is_active: false }, { where: { id } });  
    } else {
      await this.assetModel.destroy({ where: { id } });
    }
      await loggerService.log({
        userId: id,
        action: "ASSET_DELETED",
        method: "DELETE",
        endpoint: `/assets/${id}`,
        reqBody: null,
        resBody: null,
        statusCode: 201
    });
    return;
  }
}

export default new AssetService();
