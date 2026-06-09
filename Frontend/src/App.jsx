import React from "react";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routers/Router";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { UserProvider } from "./Featrus/Context/UserContext";
import { LoadingAndErrorProvider } from "./Featrus/Context/LoadingContext";
import { ProductProvider } from "./Featrus/Context/ProductContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LoadingAndErrorProvider>
        <Toaster position="top-center" reverseOrder={true} />
        <UserProvider>
          <ProductProvider>
            <Router />
          </ProductProvider>
        </UserProvider>
      </LoadingAndErrorProvider>
    </>
  );
}

export default App;
