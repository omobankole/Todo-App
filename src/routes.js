import { useRoutes } from "react-router";
import AuthLayout from "./layout/authLayout/authLayout";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import Home from "./pages/Home/home";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/register", element: <Register /> }
      ],
    },
    {
      path: "/home",
      element: <Home />,
  
    },
  ]);
};

export default Routes;
