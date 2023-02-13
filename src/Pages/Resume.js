import '../CSS/Displaycv.css'
import React, { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Vector from '../images/Vector.png';
import xbutton from '../images/xbutton.png';
import Vectorphone from '../images/Vectorphone.png';
import logothird from '../images/LOGO3.png';
import ResetButton from '../ResetButton';
import {AuthContext} from '../AuthContext';
export default function Resume (){
    const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("FinalData")));
    const [experiencesArray, setExperiencesArray] = useState([]);
    const [educationsArray, seteducationsArray] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const { fourth } = useContext(AuthContext);
    const [fourthpageauth, setFourthpageauth] = fourth;
    let navigate = useNavigate();
    //in this useeffect we are taking data from localstorage using datafromlocal and also we are chechking if this page has authentification set to true.
    useEffect(() => {
      if(!fourthpageauth){
        navigate(-1);
      }
        setDatafromlocal(JSON.parse(localStorage.getItem("FinalData")));
    }, [localStorage.getItem("FinalData")]);
    //in this useeffect we are taking data from the datafromlocal which is data from localstorage and we are setting the arrays educations and experiences using usestate.
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

    
    
    return (
        <div className='resumepagemaindiv'>
            <ResetButton/>
      <div className='resumedisplaycvdiv'>
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
        <img src={`https://resume.redberryinternship.ge/${datafromlocal?.image}`} className='displayimage'/>
        </div>
        <div className='experiencemaindiv'>
        {experiencesArray.map((experience, index) => (
          <div key={index}>
            
            {index === 0 && datafromlocal.experience && <hr className='experiencehr'/>}
            {index === 0 && experience &&   <div className='position'>გამოცდილება</div>}
            <div className='textandemployerdiv'><div className='positiontext'>{experience?.position}</div><div className='positiontext'>{experience?.employer}</div></div>
            <div className='dates'>{experience.start_date} {experience.due_date}</div>
            <div className='descriptiontext'>{experience?.description}</div>
            </div>
            
        ))}
      </div>
          <div className='experiencemaindiv'>
      {educationsArray.map((education, index) => (
          <div key={index}>
        
            {index === 0 && education  && <hr className='experiencehr'/>}
            {index === 0 && education &&   <div className='position'>განათლება</div>}
            <div className='textandemployerdiv'><div className='positiontext'>{education?.institute}</div><div className='degreetext'>{education?.degree}</div></div>
            <div className='dates'>{education.due_date}</div>
            <div className='descriptiontext'>{education?.description}</div>
            </div> ))}  
      </div>
      <img src={logothird} alt='redberylogo' className='logothird'></img>
      </div>
      {showModal && (
      <div className='modalmaindiv'>
          <div className="modal-content">
            <div>რეზიუმე წარმატებით გაიგზავნა  🎉</div>
            <img src={xbutton}  onClick={() => setShowModal(false)} className='xbutton'></img>
          </div>
      </div>
      )}
      </div>
      
    );
}