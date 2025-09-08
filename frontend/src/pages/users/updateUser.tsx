import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router"
import type { UpdateUserModel } from "../../models/updateUser";
import { API_URL } from "../../constants";

export function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UpdateUserModel | undefined>();
    const [hasError, setHasError] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (user) {
            fetch(`${API_URL}/users/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            }).then(response => {
                if (response.status == 200) {
                    navigate("/users");
                }
            }).catch(() => {
                setHasError(true);
            })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const name = e.target.getAttribute("name");

        // Burada özellikle ! kullanıyoruz, çünkü input change eventinde,
        // tüm değer silindiğinde atama işlemi yapılamıyor
        setUser({
            ...user!,
            [name!]: newValue
        })
    }

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/users/${id}`)
                .then(response => {
                    response.json().then(setUser)
                })
                .catch(() => {
                    setHasError(true);
                })
        }
    }, [id]);

    if (!user) {
        return;
    }

    return <div>
        <form method="post" onSubmit={handleSubmit}><h3 className="text-xl mb-6">Update User #{id}</h3>
            <div className="grid grid-cols-3 gap-4">
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="input w-full"
                    value={user.email}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="username"
                    required
                    placeholder="User Name"
                    className="input w-full"
                    value={user.username}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    className="input w-full"
                    value={user.name}
                    onChange={handleChange} />
            </div>
            <div className="flex justify-end my-6" >
                <button 
                className="btn btn-soft btn-primary mr-4"
                 onClick={() => navigate(-1)}>
                    Back
                    </button>
                <button type="submit" className="btn btn-soft btn-primary ">Submit</button>
            </div>
            {hasError && (<div role="alert" className="alert alert-error">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 shrink-0 stroke-current"
                     fill="none" 
                     viewBox="0 0 24 24">
                    <path 
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error! An unexpected error occured. We will lookup for the issue.</span>
            </div>)}
        </form>
    </div>
}