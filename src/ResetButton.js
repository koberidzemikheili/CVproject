import './CSS/ResetButton.css'
import arrowimg from './images/arrow.png'
import circleimg from './images/circle.png'
function ResetButton() {

    const handleReset = () => {
      
      localStorage.clear();
      window.location.replace('/');
    };
    return (
      <button onClick={handleReset} className='resetbuttonstyle'>
        <img src={circleimg} className='circleimgstyle'></img><img src={arrowimg} className='arrowimgstyle'></img></button>
    );
  }
  
  export default ResetButton;
  