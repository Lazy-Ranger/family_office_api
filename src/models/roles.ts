import { literal } from 'sequelize';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import role_has_permissions from './role_has_permissions';

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class roles extends Model {
  @Column({ allowNull: false, unique: true })
  role!: string;

  @Column({ allowNull: false, defaultValue: 1 })
  status!: number;

  @Column({ allowNull: false, defaultValue: 0 })
  created_by!: string;

  @Column({ allowNull: false, defaultValue: 0 })
  updated_by!: string;

  @Column({ allowNull: false, defaultValue: 0 })
  approved_by!: string;

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

  @HasMany(() => role_has_permissions, 'role_id')
  roleHasPermissions!: role_has_permissions[];
}
