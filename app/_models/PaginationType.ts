export interface PaginationType {
  data: any[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  sortColumn: string;
  sortOrder: string;
  filterColumn: string;
  filterQuery: string;
}


