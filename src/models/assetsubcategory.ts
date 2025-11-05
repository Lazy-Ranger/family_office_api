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

@Table({ tableName: 'asset_subcategories', freezeTableName: true, underscored: true, timestamps: true })
export default class AssetSubCategory extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT
  })
  description!: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(20, 2),
    defaultValue: 0
  })
  totalValue!: number;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(5, 2),
    defaultValue: 0
  })
  portfolioPercentage!: number;

  @Column({
    allowNull: true,
    type: DataType.JSONB
  })
  aggregatedKPIs!: { [key: string]: number };

  @ForeignKey(() => AssetCategory)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    references: {
      model: 'AssetCategory',
      key: 'id',
    },
  })
  assetCategoryId!: string;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  })
  updatedAt!: Date;
}

