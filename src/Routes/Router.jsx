import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Apartment from "../Components/Apartment";
import Dashboard from "../Components/Dashboard";
import MyProfile from "../Components/MyProfile";
import ManageMembers from "../Components/Dashboard/ManageMembers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/apartment",
        Component: Apartment,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
        children: [
          {
            path: "myprofile",
            Component: MyProfile,
          },
          {
            path: "managemembers",
            Component: ManageMembers,
          },
        ],
      },
    ],
  },
]);
