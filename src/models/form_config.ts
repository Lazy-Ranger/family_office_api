import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
import { IFormConfig } from 'src/modules/form/interfaces';

@Table({
  tableName: 'form_config',
  freezeTableName: true,
  underscored: true,
  timestamps: false
})
export default class formconfig extends Model<IFormConfig> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({ field: 'asset_subcategory_id', type: DataType.INTEGER, allowNull: false })
  assetSubcategoryId!: number;

  @Column({ field: 'form_data', type: DataType.JSONB, allowNull: false })
  formData!: object;

  @Column({ field: 'condition_data', type: DataType.JSONB, allowNull: true })
  conditionData!: object;

  @Column({ field: 'function_data', type: DataType.JSONB, allowNull: true })
  function_data!: object;
  
  @Column({ field: 'is_active', type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive!: boolean;

  @Column({ field: 'created_at', type: DataType.DATE, allowNull: false, defaultValue: literal('CURRENT_TIMESTAMP') })
  createdAt!: Date;

  @Column({ field: 'updated_at', type: DataType.DATE, allowNull: false, defaultValue: literal('CURRENT_TIMESTAMP') })
  updatedAt!: Date;

  @Column({ type: DataType.STRING(150), allowNull: false })
  name!: string;

}