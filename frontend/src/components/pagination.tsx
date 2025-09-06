import { useState } from "react";

const pageSizeOptions = [5, 10, 25, 100];

export type PaginationProps = {
    page: number;
    pageSize: number;
    totalRowCount: number;
}

export function Pagination(props: PaginationProps) {    
    const [pageSize, setPageSize] = useState(props.pageSize);
    const [currentPage, setCurrentPage] = useState(props.page);
    const [totalRowCount, setTotalRowCount] = useState(props.totalRowCount);

    const handleChange = () => {
        
    }

    return <div className="flex justify-end items-center pt-2">
        <div className="flex flex-row items-center mr-4">
            <div className="text-sm mr-2">Rows per page:</div>
            <select defaultValue="Page Size" className="select select-sm	 w-18">
                {pageSizeOptions.map(size => <option key={size} value={pageSize} onClick={() => setPageSize(size)}>{size}</option>)}
            </select>
        </div>
        <div className="mr-4">
            {`${currentPage * pageSize + 1} - ${currentPage * pageSize + pageSize} of ${totalRowCount} total rows`}
        </div>
        <div>
            <button className="btn btn-xs btn-circle mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button className="btn btn-xs btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    </div>
}