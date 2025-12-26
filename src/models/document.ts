import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  BelongsTo, 
  HasMany, 
  ForeignKey
} from 'sequelize-typescript';
import { literal } from 'sequelize';
import users from './user';  
import assets from './assets';
import AssetCategory from './assetcategory';
import AssetSubCategory from './assetsubcategory';
@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class document extends Model {
  

  @Column({type: DataType.NUMBER, primaryKey: true, autoIncrement: true })
  id!: number;


  @Column({ type: DataType.STRING,allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING,allowNull: false })
  type!: string;

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'users',
      key: 'id',
    },
  })
  uploaded_by!: number;

  @BelongsTo(() => users, {
    targetKey: 'id',
    foreignKey: 'uploaded_by',
  })
  uploadedBy!: users;


  @Column({ type: DataType.DATE, allowNull: false })
  upload_date!: Date;


  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  tags!: string[];

  @Column({ allowNull: false })
  status!: string;


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


  @Column({
    allowNull: true,
    type: DataType.STRING,
    references: {
      model: 'assets',
      key: 'id',
    },
  })
  asset_entity!: "string "| null;

  @BelongsTo(() => assets, {
    targetKey: 'id',
    foreignKey: 'asset_entity',
  })
  assetEntity!: assets | null;


  @Column({
    allowNull: true,
    type: DataType.STRING,
    references: {
      model: 'document',
      key: 'id',
    },
  })
  parent_document_id!: number | null;

  @BelongsTo(() => document, {
    targetKey: 'id',
    foreignKey: 'parent_document_id',
  })
  parentDocument!: document | null;

  @HasMany(() => document, {
    foreignKey: 'parent_document_id',
    sourceKey: 'id',
  })
  childDocuments!: document[];

  @Column({
    type: DataType.ENUM('parent', 'child'),
    allowNull: false,
  })
  document_relation!: 'parent' | 'child';

  @Column({ allowNull: true })
  recurring_frequency!: string;

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
