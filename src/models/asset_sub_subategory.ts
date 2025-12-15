import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import AssetSubCategory from './assetsubcategory';

@Table({
  tableName: 'asset_sub_subcategories',
  timestamps: true,
  underscored: true
})
export default class AssetSubSubCategory extends Model<AssetSubSubCategory> {
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => AssetSubCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sub_category_id!: number;
 @BelongsTo(() => AssetSubCategory)
  assetSubCategory!: AssetSubCategory;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_active!: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  created_at!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updated_at!: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  created_by!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  updated_by!: string;
}
