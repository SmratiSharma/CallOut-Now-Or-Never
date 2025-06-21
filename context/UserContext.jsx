import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  console.log("UserContext loaded");

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
      
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
