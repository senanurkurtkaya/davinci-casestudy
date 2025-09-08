import { type ChangeEvent } from "react";

const pageSizeOptions = [5, 10, 25, 100];

export type PaginationProps = {
    currentPage: number;
    pageSize: number;
    totalRowCount: number;
    pageCount: number;
    onPageSizeChange: (newPageSize: number) => void;
    onPrevClick: () => void;
    onNextClick: () => void;
}

export function Pagination(props: PaginationProps) {
    const {
        pageSize,
        currentPage,
        totalRowCount,
        pageCount,
        onPageSizeChange,
        onPrevClick,
        onNextClick
    } = props;

    const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = e.target.value;
        if (newPageSize) {
            onPageSizeChange(parseInt(newPageSize));
        }
    }

    const handlePrevClick = () => {
        if (currentPage == 0) {
            return;
        }

        onPrevClick();
    }

    const handleNextClick = () => {
        if ((currentPage + 1) == pageCount) {
            return;
        }

        onNextClick();
    }

    return <div className="flex justify-end items-center pt-2">
        <div className="flex flex-row items-center mr-4">
            <div className="text-sm mr-2">Rows per page:</div>
            <select defaultValue="Page Size" className="select select-sm w-18" onChange={handleSizeChange}>
                {pageSizeOptions.map(size => <option key={size} value={size}>{size}</option>)}
            </select>
        </div>
        <div className="mr-4">
            {`${currentPage * pageSize + 1} - ${currentPage * pageSize + pageSize} of ${totalRowCount} total rows`}
        </div>
        <div>
            <button className={`btn btn-xs btn-circle mr-2 ${currentPage == 0 ? 'disabled' : ''}`} onClick={handlePrevClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button className={`btn btn-xs btn-circle ${(currentPage + 1) == pageCount ? 'disabled' : ''}`} onClick={handleNextClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    </div>
}