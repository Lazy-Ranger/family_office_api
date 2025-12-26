export interface IAsset {
  asset_id: string;
  asset_category_id: number;
  asset_subcategory_id: number;
  field_key: string;
  value: string;
  created_by?: number;
  updated_by?: number;

}
