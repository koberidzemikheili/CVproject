import './CSS/Displaycv.css';
import React, { useContext,useState,useEffect} from "react";
import Vector from './images/Vector.png';
import Vectorphone from './images/Vectorphone.png';
import logothird from './images/LOGO3.png';
import { FetchedDegreeContext } from './FetchedDegreeContext';
const Displaycv = () => {
  const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
  const [experiencesArray, setExperiencesArray] = useState([]);
  const [educationsArray, seteducationsArray] = useState([]);
  const [fetcheddegree,setFetcheddegree] = useContext(FetchedDegreeContext);

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
    if (datafromlocal && datafromlocal.educations) {
      let educationsArray = [];
      datafromlocal.educations.map((item, index) => {
        educationsArray.push(item);
      });
      seteducationsArray(educationsArray);
    }
  }, [datafromlocal]);
  
  let founddegree;
  const finddegree = (degree) => {
    fetcheddegree?.map(({ title, id }) => {
      if (degree == id) {
       founddegree = title;
      }
    });
  
  };
  
  return (
    <div className='displaycvdiv'>
      <div className='personalinfomaindiv'>
        <div className='subpersonalinformationdiv'>
          <div className='firstnamelastnamediv'>
      <div className='firstname'>{datafromlocal?.name}</div>
      <div className='lastname'>{datafromlocal?.surname}</div>
      </div>
      
      <div className='email'>{datafromlocal?.email  && <img src={Vector} className='vectorimg' alt="emailicon"></img>}{datafromlocal?.email}</div>
      <div className='phone'>{datafromlocal?.phone_number  && <img src={Vectorphone} className='vectorphoneimg' alt="phoneicon"></img>}{datafromlocal?.phone_number}</div>
      {datafromlocal?.about_me && <div className='aboutme'>ჩემ შესახებ</div>}
      <div className='aboutmetext'>{datafromlocal?.about_me}</div>
      </div>
      <img src={datafromlocal?.image} className='displayimage'/>
      </div>
      <div className='experiencemaindiv'>
      {experiencesArray.map((experience, index) => (
        <div key={index}>
          
          {experience && <hr className='experiencehr'/>}
          {experience?.position && <div className='position'>გამოცდილება</div>}
          <div className='textandemployerdiv'><div className='positiontext'>{experience?.position}</div><div className='positiontext'>{experience?.employer}</div></div>
          <div className='dates'>{experience.start_date} {experience.due_date}</div>
          <div className='descriptiontext'>{experience?.description}</div>
          </div>
          
      ))}
    </div>
        <div className='experiencemaindiv'>
    {educationsArray.map((education, index) => (
        <div key={index}>
          
          {finddegree(education?.degree_id)}
          {education  && <hr className='experiencehr'/>}
          {education  && <div className='position'>განათლება</div>}
          <div className='textandemployerdiv'><div className='positiontext'>{education?.institute}</div><div className='degreetext'>{founddegree && founddegree}</div></div>
          <div className='dates'>{education.due_date}</div>
          <div className='descriptiontext'>{education?.description}</div>
          </div> ))}
    </div>
    <img src={logothird} alt='redberylogo' className='logothird'></img>
    </div>
  );
};



export default Displaycv;