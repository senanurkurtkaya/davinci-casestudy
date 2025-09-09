import { useEffect, useState, useRef } from "react";
import { Pagination } from "../../components/pagination";
import type { User } from "../../models/user";
import type { PaginationResult } from "../../models/paginationResult";
import { API_URL } from "../../constants";

const fetchUsers = (
  currentPage: number,
  pageSize: number,
  onSuccess: (paginationResult: PaginationResult<User>) => void
) => {
  fetch(`${API_URL}/users?page=${currentPage}&pageSize=${pageSize}`).then(
    (response) => {
      if (response.status == 200) {
        response.json().then(onSuccess);
      }
    }
  );
};

export function Users() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toDelete, setToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const calculatePageCount = () => {
    if (totalRowCount % pageSize > 0) {
      setPageCount(Math.floor(totalRowCount / pageSize) + 1);
    } else {
      setPageCount(totalRowCount / pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handlePrevClick = () => {
    if (currentPage == 0) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage + 1 == pageCount) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
      setTotalRowCount(paginationResult.totalRowCount);
      setUsers(paginationResult.data);
    });
  }, []);

  useEffect(calculatePageCount, [pageSize, totalRowCount]);

  useEffect(() => {
    fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
      setTotalRowCount(paginationResult.totalRowCount);
      setUsers(paginationResult.data);
    });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize]);

  useEffect(() => {
    fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
      setTotalRowCount(paginationResult.totalRowCount);
      setUsers(paginationResult.data);
    });
  }, [pageSize]);

  const handleDelete = (id: number) => {
    const found = users.find((p) => p.id === id) ?? null;
    setToDelete(found);
    dialogRef.current?.showModal();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;

    const id = toDelete.id; // resetlenmeden önce id'yi al
    try {
      setLoading(true);
      setDeletingId(id);

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // istersen burada global bir hata state'i gösterebilirsin
        return;
      }

      // listeyi tazele
      fetchUsers(currentPage, pageSize, (paginationResult: PaginationResult<User>) => {
        setTotalRowCount(paginationResult.totalRowCount);
        setUsers(paginationResult.data);
      });
    } catch {
      // istersen burada hata yakalayıp alert gösterebilirsin
    } finally {
      setLoading(false);
      setDeletingId(null);
      setToDelete(null);
      dialogRef.current?.close();
    }
  };

  return (
    <div>
      <div className="flex justify-end my-6">
        <a href="/users/create" className="btn btn-soft btn-primary">
          Create User
        </a>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Username</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isDeleting = deletingId === user.id;
              return (
                <tr key={user.id}>
                  <th>
                    <a href={`/users/${user.id}`}>{user.id}</a>
                  </th>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>
                    <div className="dropdown">
                      <button role="button" className="btn">
                        Actions
                      </button>
                      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                          <a href={`/users/${user.id}/update`}>Update</a>
                        </li>
                        <li>
                          <a href={`/users/${user.id}`}>Details</a>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isDeleting || loading}
                            className="text-error"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
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
        onNextClick={handleNextClick}
      />

      <dialog
        ref={dialogRef}
        id="delete_modal"
        className="modal"
        onClose={() => setToDelete(null)} // opsiyonel: modal ESC ile kapanırsa state temizlensin
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Do you want to delete?</h3>
          <p className="py-4">
            {toDelete ? `${toDelete.email} ` : "Kullanıcı seçilmedi."}
            You are about to delete the user. Are you sure?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" disabled={loading}>
                Cancel
              </button>
            </form>
            <button
              className="btn btn-error"
              onClick={confirmDelete}
              disabled={loading || !toDelete}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
