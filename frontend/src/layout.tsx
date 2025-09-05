import { Outlet } from "react-router"
import { Header } from "./shared/header"

export default function Layout() {
    return <div>

        <Header />
        <Outlet />

    </div>
}