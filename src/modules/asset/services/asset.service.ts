import asset from '../../../models/asset';
import { NotFoundException, BadRequestException } from '../../../utils/http';
import { createAssetSchema, updateAssetSchema } from '../schemas/asset.schema';

export interface IAssetService {
  // optional userId parameter allows services or controllers to stamp created_by/updated_by
  createAsset: (body: any, userId?: number) => Promise<any>;
  // getAssets supports optional pagination/filtering options; when pagination provided returns {data, count}
  getAssets: (options?: { page?: number; limit?: number; filters?: any; sortField?: string; sortOrder?: 'ASC' | 'DESC' }) => Promise<any[] | { data: any[]; count: number }>;
  updateAsset: (id: number, body: any, userId?: number) => Promise<any>;
  deleteAsset: (id: number) => Promise<void>;
}

class AssetService implements IAssetService {
  private assetModel: typeof asset;

  constructor() {
    this.assetModel = asset;
  }

  async createAsset(body: any, userId?: number) {
    try {
      await createAssetSchema.validateAsync(body, { abortEarly: false });
    } catch (err: any) {
      const msg = Array.isArray(err?.details)
        ? err.details.map((d: any) => d.message).join(', ')
        : err.message || 'Invalid asset payload';
      throw new BadRequestException(msg);
    }

    // if userId passed (e.g., from authenticated request), stamp auditing fields
    if (userId) {
      body.created_by = userId;
      body.updated_by = userId;
    }

    const created = await this.assetModel.create(body as any);
    // return plain object
    return (created.toJSON ? created.toJSON() : created) as any;
  }

  async getAssets(options?: { page?: number; limit?: number; filters?: any; sortField?: string; sortOrder?: 'ASC' | 'DESC' }) {
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
    return list.map((i) => (i.toJSON ? i.toJSON() : i)) as any[];
  }

  async updateAsset(id: number, body: any, userId?: number) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    try {
      await updateAssetSchema.validateAsync(body, { abortEarly: false });
    } catch (err: any) {
      const msg = Array.isArray(err?.details)
        ? err.details.map((d: any) => d.message).join(', ')
        : err.message || 'Invalid asset payload';
      throw new BadRequestException(msg);
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
    return (updated.toJSON ? updated.toJSON() : updated) as any;
  }

  async deleteAsset(id: number) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const deletedRows = await this.assetModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException('Asset not found');
    }

    return;
  }
}

export default new AssetService();
