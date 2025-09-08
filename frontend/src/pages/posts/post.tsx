import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { Post } from "../../models/post";
import { API_URL } from "../../constants";

export function Post() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState<Post | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`${API_URL}/posts/${id}`)
                .then(response => response.json().then(post => {
                    setPost(post);
                    setLoading(false);
                }));
        }
    }, [id]);

    if (loading) {
        return <div className="w-full text-center h-dvh flex items-center place-content-center">
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if (!post && !loading) {
        return <div>Post not found!</div>
    }

    return <div>
        <div className="w-full rounded-md bg-base-200 p-8 grid grid-cols-4 gap-4">
            <div>
                <label className="mr-2 font-medium">Id:</label>
                {post?.id}
            </div>

            <div>
                <label className="mr-2 font-medium">User Id:</label>
                {post?.userId}
            </div>

            <div>
                <label className="mr-2 font-medium">Title:</label>
                {post?.title}
            </div>

            <div>
                <label className="mr-2 font-medium">Description:</label>
                {post?.description}
            </div>
        </div>
        <div className="flex justify-end mt-6">
            <button className="btn btn-soft btn-primary" onClick={() => navigate("/posts")}>Back</button>
        </div>
    </div>
}