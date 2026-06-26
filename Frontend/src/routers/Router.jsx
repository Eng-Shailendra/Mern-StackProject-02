import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../Component/ProtectedRoute";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import VerifiyEmail from "../pages/VerifiyEmail";
import VerifiyOTP from "../pages/VerifiyOTP";
import Verify from "../pages/Verify";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import ProductPage from "../Product/pages/ProductPage";
import ShopPage from "../Product/pages/ShopPage";
import CartPage from "../Product/pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import AboutusPage from "../pages/AboutusPage";
import ProductById from "../Product/pages/ProductById";
import NotFoundPage from "../pages/NotFoundPage";
import AdminPage from "../Admin/pages/AdminPage";
import CreateProductPage from "../Admin/pages/CreateProductPage";
import UpdateProductPage from "../Admin/pages/UpdateProductPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,

          element: <ProductPage />,
        },
        {
          path: "/shop",

          element: (
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:id",
          element: <ProductById />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",

          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/aboutus",
          element: <AboutusPage />,
        },
        {
          path: "/admin",

          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/add-product",
          element: <CreateProductPage />,
        },
        {
          path: "/admin/update-product/:id",
          element: <UpdateProductPage />,
        },
      ],
    },

    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/verify/:token",
      element: <Verify />,
    },
    {
      path: "/verify-email",
      element: <VerifiyEmail />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/verify-otp/:email",
      element: <VerifiyOTP />,
    },
    {
      path: "/change-password/:email",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
