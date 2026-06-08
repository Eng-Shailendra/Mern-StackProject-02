import { useState } from "react";
import { createContext } from "react";

export const LoadingAndErrorContext = createContext();

export const LoadingAndErrorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <LoadingAndErrorContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </LoadingAndErrorContext.Provider>
  );
};

