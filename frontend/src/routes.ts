import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home/home";
import { Users } from "./pages/users/users";
import { Posts } from "./pages/posts/posts";
import Layout from "./layout";
import { NotFound } from "./pages/notFound/notFound";
import { CreateUser } from "./pages/users/createUser";
import { CreatePost } from "./pages/posts/createPost";
import { User } from "./pages/users/user";

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
                path:"/users/:id",
                Component: User
            },
            {
                path: "/posts",
                Component: Posts
            },
            {
                path:"/user/create",
                Component:CreateUser
            },
            {
                path:"/post/create",
                Component:CreatePost
            },
            {
                path: "*",
                Component: NotFound
            },
            
        ]
    },
]);
