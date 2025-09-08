import { useEffect, useState, type ChangeEvent, type SelectHTMLAttributes } from "react"
import type { UserDropdownModel } from "../../../models/userDropdownModel";
import { API_URL } from "../../../constants";

export interface UserDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    selectedUser?: UserDropdownModel;
    onSelectedUserChange: (user: UserDropdownModel) => void;
}

export function UserDropdown(props: UserDropdownProps) {
    const {
         selectedUser, 
         onSelectedUserChange, 
         ...rest 
        } = props;
    const [users, setUsers] = useState<UserDropdownModel[]>([]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        const newSelectedUser = users.find(x => x.id == parseInt(newValue));
        if (newSelectedUser)
            onSelectedUserChange(newSelectedUser);
    }

    useEffect(() => {
        fetch(`${API_URL}/users/dropdown`)
            .then(response => response.json().then(result => {
                setUsers(result);
            }))
    }, [])

    if (users.length == 0) {
        return;
    }

    return <select value={selectedUser?.id} onChange={handleChange} {...rest}>
        <option value="" disabled>Choose a user…</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
    </select>

}