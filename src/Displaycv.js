import './CSS/Displaycv.css';
import { UserContext } from './UserContext';
import React, { useContext, useState,useEffect } from "react";
import Vector from './images/Vector.png';
import Vectorphone from './images/Vectorphone.png';
import logothird from './images/LOGO3.png';
const Displaycv = () => {
  const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
  const [experiencesArray, setExperiencesArray] = useState([]);

  useEffect(() => {
      setDatafromlocal(JSON.parse(localStorage.getItem("Details")));
  }, [localStorage.getItem("Details")]);

  
  useEffect(() => {
    if (datafromlocal && datafromlocal.experiences) {
      let experiencesArray = [];
      datafromlocal.experiences.map((item, index) => {
        experiencesArray.push(item);
      });
      setExperiencesArray(experiencesArray);
    }
  }, [datafromlocal]);
  return (
    <div className='gela'>
      <div className='firstname'>{datafromlocal?.firstname}</div>
      <div className='lastname'>{datafromlocal?.lastname}</div>
       <img src={datafromlocal?.image} className='displayimage'/>
      <div className='email'>{datafromlocal?.email  && <img src={Vector} className='vectorimg' alt="emailicon"></img>}{datafromlocal?.email}</div>
      <div className='phone'>{datafromlocal?.phone  && <img src={Vectorphone} className='vectorphoneimg' alt="phoneicon"></img>}{datafromlocal?.phone}</div>
      {datafromlocal?.textarea && <div className='aboutme'>ჩემ შესახებ</div>}
      <div className='aboutmetext'>{datafromlocal?.textarea}</div>
      <div className='experiencemaindiv'>
      {experiencesArray.map((experience, index) => (
        <div key={index}>
          
          {experience && <hr className='experiencehr'/>}
          {experience?.position && <div className='position'>გამოცდილება</div>}
          <div className='positiontext'>{`${experience?.position},`}</div>
          <div className='employertext'>{experience?.employer}</div>
          <div className='dates'>{experience.start_date} {experience.due_date}</div>
          <div className='descriptiontext'>{experience?.description}</div>
          </div>
          
      ))}
    </div>
      <img src={logothird} alt='redberylogo' className='logothird'></img>
    </div>
  );
};

export default Displaycv;