import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination";
import type { User } from "../../models/user";

export function Users() {
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/users?page=${currentPage}&pageSize=${pageSize}`)
            .then(response => {
                if (response.status == 200) {
                    response.json()
                        .then(paginationResult => {
                            setTotalRowCount(paginationResult.totalRowCount);
                            setUsers(paginationResult.data);
                        })
                }
            })
    }, []);

    return <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
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
                            <th>{user.id}</th>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <Pagination page={currentPage} pageSize={pageSize} totalRowCount={totalRowCount} />
    </div>
}