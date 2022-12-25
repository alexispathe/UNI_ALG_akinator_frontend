import { Profile } from "../../components/user/user-profile/Profile";
import { Register } from "../../components/user/Register";
import { Login } from "../../components/user/Login";

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
