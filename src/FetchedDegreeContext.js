import React, { createContext, useState } from "react";


export const FetchedDegreeContext = createContext();

export const FetchedDegreeProvider = (props) => {
    const [fetcheddegree,setFetcheddegree] = useState();
    
    return (
      <FetchedDegreeContext.Provider value={[fetcheddegree,setFetcheddegree]}>
      {props.children}
    </FetchedDegreeContext.Provider>
  );
};