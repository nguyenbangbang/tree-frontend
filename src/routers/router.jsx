import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/Trees/CartPage";
import CheckoutPage from "../pages/Trees/CheckoutPage";
import SingleTree from "../pages/Trees/SingleTree";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/Trees/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManagerTrees from "../pages/dashboard/managerTrees/ManagerTrees";
import AddTree from "../pages/dashboard/addTree/AddTree";
import UpdateTree from "../pages/dashboard/editTree/UpdateTree";
import ManageOrders from "../pages/dashboard/ManagerOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/trees/:id",
        element: <SingleTree />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-tree",
        element: (
          <AdminRoute>
            <AddTree />
          </AdminRoute>
        ),
      },
      {
        path: "edit-tree/:id",
        element: (
          <AdminRoute>
            <UpdateTree />
          </AdminRoute>
        ),
      },
      {
        path: "manage-trees",
        element: (
          <AdminRoute>
            <ManagerTrees />
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
