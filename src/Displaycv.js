import './CSS/Displaycv.css';
import { UserContext } from './UserContext';
import React, { useContext, useState,useEffect } from "react";
import Vector from './images/Vector.png';
import Vectorphone from './images/Vectorphone.png';
const Displaycv = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("Details")));
  const [Details, setDetails] = useContext(UserContext);

  useEffect(() => {
      setData(JSON.parse(localStorage.getItem("Details")));
  }, [Details]);

  return (
    <div>
      <div className='firstname'>{data?.firstname}</div>
      <div className='lastname'>{data?.lastname}</div>
      <img src={data?.image} alt="Image" className='displayimage'/>
      <div className='email'>{data.email.length > 0 && <img src={Vector} className='vectorimg'></img>}{data?.email}</div>
      <div className='phone'>{data.phone.length > 0 && <img src={Vectorphone} className='vectorphoneimg'></img>}{data?.phone}</div>
      {<div className='aboutme'>ჩემ შესახებ</div>}
      <div className='aboutmetext'>{data?.textarea}</div>
    </div>
  );
};

export default Displaycv;