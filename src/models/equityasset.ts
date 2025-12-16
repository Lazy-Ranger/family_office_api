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
import { IEquityAsset } from 'src/modules/asset/interfaces';

@Table({
  tableName: 'equity_asset',
  freezeTableName: true,
  underscored: true,
  timestamps: false
})
export default class equityasset extends Model<IEquityAsset> {
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

  /* EQUITY FIELDS */
  @Column({ type: DataType.STRING(20), allowNull: false })
  symbol!: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  exchange!: string;

  @Column({ type: DataType.DECIMAL(12,4), allowNull: false })
  units!: number;

  @Column({ type: DataType.DECIMAL(12,2), allowNull: false })
  buy_price!: number;

  @Column({ type: DataType.DECIMAL(12,2), allowNull: false })
  current_price!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  purchase_date!: Date;

  @Column({ type: DataType.STRING(100) })
  broker!: string | null;

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
