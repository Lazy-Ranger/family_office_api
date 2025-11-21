import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import AssetCategory from './assetcategory';
import AssetSubCategory from './assetsubcategory';
import Entity from './entity';

@Table({ tableName: 'asset', freezeTableName: true, underscored: true, timestamps: false })
export default class asset extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => AssetCategory)
  @Column({
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: ' AssetCategory',
      key: 'id',
    },
  })
  assetCategoryId!: number;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

  @ForeignKey(() => AssetSubCategory)
  @Column({
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AssetSubCategory',
      key: 'id',
    },
  })
  assetSubcategoryId!: number;

  @BelongsTo(() => AssetSubCategory)
  assetSubCategory!: AssetSubCategory;

  @ForeignKey(() => Entity)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    references: {
      model: 'Entity',
      key: 'id',
    },
  })
  entityId!: string;

  @BelongsTo(() => Entity)
  entity!: Entity;

  @Column({ type: DataType.INTEGER, allowNull: false })
  currentValue!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  assetTitle!: string;

  // Real Estate Properties
  @Column({ type: DataType.DATE, allowNull: true })
  purchaseDate!: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  purchasePrice!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  location!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  acquiredDate!: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  document!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  propertyCategory!: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  numberOfOwner!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  propertyTax!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  houseManager!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  managerSalary!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  houseInsurancePremium!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  rentPremiumFrequency!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  NextPremiumDate!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  dueDate!: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  monthlyMaintenance!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  tenantName!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  monthlyRent!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  securityDeposit!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  rentFrequency!: string;

  @Column({ type: DataType.STRING, allowNull: true })
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

  @Column({ type: DataType.STRING, allowNull: true })
  emiFrequency!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  nextEmiDate!: Date;

  // Vehicle Properties
  @Column({ type: DataType.STRING, allowNull: true })
  brand!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  referenceNumber!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  registrationNumber!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  acquisitionMode!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  insuredValue!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  insurerName!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  premiumAmount!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  premiumFrequency!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  policyRenewalDate!: Date;

  // Equity specific
  @Column({ type: DataType.DATE, allowNull: true })
  reportDate!: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  security!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  securityName!: string;

  @Column({ type: DataType.DECIMAL(20, 4), allowNull: true })
  quantity!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  averagePrice!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  acquisationCost!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  marketPrice!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  marketValue!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  unrealizedGainLoss!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  realizedGainLoss!: number;

  @Column({ type: DataType.DECIMAL(20, 2), allowNull: true })
  accruedInterest!: number;

  @Column({ type: DataType.DATE, allowNull: true })
  marketPriceDate!: Date;


  @Column({ type: DataType.TEXT, allowNull: true })
  additionalNotes!: string;

  //created_by
  @Column({
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'users',
      key: 'id',
    },
  })
  created_by!: number;

  //updated_by
  @Column({
    allowNull: false,
    type: DataType.NUMBER,
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