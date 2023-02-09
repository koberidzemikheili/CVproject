import './CSS/Displaycv.css';
import React, { useContext,useState,useEffect,useMemo} from "react";
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
        <div>
      <div className='firstname'>{datafromlocal?.firstname}</div>
      <div className='lastname'>{datafromlocal?.lastname}</div>
      </div>
       <img src={datafromlocal?.image} className='displayimage'/>
      <div className='email'>{datafromlocal?.email  && <img src={Vector} className='vectorimg' alt="emailicon"></img>}{datafromlocal?.email}</div>
      <div className='phone'>{datafromlocal?.phone  && <img src={Vectorphone} className='vectorphoneimg' alt="phoneicon"></img>}{datafromlocal?.phone}</div>
      {datafromlocal?.textarea && <div className='aboutme'>ჩემ შესახებ</div>}
      <div className='aboutmetext'>{datafromlocal?.textarea}</div>
      </div>

      <div className='experiencemaindiv'>
      {experiencesArray.map((experience, index) => (
        <div key={index}>
          
          {experience && <hr className='experiencehr'/>}
          {experience?.position && <div className='position'>გამოცდილება</div>}
          <div className='positiontext'>{experience?.position}{`, ${experience?.employer}`}</div>
          <div className='dates'>{experience.start_date} {experience.due_date}</div>
          <div className='descriptiontext'>{experience?.description}</div>
          </div>
          
      ))}
    </div>
   
    {educationsArray.map((education, index) => (
        <div key={index}>
          
          {finddegree(education?.degree)}
          {education && <hr className='experiencehr'/>}
          {education?.institute && <div className='position'>გამოცდილება</div>}
          <div className='positiontext'>{education?.institute}{`, ${founddegree}`}</div>
          <div className='dates'>{education.due_date}</div>
          <div className='descriptiontext'>{education?.description}</div>
          </div> ))}
      <img src={logothird} alt='redberylogo' className='logothird'></img>
    </div>
  );
};


export default Displaycv;