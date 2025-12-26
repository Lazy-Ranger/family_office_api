import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { literal } from 'sequelize';
import AssetCategory from './assetcategory';
import AssetSubCategory from './assetsubcategory';

@Table({
  tableName: 'assets',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
})
export default class Asset extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  assetId!: string;


  @ForeignKey(() => AssetCategory)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: ' AssetCategory',
      key: 'id',
    },
  })
  assetCategoryId!: number;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  @ForeignKey(() => AssetSubCategory)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'AssetSubCategory',
      key: 'id',
    },
  })
  assetSubcategoryId!: number;

  @BelongsTo(() => AssetSubCategory)
  assetSubCategory!: AssetSubCategory;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  fieldKey!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  value!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  updatedAt!: Date;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  })
  created_by!: number;

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'users',
      key: 'id',
    },
  })
  updated_by!: number;
}
