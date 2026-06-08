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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
