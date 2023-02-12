import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [firstpageauth, setFirstpageauth] = useState(
    JSON.parse(localStorage.getItem("firstpageauth"))
  );

  const [secondpageauth, setSecondpageauth] = useState(
    JSON.parse(localStorage.getItem("secondpageauth"))
  );
  const [thirdpageauth, setThirdpageauth] = useState(
    JSON.parse(localStorage.getItem("thirdpageauth"))
  );
  const [fourthpageauth, setFourthpageauth] = useState(
    JSON.parse(localStorage.getItem("fourthpageauth"))
  );

  return (
    <AuthContext.Provider
      value={{
        first: [firstpageauth, setFirstpageauth],
        second: [secondpageauth, setSecondpageauth],
        third: [thirdpageauth,setThirdpageauth],
        fourth: [fourthpageauth,setFourthpageauth]
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;