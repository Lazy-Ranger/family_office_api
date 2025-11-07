import { literal } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class permissions extends Model {
  @Column({ allowNull: false, unique: true })
  permission!: string;

  @Column({ allowNull: false })
  group!: string;

  @Column
  description!: string;

  @Column({ allowNull: false, defaultValue: 1 })
  status!: number;

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
