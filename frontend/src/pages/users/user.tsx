import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { User } from "../../models/user";

export function User() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:3000/users/${id}`)
                .then(response => response.json().then(user => {
                    setUser(user);
                    setLoading(false);
                }));
        }
    }, [id]);

    if (loading) {
        return <div className="w-full text-center h-dvh flex items-center place-content-center">
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if (!user && !loading) {
        return <div>User not found!</div>
    }

    return <div>
        <div className="w-full rounded-md bg-base-200 p-8 grid grid-cols-4 gap-4">
            <div>
                <label className="mr-2 font-medium">Id:</label>
                {user?.id}
            </div>

            <div>
                <label className="mr-2 font-medium">Email:</label>
                {user?.email}
            </div>
            
            <div>
                <label className="mr-2 font-medium">Name:</label>
                {user?.name}
            </div>
            <div>
                <label className="mr-2 font-medium">Username:</label>
                {user?.username}
            </div>
        </div>
        <div className="flex justify-end mt-6">
            <button className="btn btn-soft btn-primary" onClick={() => navigate(-1)}>Back</button>
        </div>
    </div>
}