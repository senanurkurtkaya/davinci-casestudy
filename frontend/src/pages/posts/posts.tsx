import { useEffect, useRef, useState } from "react"
import type { Post } from "../../models/post"
import type { PaginationResult } from "../../models/paginationResult";
import { Pagination } from "../../components/pagination";
import { API_URL } from "../../constants";

const fetchPosts = (
    currentPage: number,
    pageSize: number,
    onSuccess: (paginationResult: PaginationResult<Post>) => void
) => {
    fetch(`${API_URL}/posts?page=${currentPage}&pageSize=${pageSize}`)
        .then((response) => {
            if (response.status === 200) {
                response.json().then(onSuccess);
            }
        })
        .catch(() => {
            // istersen burada bir hata state'i yüzeye çıkarabilirsin
        });
};

export function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [pageCount, setPageCount] = useState<number>(0);


    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [toDelete, setToDelete] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handlePageSizeChange = (newPageSize: number) => setPageSize(newPageSize);
    const handlePrevClick = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); };
    const handleNextClick = () => { if (currentPage + 1 < pageCount) setCurrentPage(currentPage + 1); };

    const calculatePageCount = () => setPageCount(Math.ceil(totalRowCount / pageSize));
    useEffect(calculatePageCount, [pageSize, totalRowCount]);

    useEffect(() => { setCurrentPage(0); }, [pageSize]);

    useEffect(() => {
        fetchPosts(currentPage, pageSize, (paginationResult: PaginationResult<Post>) => {
            setTotalRowCount(paginationResult.totalRowCount);
            setPosts(paginationResult.data);
        });
    }, [currentPage, pageSize]);

    const handleDelete = (id: number) => {
        const found = posts.find(p => p.id === id) ?? null;
        setToDelete(found);
        dialogRef.current?.showModal();
    };

    const confirmDelete = async () => {
        if (!toDelete) return;
        const id = toDelete.id;

        try {
            setLoading(true);
            setDeletingId(id);

            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                return;
            }

            fetchPosts(currentPage, pageSize, (paginationResult: PaginationResult<Post>) => {
                setTotalRowCount(paginationResult.totalRowCount);
                setPosts(paginationResult.data);
            });
            
        } catch {

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
                <a href="/posts/create" className="btn btn-soft btn-primary">Create Post</a>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => {
                            const isDeleting = deletingId === post.id;
                            return (
                                <tr key={post.id}>
                                    <th><a href={`/posts/${post.id}`}>{post.id}</a></th>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>{post.description}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button role="button" className="btn">Actions</button>
                                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li><a href={`/posts/${post.id}/update`}>Update</a></li>
                                                <li><a href={`/posts/${post.id}`}>Details</a></li>
                                                <li>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
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
                            )
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
                onClose={() => setToDelete(null)}
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete confirmation</h3>
                    <p className="py-4">
                        {toDelete
                            ? `“${toDelete.title}” You are about to delete the post titled. Are you sure?`
                            : "The post was not selected."}
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" disabled={loading}>Cancel</button>
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
