import roleService from '../../roles/service/role.service';
import { AssetCategory, AssetSubCategory,Entity, family, roles, users } from '../../../models';
import { ServiceUnavailableException } from '../../../utils/http';

export interface IMasterService {

  master: (userId?: number, categoryId?: string) => Promise<{ category: any[] }>;
}

class MasterService implements IMasterService {
  private CategoryModel = AssetCategory;
  private SubCategoryModel = AssetSubCategory;
  private Entity = Entity;
  private family = family;
  private Role = roles;
  private user = users;
  constructor() {}

  async master(userId?: number, categoryId?: string) {
    try {
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
        subMap[key].push({ label: s.name, 
            description: s.description,
            totalValue: s.totalValue,
             portfolioPercentage: s.portfolioPercentage,
             aggregatedKPIs: s.aggregatedKPIs,
            value: s.id,
             });
      }
      const family = await this.family.findAll({ order: [['groupName', 'ASC']], raw: true });
      const categories = (categoriesRaw as any[])
        .filter((c) => (categoryId ? c.id === categoryId : true))
        .map((c) => ({
          label: c.name,
          value: c.id,
          icon: c.icon,
          description: c.description,
          color: c.color,
          totalValue: c.totalValue,
          portfolioPercentage: c.portfolioPercentage,
          aggregatedKPIs: c.aggregatedKPIs,
          subcategory: subMap[c.id] || [],
        }));
     const permissions = await roleService.getPermissions(userId!);
     const usersList = await this.user.findAll();
     const roles = await this.Role.findAll({ where: { status: 1 }, raw: true });
      return { category: categories,
               entity: entity,
               family: family,
               permissions: permissions,
               roles: roles, 
               users: usersList 
            };
    } catch (err) {
      throw new ServiceUnavailableException(err, 'Failed to retrieve data');
    }
  }
}

export default new MasterService();
