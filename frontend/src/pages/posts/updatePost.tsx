import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router"
import type { UpdatePostModel } from "../../models/updatePost";
import { UserDropdown } from "./components/userDropdown";
import type { UserDropdownModel } from "../../models/userDropdownModel";
import type { Post } from "../../models/post";
import { API_URL } from "../../constants";

export function UpdatePost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<UpdatePostModel | undefined>();
    const [hasError, setHasError] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserDropdownModel | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (post && id) {
            fetch(`${API_URL}/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            }).then((response) => {
                if (response.status === 200 || response.ok) {
                    navigate("/posts");
                } else {
                    setHasError(true);
                }
            }).catch(() => {
                setHasError(true);
            });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const name = e.target.getAttribute("name");

        let value: any = newValue;
        if (name === "userId") {
            value = newValue === "" ? "" : Number(newValue);
        }

        setPost({
            ...post,
            [name!]: value,
        } as UpdatePostModel);
    };

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/posts/${id}`)
                .then((response) => {
                    if (!response.ok) throw new Error("Fetch failed");
                    return response.json();
                })
                .then((result: Post) => {
                    setPost(result);

                    setSelectedUser({
                        id: result.userId
                    })
                })
                .catch(() => {
                    setHasError(true);
                });
        }
    }, [id]);

    if (!post) {
        return null;
    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <h3 className="text-xl mb-6">Update Post #{id}</h3>
                <div className="grid grid-cols-3 gap-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Select User</legend>
                        {selectedUser && <UserDropdown
                            name="userId"
                            className="select w-full"
                            required
                            selectedUser={selectedUser}
                            onSelectedUserChange={setSelectedUser}
                        />}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Title</legend>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Title"
                            className="input w-full"
                            value={post.title ?? ""}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Description</legend>
                        <input
                            type="textarea"
                            name="description"
                            required
                            placeholder="Description"
                            className="input w-full"
                            value={post.description ?? ""}
                            onChange={handleChange}
                        />
                    </fieldset>
                </div>
                <div className="flex justify-end my-6">
                    <button
                        type="button"
                        className="btn btn-soft btn-primary mr-4"
                        onClick={() => navigate("/posts")}
                    >
                        Back
                    </button>
                    <button type="submit" className="btn btn-soft btn-primary ">
                        Submit
                    </button>
                </div>
                {hasError && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24" >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Error! An unexpected error occured. We will lookup for the issue.</span>
                    </div>
                )}
            </form>
        </div>
    );
}