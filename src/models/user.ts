import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany 
} from 'sequelize-typescript';
import { literal } from 'sequelize';

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class users extends Model {
  // Primary Key
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;


  @Column({ type: DataType.STRING,allowNull: false })
  first_name!: string;


  @Column({ type: DataType.STRING,allowNull: false })
  last_name!: string;


  @Column({ type: DataType.STRING,allowNull: false, unique: true })
  email!: string;


  @Column({ type: DataType.STRING,allowNull: false })
  password!: string;


  @Column({ type: DataType.STRING,allowNull: false })
  role!: string;


  @Column({ type: DataType.STRING,allowNull: true })
  phone_number!: string;

  @Column({ type: DataType.STRING,allowNull: true })
  department!: string;


  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active!: boolean;


  @Column({ type: DataType.DATE, allowNull: true })
  last_login!: Date;


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
