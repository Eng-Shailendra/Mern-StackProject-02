import React from "react";
import Navbar from "../Component/Navbar";
import Frooter from "../Component/Frooter";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../Component/ProtectedRoute";
import useAuth from "../Featrus/hook/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Outlet />
      <Frooter />
    </>
  );
};
export default Home;
