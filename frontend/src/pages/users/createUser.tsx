import type { FormEvent } from "react"
import type { CreateUser } from "../../models/createUser";
import { useNavigate } from "react-router";
import { API_URL } from "../../constants";

export function CreateUser() {
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email")?.toString();
        const username = formData.get("username")?.toString();
        const name = formData.get("name")?.toString();

        if (email && username && name) {
            const data: CreateUser = {
                email,
                username,
                name
            };

            fetch(`${API_URL}/users`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status == 201) {
                    navigate("/users");
                }
            })
        }
    }

    return <div>
        <form method="post" onSubmit={handleSubmit}><h3 className="text-xl mb-6">Create New User</h3>
            <div className="grid grid-cols-3 gap-4">
                <input type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="input w-full" />
                <input type="text"
                    name="username"
                    required
                    placeholder="User Name"
                    className="input w-full" />
                <input type="text"
                    name="name"
                    required
                    placeholder="Name"
                    className="input w-full" />
            </div>
            <div className="flex justify-end my-6" >
                <button className="btn btn-soft btn-primary mr-4" onClick={() => navigate("/users")}>Back</button>
                <button type="submit" className="btn btn-soft btn-primary ">Submit</button>
            </div>
        </form>
    </div>


}