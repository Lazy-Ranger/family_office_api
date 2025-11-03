import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  BelongsTo, 
  HasMany 
} from 'sequelize-typescript';
import { literal } from 'sequelize';
import users from './user';  
import assets from './asset';
@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class document extends Model {
  
  // Primary Key
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  // Document Name
  @Column({ allowNull: false })
  name!: string;

  // Type (PDF, Word, etc.)
  @Column({ allowNull: false })
  type!: string;

  // Entity related (like organization, client, etc.)
  @Column({ allowNull: false })
  entity!: string;

  // Uploaded By
  @Column({
    allowNull: false,
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

  // Upload Date
  @Column({ type: DataType.DATE, allowNull: false })
  upload_date!: Date;

  // Tags
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  tags!: string[];

  // Status
  @Column({ allowNull: false })
  status!: string; // You can map this to an ENUM if DocumentStatus is defined

  // Category
  @Column({ allowNull: false })
  category!: string;

  // Subcategory
  @Column({ allowNull: true })
  subcategory!: string;

  // Asset Entity (linked to Asset model if applicable)
  @Column({
    allowNull: true,
    references: {
      model: 'assets',
      key: 'id',
    },
  })
  asset_entity!: number | null;

  @BelongsTo(() => assets, {
    targetKey: 'id',
    foreignKey: 'asset_entity',
  })
  assetEntity!: assets | null;

  // Parent Document (for versioning or grouping)
  @Column({
    allowNull: true,
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

  // Relation type — parent or child
  @Column({
    type: DataType.ENUM('parent', 'child'),
    allowNull: false,
  })
  document_relation!: 'parent' | 'child';

  // Recurring Frequency (monthly, yearly, etc.)
  @Column({ allowNull: true })
  recurring_frequency!: string;

  // Created At
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  created_at!: Date;

  // Updated At
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  updated_at!: Date;
}
