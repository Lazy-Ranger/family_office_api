import { literal } from 'sequelize';
import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import permissions from './permissions';

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class role_has_permissions extends Model {
  @Column({
    references: {
      model: 'roles',
      key: 'id',
    },
  })
  role_id!: number;

  @Column({
    references: {
      model: 'permissions',
      key: 'id',
    },
  })
  permission_id!: number;

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

  @BelongsTo(() => permissions, 'permission_id')
  permission!: permissions;
}
