
import '../CSS/Welcome.css';
import LOGO from '../images/LOGO.png'
import LOGOBACK from '../images/LOGOBACK.png'
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect,useState } from "react"
import {AuthContext} from '../AuthContext';
export default function Main () {
    const { first, second } = useContext(AuthContext);
  const [firstpageauth, setFirstpageauth] = first;
    let navigate = useNavigate(); 
    //changes route to next page sets auth token true and saves it in localstorage but clears localstorage before doing it.
    const routeChange = () =>{ 
        let path = `/personalinfo`; 
        navigate(path);
        setFirstpageauth(true);
        localStorage.clear();
        localStorage.setItem("firstpageauth", JSON.stringify(true));
      }
     
return (
    <div className="Background">
    <img className='redberrylogo' src={LOGO} alt={''}/> 
    <hr className='firstline'/>
    <img className='logoback' src={LOGOBACK} alt={''}/> 
    <button className='welcomebutton' onClick={()=>routeChange()}><div className='welcomebuttontext'>რეზიუმეს დამატება</div></button>

    </div>
)
}