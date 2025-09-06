export interface PaginationResult<TData> {
    totalRowCount: number;
    data: TData[];
}