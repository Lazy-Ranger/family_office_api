
export interface IRole {
    name: string;
    permissions: number[];
}


export interface IGetBody {
  filters: string;
  page: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  sizePerPage: number;
}

export interface IPermission {
  id: number;
  permission: string;
  description?: string;
  status?: number;
  created_by?: number;
  updated_by?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  [key: string]: unknown;
}

