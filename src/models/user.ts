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

  // First Name
  @Column({ allowNull: false })
  first_name!: string;

  // Last Name
  @Column({ allowNull: false })
  last_name!: string;

  // Email (Unique)
  @Column({ allowNull: false, unique: true })
  email!: string;

  // Password (hashed)
  @Column({ allowNull: false })
  password!: string;

  // Role (e.g., admin, manager, client)
  @Column({ allowNull: false })
  role!: string;

  // Contact Number
  @Column({ allowNull: true })
  phone_number!: string;

  // Profile Picture (optional)
  @Column({ allowNull: true })
  profile_image!: string;

  // Department / Team (optional)
  @Column({ allowNull: true })
  department!: string;

  // Is Active
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active!: boolean;

  // Last Login Timestamp
  @Column({ type: DataType.DATE, allowNull: true })
  last_login!: Date;

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
