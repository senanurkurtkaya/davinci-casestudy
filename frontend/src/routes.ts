import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/home";
import { Users } from "./pages/users/users";
import { Posts } from "./pages/posts/posts";
import Layout from "./layout";
import { NotFound } from "./pages/notFound/notFound";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Home },
            {
                path: "/users",
                Component: Users
            },
            {
                path: "/posts",
                Component: Posts
            },
            {
                path: "*",
                Component: NotFound
            }
        ]
    },
]);
