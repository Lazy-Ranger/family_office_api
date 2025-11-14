import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import AssetCategory from './assetcategory';

@Table({
  tableName: 'asset_subcategories',
  freezeTableName: true,
  underscored: true,
  timestamps: true
})
export default class AssetSubCategory extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  description!: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(20, 2),
    defaultValue: 0,
  })
  totalValue!: number;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(5, 2),
    defaultValue: 0,
  })
  portfolioPercentage!: number;

  @Column({
    allowNull: true,
    type: DataType.JSONB,
    field: 'aggregated_kpis',
  })
  aggregatedKPIs!: Record<string, number>;

  @ForeignKey(() => AssetCategory)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  assetCategoryId!: number;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'created_at'
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'updated_at'
  })
  updatedAt!: Date;
}
