import { createBrowserRouter } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import MainHomePage from "../components/MainHomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element : <DefaultLayout />,
        children : [
            {
                path: '/main',
                element : <MainHomePage />
            },
        ]
    },
    {
        path: '/',
        element : <GuestLayout />,
        children : [
            {
                path: '/login',
                element : <Login />
            },
            {
                path: '/register',
                element : <Register />
            }
        ]
    },
]);

export default router;