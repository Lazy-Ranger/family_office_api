export interface AssetSubCategory {
  id: number;
  name: string;
  description?: string;
  totalValue: number;
  portfolioPercentage: number;
  aggregatedKPIs?: Record<string, number>;
  assetCategoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssetCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  totalValue: number;
  portfolioPercentage: number;
  aggregatedKPIs?: Record<string, number>;
  subCategories?: AssetSubCategory[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IFamily {
  id?: number;
  groupName: string;
  groupContactName?: string;

  relationshipId?: number;
  relationshipManager?: string;

  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  pincode?: string;

  phoneNo?: string;
  mobileNo?: string;
  email?: string;

  inceptionDate?: Date;

  advisorId?: number;
  advisorName?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface AssetSubSubCategoryAttributes {
  id?: number;
  sub_category_id: number;
  name: string;
  code: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
}
