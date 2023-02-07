import './CSS/Displaycv.css';
import { UserContext } from './UserContext';
import React, { useContext, useState,useEffect } from "react";
import Vector from './images/Vector.png';
import Vectorphone from './images/Vectorphone.png';
import logothird from './images/LOGO3.png';
const Displaycv = () => {
  const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
  const [Details, setDetails] = useContext(UserContext);
  const [experiencesfromlocal,setExperiencesfromlocal] = useState();

  useEffect(() => {
      setDatafromlocal(JSON.parse(localStorage.getItem("Details")));
  }, [localStorage.getItem("Details")]);

  
  useEffect(() => {
    if (datafromlocal && datafromlocal.experiences) {
      datafromlocal.experiences.map((item, index) => {
        setExperiencesfromlocal(item);
        console.log(Details)
      });
    }
  }, [datafromlocal]);

  return (
    <div>
      <div className='firstname'>{datafromlocal?.firstname}</div>
      <div className='lastname'>{datafromlocal?.lastname}</div>
       <img src={datafromlocal?.image} className='displayimage'/>
      <div className='email'>{datafromlocal?.email  && <img src={Vector} className='vectorimg' alt="emailicon"></img>}{datafromlocal?.email}</div>
      <div className='phone'>{datafromlocal?.phone  && <img src={Vectorphone} className='vectorphoneimg' alt="phoneicon"></img>}{datafromlocal?.phone}</div>
      {datafromlocal?.textarea && <div className='aboutme'>ჩემ შესახებ</div>}
      <div className='aboutmetext'>{datafromlocal?.textarea}</div>
      <div>{experiencesfromlocal?.name}</div>
      <img src={logothird} alt='redberylogo' className='logothird'></img>
    </div>
  );
};

export default Displaycv;