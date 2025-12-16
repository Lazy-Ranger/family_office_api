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
import { IVehicleAsset } from 'src/modules/asset/interfaces';
@Table({
  tableName: 'vehicle_asset',
  freezeTableName: true,
  underscored: true,
  timestamps: false
})
export default class vehicleasset extends Model<IVehicleAsset> {
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
  @Column({ type: DataType.INTEGER, allowNull: true })
  assetTypeId!: number | null;

  @BelongsTo(() => AssetSubSubCategory)
  assetType!: AssetSubSubCategory;

  /* ENTITY (Owner) */
  @ForeignKey(() => Entity)
  @Column({ type: DataType.UUID, allowNull: false })
  entityId!: string;

  @BelongsTo(() => Entity)
  entity!: Entity;

  /* VEHICLE FIELDS */
  @Column({ type: DataType.STRING(50) })
  vehicle_type!: string | null;

  @Column({ type: DataType.STRING(100) })
  brand!: string | null;

  @Column({ type: DataType.STRING(100) })
  model!: string | null;

  @Column({ type: DataType.STRING(100) })
  registration_number!: string | null;

  @Column({ type: DataType.DECIMAL(15,2) })
  purchase_price!: number | null;

  @Column({ type: DataType.DECIMAL(15,2) })
  current_value!: number | null;

  @Column({ type: DataType.DATE })
  purchase_date!: Date | null;

  @Column({ type: DataType.DATE })
  insurance_expiry!: Date | null;

  @Column({ type: DataType.INTEGER })
  odo_meter!: number | null;

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
