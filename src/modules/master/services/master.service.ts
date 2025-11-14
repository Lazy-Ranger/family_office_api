import { AssetCategory, AssetSubCategory,Entity, family } from '../../../models';
import { ServiceUnavailableException } from '../../../utils/http';

export interface IMasterService {

  master: (categoryId?: string) => Promise<{ category: any[] }>;
}

class MasterService implements IMasterService {
  private CategoryModel = AssetCategory;
  private SubCategoryModel = AssetSubCategory;
  private Entity = Entity;
  private family = family;

  constructor() {}

  async master(categoryId?: string) {
    try {
      // fetch categories and subcategories in parallel
      const [categoriesRaw, subcatsRaw] = await Promise.all([
        this.CategoryModel.findAll({ order: [['name', 'ASC']], raw: true }),
        this.SubCategoryModel.findAll({ order: [['name', 'ASC']], raw: true }),
      ]);
      const entity = await this.Entity.findAll({ order: [['name', 'ASC']], raw: true });
      // group subcategories by assetCategoryId
      const subMap: Record<string, Array<any>> = {};
      for (const s of subcatsRaw) {
        const key = (s as any).assetCategoryId as string;
        if (!subMap[key]) subMap[key] = [];
        subMap[key].push({ label: (s as any).name, value: (s as any).id });
      }
      const family = await this.family.findAll({ order: [['groupName', 'ASC']], raw: true });
      // build result array
      const categories = (categoriesRaw as any[])
        .filter((c) => (categoryId ? c.id === categoryId : true))
        .map((c) => ({
          label: c.name,
          value: c.id,
          subcategory: subMap[c.id] || [],
        }));

      return { category: categories,
               entity: entity,
               family: family  
            };
    } catch (err) {
      throw new ServiceUnavailableException(err, 'Failed to retrieve data');
    }
  }
}

export default new MasterService();
