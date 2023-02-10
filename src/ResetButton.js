import './CSS/ResetButton.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import { useContext } from "react";
import arrowimg from './images/arrow.png'
import circleimg from './images/circle.png'
function ResetButton() {
    const [Details, setDetails] = useContext(UserContext);
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
        setDetails({});
      }
    const handleReset = () => {
      
      localStorage.clear();
      routeChange();
    };
    return (
      <button onClick={handleReset} className='resetbuttonstyle'>
        <img src={circleimg} className='circleimgstyle'></img><img src={arrowimg} className='arrowimgstyle'></img></button>
    );
  }
  
  export default ResetButton;
  