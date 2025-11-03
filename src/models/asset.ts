import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
 
@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class asset extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;
 
  @Column({ allowNull: false })
 assetType!: string;
 
  @Column({ allowNull: false })
  currentValue!: number;
 
  @Column({ allowNull: false })
  assetTitle!: string;
 
  // Real Estate Properties
  @Column({ type: DataType.DATE, allowNull: true })
  purchaseDate!: Date;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  purchasePrice!: number;
 
  @Column({ allowNull: true })
  owner!: string;
 
  @Column({ allowNull: true })
  location!: string;
 
  @Column({ type: DataType.DATE, allowNull: true })
  acquiredDate!: Date;
 
  @Column({ allowNull: true })
  document!: string;
 
  @Column({ allowNull: true })
  propertyCategory!: string;
 
  @Column({ type: DataType.INTEGER, allowNull: true })
  numberOfOwner!: number;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  propertyTax!: number;
 
  @Column({ allowNull: true })
  houseManager!: string;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  managerSalary!: number;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  houseInsurancePremium!: number;
 
  @Column({ allowNull: true })
  rentPremiumFrequency!: string;
 
  @Column({ type: DataType.DATE, allowNull: true })
  NextPremiumDate!: Date;
 
  @Column({ type: DataType.DATE, allowNull: true })
  dueDate!: Date;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  monthlyMaintenance!: number;
 
  @Column({ allowNull: true })
  tenantName!: string;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  monthlyRent!: number;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  securityDeposit!: number;
 
  @Column({ allowNull: true })
  rentFrequency!: string;
 
  @Column({ allowNull: true })
  rentCollectedStatus!: string;
 
  @Column({ type: DataType.DATE, allowNull: true })
  leaseStart!: Date;
 
  @Column({ type: DataType.DATE, allowNull: true })
  leaseEnd!: Date;
 
  @Column({ type: DataType.DATE, allowNull: true })
  leaseRenewDate!: Date;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  loanAmountOutstanding!: number;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  emiAmount!: number;
 
  @Column({ allowNull: true })
  emiFrequency!: string;
 
  @Column({ type: DataType.DATE, allowNull: true })
  nextEmiDate!: Date;
 
  // Vehicle Properties
  @Column({ allowNull: true })
  brand!: string;
 
  @Column({ allowNull: true })
  referenceNumber!: string;
 
  @Column({ allowNull: true })
  registrationNumber!: string;
 
  @Column({ allowNull: true })
  acquisitionMode!: string;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  insuredValue!: number;
 
  @Column({ allowNull: true })
  insurerName!: string;
 
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  premiumAmount!: number;
 
  @Column({ allowNull: true })
  premiumFrequency!: string;
 
  @Column({ type: DataType.DATE, allowNull: true })
  policyRenewalDate!: Date;
 
  @Column({ type: DataType.TEXT, allowNull: true })
  additionalNotes!: string;
 
  //created_by
  @Column({
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  })
  created_by!: number;
 
  //updated_by
  @Column({
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  })
  updated_by!: number;
 
  //created_at
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  created_at!: Date;
 
  //updated_at
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  updated_at!: Date;
}