import { literal } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import AssetCategory from './assetcategory';

export interface Asset {
  id: number;
  assetType: string;
  currentValue: number;
  assetTitle: string;

  // Real Estate Properties
  purchaseDate?: Date;
  purchasePrice?: number;
  owner?: string;
  location?: string;
  acquiredDate?: Date;
  document?: string;
  propertyCategory?: string;
  numberOfOwner?: number;
  propertyTax?: number;
  houseManager?: string;
  managerSalary?: number;
  houseInsurancePremium?: number;
  rentPremiumFrequency?: string;
  NextPremiumDate?: Date;
  dueDate?: Date;
  monthlyMaintenance?: number;
  tenantName?: string;
  monthlyRent?: number;
  securityDeposit?: number;
  rentFrequency?: string;
  rentCollectedStatus?: string;
  leaseStart?: Date;
  leaseEnd?: Date;
  leaseRenewDate?: Date;
  loanAmountOutstanding?: number;
  emiAmount?: number;
  emiFrequency?: string;
  nextEmiDate?: Date;

  // Vehicle Properties
  brand?: string;
  referenceNumber?: string;
  registrationNumber?: string;
  acquisitionMode?: string;
  insuredValue?: number;
  insurerName?: string;
  premiumAmount?: number;
  premiumFrequency?: string;
  policyRenewalDate?: Date;
  additionalNotes?: string;

  // System fields
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}


@Table({ freezeTableName: true, underscored: true, timestamps: true })
export default class AssetSubCategory extends Model {
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
  asset!: Asset[]

  @Column({
    allowNull: false,
    type: DataType.UUID,
    references: {
      model: 'AssetCategory',
      key: 'id',
    },
  })
  assetCategoryId!: string;

  @BelongsTo(() => AssetCategory)
  assetCategory!: AssetCategory;

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
