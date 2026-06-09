import { createContext, useState } from "react";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  return (
    <productContext.Provider value={{ product, setProduct }}>
      {children}
    </productContext.Provider>
  );
};
