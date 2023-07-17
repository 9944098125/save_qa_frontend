import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../Pages/Home";
import Navbar from "../Components/Navbar";
import Create from "../Pages/Create";
import { useSelector } from "react-redux";

const Layout = () => {
  const SwitchMode = useSelector((state) => state.toggleThemeReducer);

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: SwitchMode.darkMode ? "black" : "white",
        }}
        className="content"
      >
        <Outlet />
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
