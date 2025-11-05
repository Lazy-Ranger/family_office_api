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

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class cashflow extends Model {


  @Column({ type: DataType.NUMBER,primaryKey: true, autoIncrement: true })
  id!: number;


  @Column({ type: DataType.DATE, allowNull: false })
  date!: Date;

  @Column({ type: DataType.STRING,allowNull: false })
  entity!: string;

  @Column({type: DataType.STRING, allowNull: false })
  description!: string;

  @ForeignKey(() => AssetCategory)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    references: {
      model: ' AssetCategory',
      key: 'id',
    },
  })
  assetCategoryId!: string;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  @ForeignKey(() => AssetSubCategory)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    references: {
      model: 'AssetSubCategory',
      key: 'id',
    },
  })
  assetSubcategoryId!: string;

  @BelongsTo(() => AssetSubCategory)
  assetSubCategory!: AssetSubCategory;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: false })
  amount!: number;

  @Column({
    type: DataType.ENUM('income', 'expense'),
    allowNull: false,
  })
  type!: 'income' | 'expense';

  @Column({type: DataType.STRING, allowNull: true })
  payment_method!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes!: string;

  @Column({ allowNull: false })
  status!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  updated_at!: Date;
}
