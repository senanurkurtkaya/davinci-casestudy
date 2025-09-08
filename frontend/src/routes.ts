import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/home";
import { Users } from "./pages/users/users";
import { Posts } from "./pages/posts/posts";
import Layout from "./layout";
import { NotFound } from "./pages/notFound/notFound";
import { CreateUser } from "./pages/users/createUser";
import { CreatePost } from "./pages/posts/createPost";
import { User } from "./pages/users/user";
import { UpdateUser } from "./pages/users/updateUser";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Home },
            {
                path: "/users/:id/update",
                Component: UpdateUser
            },
            {
                path: "/users/create",
                Component: CreateUser
            },
            {
                path: "/users/:id",
                Component: User
            },
            {
                path: "/users",
                Component: Users
            },
            {
                path: "/posts",
                Component: Posts
            },
            {
                path: "/post/create",
                Component: CreatePost
            },
            {
                path: "*",
                Component: NotFound
            },

        ]
    },
]);
