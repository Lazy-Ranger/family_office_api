import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { literal } from "sequelize";

@Table({
  tableName: "family",
  freezeTableName: true,
  underscored: true,
  timestamps: false
})
export default class Family extends Model {
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  groupName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  groupContactName!: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  relationshipId!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  relationshipManager!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address_1!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address_2!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  city!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  state!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  pincode!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phoneNo!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  mobileNo!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  email!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  inceptionDate!: Date;

  @Column({ type: DataType.INTEGER, allowNull: true })
  advisorId!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  advisorName!: string;

  @Default(literal("CURRENT_TIMESTAMP"))
  @Column(DataType.DATE)
  createdAt!: Date;

  @Default(literal("CURRENT_TIMESTAMP"))
  @Column(DataType.DATE)
  updatedAt!: Date;
}
