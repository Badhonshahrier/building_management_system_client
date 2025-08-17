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
import PaymentHistory from "../Components/Dashboard/PaymentHistory";
import Errorpage from "../Components/Errorpage";
import Overview from "../Components/Dashboard/Overview";
import ApartmentDetails from "../Components/ApartmentDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Errorpage></Errorpage>,
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
        path: "/details/:id",
        Component: ApartmentDetails,
        loader:({params})=>fetch(`http://localhost:3000/apartInfo/${params.id}`)
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "overview",
            element: (
              <PrivateRoutes>
                <Overview></Overview>
              </PrivateRoutes>
            ),
          },
          {
            path: "myprofile",
            element: (
              <PrivateRoutes>
                <MyProfile></MyProfile>
              </PrivateRoutes>
            ),
          },
          {
            path: "managemembers",
            element: (
              <PrivateRoutes>
                <ManageMembers></ManageMembers>
              </PrivateRoutes>
            ),
          },
          {
            path: "makeannouncement",
            element: (
              <PrivateRoutes>
                <MakeAnnouncement></MakeAnnouncement>
              </PrivateRoutes>
            ),
          },
          {
            path: "agreementrequests",
            element: (
              <PrivateRoutes>
                <AgreementRequests></AgreementRequests>
              </PrivateRoutes>
            ),
          },
          {
            path: "managecoupons",
            element: (
              <PrivateRoutes>
                <ManageCoupons></ManageCoupons>
              </PrivateRoutes>
            ),
          },
          {
            path: "makepayment",
            element: (
              <PrivateRoutes>
                <MakePayment></MakePayment>
              </PrivateRoutes>
            ),
          },
          {
            path: "payment/:id",
            element: (
              <PrivateRoutes>
                <RentPayment></RentPayment>
              </PrivateRoutes>
            ),
          },
          {
            path: "announcement",
            element: (
              <PrivateRoutes>
                <Announcement></Announcement>
              </PrivateRoutes>
            ),
          },
          {
            path: "paymenthistory",
            element: (
              <PrivateRoutes>
                <PaymentHistory></PaymentHistory>
              </PrivateRoutes>
            ),
          },
        ],
      },
    ],
  },
]);
