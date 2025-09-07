import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination";
import type { User } from "../../models/user";
import type { PaginationResult } from "../../models/paginationResult";

const fetchUsers = (currentPage: number, pageSize: number, onSuccess: (paginationResult: PaginationResult<User>) => void) => {
    fetch(`http://localhost:3000/users?page=${currentPage}&pageSize=${pageSize}`)
        .then(response => {
            if (response.status == 200) {
                response.json()
                    .then(onSuccess)
            }
        })
}

export function Users() {
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);

    const calculatePageCount = () => {
        if (totalRowCount % pageSize > 0) {
            setPageCount(Math.floor(totalRowCount / pageSize) + 1);
        }
        else {
            setPageCount(totalRowCount / pageSize);
        }
    }

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

    useEffect(() => {
        fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
            setTotalRowCount(paginationResult.totalRowCount);
            setUsers(paginationResult.data);
        })
    }, []);

    useEffect(calculatePageCount, [pageSize, totalRowCount]);

    useEffect(() => {
        fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
            setTotalRowCount(paginationResult.totalRowCount);
            setUsers(paginationResult.data);
        })
    }, [currentPage]);

    useEffect(() => {
        fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
            setTotalRowCount(paginationResult.totalRowCount);
            setUsers(paginationResult.data);
        })
    }, [pageSize]);

    return <div>
        <div className="flex justify-end my-6">
            <a href="/user/create" className="btn btn-soft btn-primary">Create User</a>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return <tr key={user.id}>
                            <th><a href={`/users/${user.id}`}>{user.id}</a></th>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
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