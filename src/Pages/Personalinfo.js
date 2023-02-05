
import '../CSS/Personalinfo.css'
import { UserContext } from '../UserContext';
import React, { useContext, useEffect } from "react";
import Displaycv from '../Displaycv';
import { useForm } from 'react-hook-form';
export default function Personalinfo () {

  const [Details, setDetails] = useContext(UserContext);
  const [Trigger, setTrigger] = useContext(UserContext);
  useEffect(() => {
    if (typeof Details !== "string") {
      localStorage.setItem("Details", JSON.stringify(Details));
      //retriggers render because we had 1 render delay with setup of Details and setDetails the definition of IF IT WORKS DONT TOUCH IT
      setTrigger(Trigger+1);
    }
  }, [Details]);
  
    const handleImage = async (e) => {
      const file = e.target.files[0];
      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setDetails({ ...JSON.parse(localStorage.getItem("Details")), image: reader.result });
        };
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'firstname' || name === 'lastname' || name ==='image' || name ==='textarea' || name ==='email'|| name ==='phone') {
        setDetails({...JSON.parse(localStorage.getItem("Details")), [name]: value});
      }
    };

    return (
        <div className='main'>
            <div className='leftside'>
                <div className='headline'>პირადი ინფო</div>
                <div className='pagenumber'>1/3</div>
                <hr className='firsthr'/>
                <form>
                    <div className='namediv'>
                    <label className='labelfornameandlastname'>სახელი</label>
                    <input className='inputfornameandlastname' placeholder='ანზორ' name="firstname" onChange={handleChange}></input>
                    <small className='smallname'>მინიმუმ 2 ასო, ქართული ასოები</small>
                    </div>
                    <div className='lastnamediv'>
                    <label className='labelfornameandlastname'>გვარი</label>
                    <input className='inputfornameandlastname'  placeholder='მუმლაძე' name="lastname" onChange={handleChange}></input>
                    <small className='smallname'>მინიმუმ 2 ასო, ქართული ასოები</small>
                    </div>
                    <label className='photolabel'>პირადი ფოტოს ატვირთვა</label>
                    <label className="custom-file-upload" >
                    <input type="file" name="image" onChange={handleImage}/>
                        ატვირთვა
                        </label>
                    <div className='aboutmediv'>
                    <label className='aboutmelabel'>ჩემ შესახებ (არასავალდებულო)</label>
                    <textarea className='aboutmetextarea' placeholder='ზოგადი ინფო შენ შესახებ' name='textarea' onChange={handleChange}></textarea>
                    </div>
                    <div className='emaildiv'>
                    <label className='emaillabel'>ელ. ფოსტა</label>
                    <input type="email" name="email" className='emailinput' placeholder='example@redberry.ge' onChange={handleChange}></input>
                    <small className='smallemail'>უნდა მთავრდებოდეს @redberry.ge-ით</small>
                    </div>
                    <div className='phonediv'>
                    <label className='phonelabel'>მობილურის ნომერი</label>
                    <input type="text" name="phone" className='phoneinput' placeholder='+995 555 555 555' onChange={handleChange}></input>
                    <small className='smallphone'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</small>
                    </div>
                </form>
            </div>
            <div className='rightside'>
                <Displaycv/>
            </div>
        </div>

    )
}