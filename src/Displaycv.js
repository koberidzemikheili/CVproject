import { UserContext } from './UserContext';
import React, { useContext, useState,useEffect } from "react";
const Displaycv = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("Details")));
  const [Details, setDetails] = useContext(UserContext);

  useEffect(() => {
      setData(JSON.parse(localStorage.getItem("Details")));
  }, [Details]);

  return (
    <div>
      <h4>სახელი: {data?.firstname}</h4>
      <p>გვარი: {data?.lastname}</p>
      <img src={data?.image} alt="Image"/>
      <p>ჩემს შესახებ: {data?.textarea}</p>
      <p>email: {data?.email}</p>
      <p>phone: {data?.phone}</p>
    </div>
  );
};

export default Displaycv;