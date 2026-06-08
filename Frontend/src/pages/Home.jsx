import React from "react";
import Navbar from "../Component/Navbar";
import Hero from "../Component/Hero";
import Frooter from "../Component/Frooter";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../Component/ProtectedRoute";
import useAuth from "../Featrus/hook/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      {!user && <Hero />}
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
      <Frooter />
    </>
  );
};
export default Home;
