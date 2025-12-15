// import asset from '../../../models/asset';
// import { IAsset } from '../interfaces';

// export class AssetMapper {
//   static toAssetDto(a: asset): IAsset {
//     const id = a.id as number;
//     const assetCategoryId =  a.assetCategoryId;
//     const assetSubcategoryId = a.assetSubcategoryId;
//     const assetTypeId = a.assetTypeId;
//     const entityId = a.entityId;
//     const is_active = a.is_active;
//     const property_name = a.property_name;
//     const built_up_area_sqft = a.built_up_area_sqft;
//     const date_of_construction = a.date_of_construction;
//     const possession_status = a.possession_status;
//     const possession_letter = a.possession_letter;
//     const expected_possession_date = a.expected_possession_date;
//     const possession_date = a.possession_date;
//     const age_of_property_years = a.age_of_property_years;
//     const ownership_type = a.ownership_type;
//     const ownership_percentage = a.ownership_percentage;
//     const number_of_owner = a.number_of_owner;
//     const is_property_tax_paid = a.is_property_tax_paid;
//     const is_oc_cc_available = a.is_oc_cc_available;
//     const is_rera_registered = a.is_rera_registered;
//     const address = a.address;
//     const locality = a.locality;
//     const pin_code = a.pin_code;
//     const city = a.city;
//     const state = a.state;
//     const country = a.country;
//     const purchase_date = a.purchase_date;
//     const purchase_price = a.purchase_price;
//     const recent_valuation_date = a.recent_valuation_date;
//     const current_market_value = a.current_market_value;
//     const loan_linked = a.loan_linked;
//     const emi_amount = a.emi_amount;


//     return {
//       id,
//       assetCategoryId: assetCategoryId,
//       assetSubcategoryId: assetSubcategoryId,
//       entityId: entityId,
//       currentValue: currentValue as number | undefined,
//       assetTitle: assetTitle as string | undefined,
//       purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
//       purchasePrice: purchasePrice as number | null,
//       location: location as string | null,
//       acquiredDate: acquiredDate ? new Date(acquiredDate) : null,
//       document: document as string | null,
//       propertyCategory: propertyCategory as string | null,
//       numberOfOwner: numberOfOwner as number | null,
//       monthlyRent: monthlyRent as number | null,
//       monthlyMaintenance: monthlyMaintenance as number | null,
//       additionalNotes: additionalNotes as string | null,
//       marketValue: marketValue as number | null,
//       createdBy: createdBy as number | null,
//       updatedBy: updatedBy as number | null,
//       createdAt: createdAt ? new Date(createdAt) : null,
//       updatedAt: updatedAt ? new Date(updatedAt) : null,
//       isActive: Boolean(isActive),
//     };
//   }

//   static toAssetDtos(arr: Array<asset | Record<string, any>>): IAssetDto[] {
//     return arr.map((a) => AssetMapper.toAssetDto(a));
//   }
// }

// export default AssetMapper;
