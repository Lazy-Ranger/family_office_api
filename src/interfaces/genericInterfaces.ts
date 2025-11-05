 export interface IObjectKeys {
  [key: string]: unknown;
}

export interface IDbCount {
  [key: string]: string | number;
}

export interface IError {
  statusCode ?: number;
  status?: number;
  message?: string;
  errorCode?: number;
  description ?: string;
  data?: string
}

export interface QueryParams<T> {
  filters: T;
  page: number;
  sizePerPage: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}
