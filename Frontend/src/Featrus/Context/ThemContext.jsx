import { useState } from "react";
import { createContext } from "react";

const ThemContext = createContext();

export const ThemProvider = ({ children }) => {
  const [theme, setTheme] = useState("");



  return( <ThemContext.Provider value={theme, setTheme} >
    {children}
    </ThemContext.Provider>
    );
};
