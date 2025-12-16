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
import AssetSubSubCategory from './asset_sub_subategory';
import { IRealEstateAsset } from 'src/modules/asset/interfaces';


export type RealEstateAtrribute = Partial<IRealEstateAsset>;

@Table({ tableName: 'real_estate_asset', freezeTableName: true, underscored: true, timestamps: false })
export default class realestateasset extends Model<IRealEstateAsset, RealEstateAtrribute> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => AssetCategory)
  @Column({
    allowNull: false,
    type: DataType.UUID,
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

  @ForeignKey(() => AssetSubSubCategory)
  @Column({
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AssetSubSubCategory',
      key: 'id',
    },
  })
  assetTypeId!: number;

  @BelongsTo(() => AssetSubSubCategory)
  assetType! : AssetSubSubCategory;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  is_active!: boolean;

  @Column({ type: DataType.STRING(100), allowNull: false })
  property_name!: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  built_up_area_sqft!: number;

  @Column({ type: DataType.DATE, allowNull: true })
  date_of_construction!: Date | null;

  @Column({
    type: DataType.ENUM('Under Construction', 'Completed', 'Ready to Move'),
    allowNull: true,
  })
  possession_status!: 'Under Construction' | 'Completed' | 'Ready to Move' | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  possession_letter!: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  expected_possession_date!: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  possession_date!: Date | null;

  // We'll store age and update with a DB trigger (see SQL)
  @Column({ type: DataType.INTEGER, allowNull: true })
  age_of_property_years!: number | null;

  @Column({
    type: DataType.ENUM('Sole', 'Joint', 'HUF', 'Company', 'Trust'),
    allowNull: false,
  })
  ownership_type!: 'Sole' | 'Joint' | 'HUF' | 'Company' | 'Trust';

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: true })
  ownership_percentage!: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  number_of_owner!: number | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_property_tax_paid!: boolean | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_oc_cc_available!: boolean | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_rera_registered!: boolean | null;

  @Column({ type: DataType.STRING(100), allowNull: false })
  address!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  locality!: string;

  @Column({ type: DataType.CHAR(6), allowNull: true })
  pin_code!: string | null;

  @Column({ type: DataType.STRING(50), allowNull: true })
  city!: string | null;

  @Column({ type: DataType.STRING(50), allowNull: true })
  state!: string | null;

  @Column({ type: DataType.STRING(50), allowNull: false, defaultValue: 'India' })
  country!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  purchase_date!: Date;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: false })
  purchase_price!: number;

  @Column({ type: DataType.DATE, allowNull: true })
  recent_valuation_date!: Date | null;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  current_market_value!: number | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  loan_linked!: boolean | null;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  emi_amount!: number | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  emi_frequency!: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  next_emi_date!: Date | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_property_insured!: boolean | null;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  property_insurance_premium!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  loan_amount!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  outstanding_amount!: number | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  maintenance_applicable!: boolean | null;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  monthly_maintenance_amount!: number | null;

  @Column({
    type: DataType.ENUM('Monthly', 'Quarterly', 'Yearly'),
    allowNull: true,
  })
  maintenance_frequency!: 'Monthly' | 'Quarterly' | 'Yearly' | null;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  property_tax_amount!: number | null;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  major_repair_expenses!: number | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  remarks!: string | null;

  @Column({
    type: DataType.ENUM('Active', 'Sold', 'Inactive'),
    allowNull: true,
    defaultValue: 'Active',
  })
  status!: 'Active' | 'Sold' | 'Inactive' | null;

  @Column({ type: DataType.ENUM('Leased/Rented', 'Self-Occupied', 'Vacant'), allowNull: true })
  occupancy_type!: 'Leased/Rented' | 'Self-Occupied' | 'Vacant' | null;

  @Column({ type: DataType.DATE, allowNull: true })
  sale_date!: Date | null;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: true })
  sale_value!: number | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  tenant_name!: string | null;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  monthly_rent!: number | null;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  security_deposit!: number | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  rent_frequency!: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  rent_collected_status!: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  lease_start!: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  lease_end!: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  lease_renew_date!: Date | null;
  @Column({ type: DataType.STRING(255), allowNull: true })
  property_manager!: string | null;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  property_manager_salary!: number | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
facility_management_company!: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
description!: string | null;

@Column({ type: DataType.DECIMAL(15,2), allowNull: true })
land_area_sqft!: number | null;

@Column({ type: DataType.DECIMAL(15,2), allowNull: true })
carpet_area_sqft!: number | null;

@Column({ type: DataType.DECIMAL(10,6), allowNull: true })
geo_latitude!: number | null;

@Column({ type: DataType.DECIMAL(10,6), allowNull: true })
geo_longitude!: number | null;

@Column({
    type: DataType.ENUM( 'REIT' ,'Fractional' , 'JV' ),
    allowNull: true,
    defaultValue: 'null',
  })
  investment_type!: 'REIT' | 'Fractional' | 'JV' | null;

@Column({ type: DataType.INTEGER, allowNull: true })
unit_count!: number | null;

@Column({ type: DataType.DECIMAL(15,2), allowNull: true })
unit_price!: number | null;

@Column({ type: DataType.DECIMAL(5,2), allowNull: true })
investment_yield_percent!: number | null;

@Column({ type: DataType.DATE, allowNull: true })
insurance_start_date!: Date | null;

@Column({ type: DataType.DATE, allowNull: true })
insurance_expiry_date!: Date | null;

@Column({ type: DataType.DATE, allowNull: true })
last_renovation_date!: Date | null;

@Column({ type: DataType.STRING(150), allowNull: true })
land_conversion_certificate!: string | null;

@Column({ type: DataType.STRING(150), allowNull: true })
environment_clearance!: string | null;

@Column({ type: DataType.STRING(150), allowNull: true })
building_plan_approval!: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  sale_deed!: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  allotment_letter!: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  occupancy_certificate_oc!: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  completion_certificate_cc!: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  noc_from_society!: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  encumbrance_certificate!: string | null;


  @Column({
    allowNull: false,
    type: DataType.INTEGER,
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

