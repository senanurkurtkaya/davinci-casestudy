import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router"
import type { CreatePost } from "../../models/createPost";
import { UserDropdown } from "./components/userDropdown";
import type { UserDropdownModel } from "../../models/userDropdownModel";
import { API_URL } from "../../constants";

export function CreatePost() {
    const navigate = useNavigate();
    
    const [selectedUser, setSelectedUser] = useState<UserDropdownModel | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const userId = formData.get("userId")?.toString();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();

        if (userId && title && description) {
            const data: CreatePost = {
                userId: parseInt(userId),
                title,
                description
            };

            fetch(`${API_URL}/posts`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status == 201) {
                    navigate("/posts");
                }
            })
        }
    }

    return <div>
        <form method="post" onSubmit={handleSubmit}>
            <h3 className="text-xl mb-6">Create New Post</h3>
            <div>
                <div className="grid grid-cols-3 gap-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Select User</legend>
                        <UserDropdown
                            name="userId"
                            className="select w-full"
                            required
                            selectedUser={selectedUser}
                            onSelectedUserChange={setSelectedUser}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Title</legend>
                        <input type="text"
                            name="title"
                            required
                            placeholder="Title"
                            className="input w-full" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Description</legend>
                        <textarea className="w-full textarea h-24"
                            name="description"
                            placeholder="Description"></textarea>
                    </fieldset>
                </div>
              <div className="flex justify-end my-6" >
                <button className="btn btn-soft btn-primary mr-4" onClick={() => navigate("/users")}>Back</button>
                <button type="submit" className="btn btn-soft btn-primary ">Submit</button>
            </div>
            </div>
        </form>
    </div>


}

