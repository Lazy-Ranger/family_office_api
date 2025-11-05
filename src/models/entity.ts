import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { literal } from 'sequelize';

@Table({tableName: 'asset_entity', freezeTableName: true, underscored: true, timestamps: false })
export default class Entity extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ type: DataType.STRING,allowNull: false })
  name!: string;

  @Column({type: DataType.STRING, allowNull: false })
  type!: string;

  // Since `icon` can be any type (file, URL, etc.), we’ll store it as TEXT
  @Column({ type: DataType.TEXT, allowNull: true })
  icon!: string;

  @Column({ type: DataType.STRING,allowNull: true })
  color!: string;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  netWorth!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  lastUpdated!: Date;
}
