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
import Entity from './entity';
import AssetSubSubCategory from './asset_sub_subategory';
import { ICollectibleAsset } from 'src/modules/asset/interfaces';

@Table({
  tableName: 'collectible_asset',
  freezeTableName: true,
  underscored: true,
  timestamps: false
})
export default class collectibleasset extends Model<ICollectibleAsset> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  /* CATEGORY */
  @ForeignKey(() => AssetCategory)
  @Column({ type: DataType.UUID, allowNull: false })
  assetCategoryId!: string;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  /* SUBCATEGORY */
  @ForeignKey(() => AssetSubCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  assetSubcategoryId!: number;

  @BelongsTo(() => AssetSubCategory)
  assetSubCategory!: AssetSubCategory;

  /* TYPE */
  @ForeignKey(() => AssetSubSubCategory)
  @Column({ type: DataType.INTEGER })
  assetTypeId!: number | null;

  @BelongsTo(() => AssetSubSubCategory)
  assetType!: AssetSubSubCategory;

  /* ENTITY */
  @ForeignKey(() => Entity)
  @Column({ type: DataType.UUID, allowNull: false })
  entityId!: string;

  @BelongsTo(() => Entity)
  entity!: Entity;

  /* COLLECTIBLE FIELDS */
  @Column({ type: DataType.STRING(150), allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  collectible_type!: string;

  @Column({ type: DataType.DECIMAL(15,2), allowNull: false })
  purchase_price!: number;

  @Column({ type: DataType.DECIMAL(15,2), allowNull: false })
  current_value!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  purchase_date!: Date;

  @Column({ type: DataType.STRING(50) })
  condition!: string | null;

  @Column({ type: DataType.STRING(255) })
  authenticity_certificate!: string | null;

  /* AUDIT */
  @Column({ type: DataType.INTEGER, allowNull: false })
  created_by!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  updated_by!: number;

  @Column({ type: DataType.DATE, defaultValue: literal('CURRENT_TIMESTAMP') })
  created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: literal('CURRENT_TIMESTAMP') })
  updated_at!: Date;
}
