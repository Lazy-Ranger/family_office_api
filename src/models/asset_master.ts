import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import AssetCategory from './assetcategory';
import AssetSubCategory from './assetsubcategory';
import realestateasset from './realestateasset';
import { IAssetMaster } from 'src/modules/asset/interfaces';

@Table({
  tableName: 'asset_master',
  freezeTableName: true,
  underscored: true,
  timestamps: false
})
export default class assetmaster extends Model<IAssetMaster> {
    @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => AssetCategory)
  @Column({field: 'asset_category_id', type: DataType.INTEGER, allowNull: false })
  assetCategoryId!: number;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  @ForeignKey(() => AssetSubCategory)
  @Column({ field: 'asset_subcategory_id', type: DataType.INTEGER, allowNull: false })
  assetSubcategoryId!: number;

  @BelongsTo(() => AssetSubCategory)
  assetSubCategory!: AssetSubCategory;

  @ForeignKey(() => realestateasset)
  @Column({ field: 'asset_id', type: DataType.INTEGER, allowNull: false })
  assetId!: number;

  @Column({ type: DataType.STRING(150), allowNull: false })
  name!: string;

}
