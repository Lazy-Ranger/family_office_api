import realestateasset, { RealEstateAtrribute } from '../../../models/asset';
import { NotFoundException, BadRequestException } from '../../../utils/http';
import { FindOptions } from 'sequelize';
import { IRealEstateAsset } from '../interfaces';
import { AssetSubCategory, AssetSubSubCategory } from '../../../models';

export interface IRealEstateAssetService {
  createAsset: (body: RealEstateAtrribute, userId?: number) => Promise<IRealEstateAsset>;
  getAssets: (
    subcategory_id: number,
    options?: { page?: number; limit?: number; filters?: FindOptions['where']; sortField?: string; sortOrder?: 'ASC' | 'DESC' }
  ) => Promise<{ data: Array<{ id: number; property_name: string; age_of_property_years: number | null; purchase_value: number; current_market_value: number; gain_loss: number; gain_loss_percentage: number; ownership_type: string; loan_outstanding: number; net_income: number; compliance_status: string; address: string; asset_type: string }>; count?: number }>;
  getSubcategoryPage: (subcategory_id: number) => Promise<{
    total_assets: number;
    total_invested_value: number;
    total_current_value: number;
    total_gain_loss: number;
    total_gain_loss_percentage: number;
    portfolio_percentage: number;
  }>;
  getAssetById: (id: string) => Promise<IRealEstateAsset>;
  updateAsset: (id: number, body: Partial<IRealEstateAsset>, userId?: number) => Promise<boolean>;
  deleteAsset: (id: number) => Promise<void>;
}

class AssetService implements IRealEstateAssetService {
  private realestateModel: typeof realestateasset;
  private SubCategoryModel = AssetSubCategory;
  private assetTypeModel =AssetSubSubCategory;

  constructor() {
    this.realestateModel = realestateasset;
  }

  async createAsset(data: RealEstateAtrribute, userId?: number) {
    const body = {
      ...data,
      created_by: userId,
      updated_by: userId
    }
    try {
      const created = await this.realestateModel.create(body);
      return created.toJSON ? (created.toJSON() as IRealEstateAsset) : (created as unknown as IRealEstateAsset);
    } catch (error) {
      throw error;
    }
  }

 async getAssets(
  subcategory_id: number,
  options?: { page?: number; limit?: number; filters?: FindOptions['where']; sortField?: string; sortOrder?: 'ASC' | 'DESC' }
) {
  try {
    const where = { assetSubcategoryId: subcategory_id };
  
    let findOpts: FindOptions = {
      where,
      include: [{ all: true, nested: true }],
    };
  
    if (options?.page && options?.limit) {
      const page = Math.max(1, Number(options.page));
      const limit = Math.max(1, Number(options.limit));
      const offset = (page - 1) * limit;
  
      findOpts = {
        ...findOpts,
        offset,
        limit,
      };
  
      if (options.sortField) {
        findOpts.order = [[options.sortField, options.sortOrder || "ASC"]];
      }
    }
  
    const rawAssets = await this.realestateModel.findAll(findOpts);
  
    const processedAssets = await Promise.all(
      rawAssets.map(async (asset) => {
        const purchase = Number(asset.purchase_price) || 0;
        const market = Number(asset.current_market_value) || 0;
  
        const gainLoss = market - purchase;
        const gainLossPercentage = purchase > 0 ? (gainLoss / purchase) * 100 : 0;
  
        const rent = Number(asset.monthly_rent) || 0;
        const maintenance = Number(asset.monthly_maintenance_amount) || 0;
        const tax = Number(asset.property_tax_amount) || 0;
        const insurance = Number(asset.property_insurance_premium) || 0;
        const repairs = Number(asset.major_repair_expenses) || 0;
        const manager = Number(asset.property_manager_salary) || 0;
        const emi = Number(asset.emi_amount) || 0;
  
        const netIncome =
          rent * 12 -
          maintenance * 12 -
          tax -
          insurance -
          repairs -
          manager * 12 -
          emi * 12;
  
        const assetType = await this.assetTypeModel.findOne({ where: { id: asset.assetTypeId } });
        const assetTypeName = assetType ? assetType.name : "Unknown";
  
        const complianceStatus = [];
        if (asset.is_rera_registered) complianceStatus.push("RERA registered");
        if (asset.is_oc_cc_available) complianceStatus.push("OC/CC available");
        if (asset.is_property_tax_paid) complianceStatus.push("Property tax paid");
        if (complianceStatus.length === 0) complianceStatus.push("No compliance");
  
        return {
          id: asset.id,
          property_name: asset.property_name,
          age_of_property_years: asset.age_of_property_years,
          purchase_value: purchase,
          current_market_value: market,
          gain_loss: gainLoss,
          gain_loss_percentage: Number(gainLossPercentage.toFixed(2)),
          ownership_type: asset.ownership_type,
          loan_outstanding: Number(asset.outstanding_amount) || 0,
          net_income: netIncome,
          compliance_status: complianceStatus.join(", "),
          address: asset.address,
          asset_type: assetTypeName,
        };
      })
    );
  
    return {
      data: processedAssets,
      count: processedAssets.length,
    };
  } catch (error) {
    throw error;
  }
}

  async getSubcategoryPage(subcategory_id: number) {
    try {
      const subcategory = await this.SubCategoryModel.findOne({
        where: { id: subcategory_id },
      });
  
      if (!subcategory) {
        throw new NotFoundException("Subcategory not found");
      }
  
      const assets = await this.realestateModel.findAll({
        where: { assetSubcategoryId: subcategory_id },
      });
      const totalAssets = assets.length;
  
      const total_invested_value = assets.reduce(
        (sum, a) => sum + Number(a.purchase_price || 0),
        0
      );
  
      const total_current_value = assets.reduce(
        (sum, a) => sum + Number(a.current_market_value || 0),
        0
      );
  
      const total_gain_loss = total_current_value - total_invested_value;
  
      const total_gain_loss_percentage =
        total_invested_value > 0
          ? Number(((total_gain_loss / total_invested_value) * 100).toFixed(2))
          : 0;
  
      return {
        total_assets: totalAssets,
        total_invested_value,
        total_current_value,
        total_gain_loss,
        total_gain_loss_percentage,
        portfolio_percentage: 0,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAssetById(id: string) {
    try{
      const asset = await this.realestateModel.findOne({
      where: { id },
      include: [{ all: true, nested: true }],
    });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    return asset as IRealEstateAsset;
    }
    catch(error){
      throw error;
    }
}


  async updateAsset(id: number, body: Partial<IRealEstateAsset>, userId?: number) {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    if (userId) {
      body = { ...body, updated_by: userId };
    }

    const [updatedRows] = await this.realestateModel.update(body as Partial<IRealEstateAsset>, { where: { id } });
    if (updatedRows === 0) {
      throw new NotFoundException('Asset not found');
    }
    return true;
    }
  

  async deleteAsset(id: number, hardDelete = false): Promise<void> {
    if (!id) {
      throw new BadRequestException('id is required');
    }
    if (!hardDelete) {
      await this.realestateModel.update({ is_active: false } as Partial<IRealEstateAsset>, { where: { id } });
    } else {
      await this.realestateModel.destroy({ where: { id } });
    }
    return;
  }
}

export default new AssetService();
