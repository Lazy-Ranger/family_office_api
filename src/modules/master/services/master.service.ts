import roleService from '../../roles/service/role.service';
import { AssetCategory, AssetSubCategory,Entity, family, roles, users,AssetSubSubCategory } from '../../../models';
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
  private Sub2CategoryModel = AssetSubSubCategory
  constructor() {}

  async master(userId?: number, categoryId?: string) {
    try {
      const [categoriesRaw, subcatsRaw, sub2cats,entity,family, usersList, roles ] = await Promise.all([
        this.CategoryModel.findAll({ order: [['name', 'ASC']], raw: true }),
        this.SubCategoryModel.findAll({ order: [['name', 'ASC']], raw: true }),
        this.Sub2CategoryModel.findAll({ order: [['name', 'ASC']], raw: true }),
        this.Entity.findAll({ order: [['name', 'ASC']], raw: true }),
        await this.family.findAll({ order: [['groupName', 'ASC']], raw: true }),
        await this.user.findAll(),
        await this.Role.findAll({ where: { status: 1 }, raw: true }),
      ]); 
      const sub2Map: Record<string, Array<any>> = {};

      for (const s of sub2cats) {
        const key = (s as any).sub_category_id; // parent subcategory

        if (!sub2Map[key]) sub2Map[key] = [];

        sub2Map[key].push({
          label: s.name,
          description: s.description,
          value: s.id,
          code: s.code,
          isActive: s.is_active,
        });
      }
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
            sub_sub_category: sub2Map[s.id] || [],
             });
      }

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
