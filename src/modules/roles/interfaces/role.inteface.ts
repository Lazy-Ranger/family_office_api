
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