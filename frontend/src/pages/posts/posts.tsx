import { useEffect, useState } from "react"
import type { Post } from "../../models/post"
import type { PaginationResult } from "../../models/paginationResult";
import { Pagination } from "../../components/pagination";

const fetchPosts = (currentPage: number, pageSize: number, onSuccess: (paginationResult: PaginationResult<Post>) => void) => {
    fetch(`http://localhost:3000/posts?page=${currentPage}&pageSize=${pageSize}`)
        .then(response => {
            if (response.status == 200) {
                response.json()
                    .then(onSuccess)
            }
        })
}

export function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [pageCount, setPageCount] = useState<number>(0);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    }

    const handlePrevClick = () => {
        //previous
        if (currentPage == 0) {
            return;
        }

        setCurrentPage(currentPage - 1);
    }

    const handleNextClick = () => {
        if ((currentPage + 1) == pageCount) {
            return;
        }

        setCurrentPage(currentPage + 1);
    }


    const calculatePageCount = () => {
        if (totalRowCount % pageSize > 0) {
            setPageCount(Math.floor(totalRowCount / pageSize) + 1);

        }
        else {
            setPageCount(totalRowCount / pageSize);
        }
    }

    useEffect(calculatePageCount, [pageSize, totalRowCount]);
    useEffect(() => {
        fetchPosts(currentPage, pageSize,
            (paginationResult: PaginationResult<Post>) => {
                setTotalRowCount(paginationResult.totalRowCount);
                setPosts(paginationResult.data)

            }
        )
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchPosts(currentPage, pageSize,
            (paginationResult: PaginationResult<Post>) => {
                setTotalRowCount(paginationResult.totalRowCount);
                setPosts(paginationResult.data)

            }
        )
    }, []);

    return <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>User Id</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => {
                        return <tr key={post.id}>
                            <th>{post.id}</th>
                            <th>{post.userId}</th>
                            <th>{post.title}</th>
                            <th>{post.description}</th>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalRowCount={totalRowCount}
            pageCount={pageCount}
            onPageSizeChange={handlePageSizeChange}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick} />
    </div>
}
