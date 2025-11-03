import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';

interface SubCategory {
  id: string;
  name: string;
  description: string;
  value: number;
  percentage: number;
  kpis: { [key: string]: number };
}

@Table({ freezeTableName: true, underscored: true, timestamps: true })
export default class AssetCategory extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT
  })
  description!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  icon!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  color!: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(20, 2),
    defaultValue: 0
  })
  totalValue!: number;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(5, 2),
    defaultValue: 0
  })
  portfolioPercentage!: number;

  @Column({
    allowNull: true,
    type: DataType.JSONB
  })
  aggregatedKPIs!: { [key: string]: number };

  @Column({
    allowNull: true,
    type: DataType.JSONB
  })
  subCategories!: SubCategory[];

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  })
  updatedAt!: Date;
}
