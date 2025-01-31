export interface PaginationResult<T> {
  results: T[];
  pagination: Pagination;
}
export interface Pagination {
  total: number;
  last_page: number;
  current_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}
export interface queryParamsProps {
  search?: string;
  page: number;
  limit?: number;
  order_by?: string;
  order?: "asc" | "desc";
}
