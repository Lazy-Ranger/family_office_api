import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import AssetSubCategory from './assetsubcategory';

@Table({
  tableName: 'asset_categories',
  freezeTableName: true,
  underscored: true,
  timestamps: true,
})
export default class AssetCategory extends Model {
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
    allowNull: true,
    type: DataType.STRING,
  })
  icon!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  color!: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(20, 2),
    defaultValue: 0,
    field: 'total_value',
  })
  totalValue!: number;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'portfolio_percentage',
  })
  portfolioPercentage!: number;

  @Column({
    allowNull: true,
    type: DataType.JSONB,
    field: 'aggregated_kpis',
  })
  aggregatedKPIs!: Record<string, number>;

  @HasMany(() => AssetSubCategory)
  subCategories!: AssetSubCategory[];

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'updated_at',
  })
  updatedAt!: Date;
}
