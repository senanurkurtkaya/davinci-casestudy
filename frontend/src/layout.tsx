import { Outlet } from "react-router"
import { Header } from "./shared/header"

export default function Layout() {
    return <div>

        <Header />
        <div className="container mx-auto">
            <Outlet />
        </div>

    </div>
}