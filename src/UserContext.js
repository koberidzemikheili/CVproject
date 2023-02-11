import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [Details, setDetails] = useState(localStorage.getItem("Details") || {});
    
    return (
      <UserContext.Provider value={[Details, setDetails]}>
      {props.children}
    </UserContext.Provider>
  );
};