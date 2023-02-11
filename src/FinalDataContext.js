import React, { createContext, useState } from "react";

export const FinalDataContext = createContext();

export const FinalDataProvider = (props) => {
    const [FinalData, setFinalData] = useState();
    
    return (
      <FinalDataContext.Provider value={[FinalData, setFinalData]}>
      {props.children}
    </FinalDataContext.Provider>
  );
};