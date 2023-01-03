import { Profile } from "../../components/projects_container/user/user-profile/Profile";
import { Register } from "../../components/projects_container/user/Register";
import { Login } from "../../components/projects_container/user/Login";

export const userRoutes = [
    {
        element: <Profile />,
        path: "/perfil"
    },
    {
        element: <Register />,
        path: "/crear-cuenta"
    },
    {
        element: <Login />,
        path: "/login"
    }
];
