import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Apartment from "../Components/Apartment";
import Dashboard from "../Components/Dashboard";
import MyProfile from "../Components/MyProfile";
import ManageMembers from "../Components/Dashboard/ManageMembers";
import MakeAnnouncement from "../Components/Dashboard/MakeAnnouncement";
import AgreementRequests from "../Components/Dashboard/AgreementRequests";
import ManageCoupons from "../Components/Dashboard/ManageCoupons";
import MakePayment from "../Components/Dashboard/MakePayment";
import RentPayment from "../Components/RentPayment";
import PrivateRoutes from "./PrivateRoute";
import Announcement from "../Components/Announcement";

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
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
          {
            path: "myprofile",
            Component: MyProfile,
          },
          {
            path: "managemembers",
            Component: ManageMembers,
          },
          {
            path:"makeannouncement",
            Component:MakeAnnouncement
          },
          {
            path:"agreementrequests",
            Component:AgreementRequests
          },
          {
            path:"managecoupons",
            Component:ManageCoupons,
          },
          {
            path:"makepayment",
            Component:MakePayment,
          },
          {
            path:'payment/:id',
            Component:RentPayment,
          },
          {
            path:"announcement",
            Component:Announcement,
          },
        ],
      },
    ],
  },
]);
