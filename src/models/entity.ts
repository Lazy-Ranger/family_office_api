import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { literal } from "sequelize";
import Family from "./family";  // your family model

@Table({
  tableName: "entity",
  freezeTableName: true,
  underscored: true,
  timestamps: false,
})
export default class Entity extends Model {
  
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id!: number;

  @Column({
    field: 'name',
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column(DataType.STRING)
  address1!: string;

  @Column(DataType.STRING)
  address2!: string;

  @Column(DataType.STRING)
  city!: string;

  @Column(DataType.STRING)
  pincode!: string;

  @Column(DataType.STRING)
  state!: string;

  @Column(DataType.STRING)
  panNumber!: string;

  @Column(DataType.STRING)
  occupation!: string;

  @Column(DataType.STRING)
  status!: string;

  @ForeignKey(() => Family)
  @Column(DataType.INTEGER)
  groupId!: number;

  @Column(DataType.STRING)
  groupName!: string;

  @Column(DataType.INTEGER)
  advisorId!: number;

  @Column(DataType.STRING)
  advisorName!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: literal("CURRENT_TIMESTAMP")
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: literal("CURRENT_TIMESTAMP")
  })
  updatedAt!: Date;
}
