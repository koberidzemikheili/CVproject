import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [Details, setDetails] = useState(localStorage.getItem("Details") || {});
    const [Trigger, setTrigger] = useState(0);
    
    return (
      <UserContext.Provider value={[Details, setDetails, Trigger, setTrigger ]}>
      {props.children}
    </UserContext.Provider>
  );
};