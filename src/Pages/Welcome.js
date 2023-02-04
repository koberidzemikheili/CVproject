
import '../CSS/Welcome.css';
import LOGO from '../images/LOGO.png'
import LOGOBACK from '../images/LOGOBACK.png'
import { useNavigate } from "react-router-dom";
export default function Main () {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/personalinfo`; 
        navigate(path);
        //setAuthorized(true);
      }
return (
    <div className="Background">
    <img className='redberrylogo' src={LOGO}/> 
    <hr className='firstline'/>
    <img className='logoback' src={LOGOBACK}/> 
    <button className='welcomebutton'><div className='welcomebuttontext' onClick={()=>routeChange()}>რეზიუმეს დამატება</div></button>

    </div>
)
}