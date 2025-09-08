import { useEffect, useState, type ChangeEvent, type SelectHTMLAttributes } from "react"
import type { UserDropdownModel } from "../../../models/userDropdownModel";

export interface UserDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    selectedUser?: UserDropdownModel;
    onSelectedUserChange: (user: UserDropdownModel) => void;
}

export function UserDropdown(props: UserDropdownProps) {
    const { selectedUser, onSelectedUserChange, ...rest } = props;
    const [users, setUsers] = useState<UserDropdownModel[]>([]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        const newSelectedUser = users.find(x => x.id == parseInt(newValue));
        if (newSelectedUser)
            onSelectedUserChange(newSelectedUser);
    }

    useEffect(() => {
        fetch("http://localhost:3000/users/dropdown")
            .then(response => response.json().then(result => {
                setUsers(result);
            }))
    }, [])

    return <select value={selectedUser?.id} onChange={handleChange} {...rest}>
        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
    </select>

}