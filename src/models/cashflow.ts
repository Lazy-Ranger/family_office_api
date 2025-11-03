import { 
  Table, 
  Column, 
  Model, 
  DataType 
} from 'sequelize-typescript';
import { literal } from 'sequelize';

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class cashflow extends Model {

  // Primary Key
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  // Transaction Date
  @Column({ type: DataType.DATE, allowNull: false })
  date!: Date;

  // Entity Name (like "Sharma Family Office")
  @Column({ allowNull: false })
  entity!: string;

  // Description (summary of transaction)
  @Column({ allowNull: false })
  description!: string;

  // Category (like "utilities", "income", etc.)
  @Column({ allowNull: false })
  category!: string;

  // Subcategory (like "Estate Utilities")
  @Column({ allowNull: true })
  subcategory!: string;

  // Amount (can be numeric or formatted string, we store as DECIMAL)
  @Column({ type: DataType.DECIMAL(15, 2), allowNull: false })
  amount!: number;

  // Type (income / expense)
  @Column({
    type: DataType.ENUM('income', 'expense'),
    allowNull: false,
  })
  type!: 'income' | 'expense';

  // Payment Method (like "Online Payment", "Cheque", "Cash", etc.)
  @Column({ allowNull: true })
  payment_method!: string;
  
  // Notes (additional details)
  @Column({ type: DataType.TEXT, allowNull: true })
  notes!: string;

  // Status (like "overdue", "paid", "pending")
  @Column({ allowNull: false })
  status!: string;

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
