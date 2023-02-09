
import '../CSS/Personalinfo.css'
import { UserContext } from '../UserContext';
import React, { useContext, useEffect,useState } from "react";
import Displaycv from '../Displaycv';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import erroricon from '../images/erroricon.png';
import successicon from '../images/successicon.png';
export default function Personalinfo () {

  const [Details, setDetails] = useContext(UserContext);
  const [Trigger, setTrigger] = useContext(UserContext);
  const [datafromlocal, setData] = useState(JSON.parse(localStorage.getItem("Details")));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  
  } = useForm({
    mode: "onChange" // "onChange"
  });
  const revalidatedData = watch();
  let navigate = useNavigate(); 
 

  useEffect(() => {
    if (typeof Details !== "string") {
      localStorage.setItem("Details", JSON.stringify(Details));
      
    }
  }, [Details]);
   //for displaying in input fields that can stay after refresh
    useEffect(() => {
    setData(JSON.parse(localStorage.getItem("Details")));
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
    const routeChange = () =>{ 
      let path = `/experience`; 
      navigate(path);
      
    }
    const onSubmit = () => {
      routeChange();
    };

    return (
        <div className='main'>
            <div className='leftside'>
                <div className='headline'>პირადი ინფო</div>
                <div className='pagenumber'>1/3</div>
                <hr className='firsthr'/>
                <form onSubmit={handleSubmit(onSubmit)}>
                
                    <div className='namediv'>
                    <label className='labelfornameandlastname'>სახელი</label>
                    <input 
                    className={`inputfornameandlastname ${errors.firstname ? "input-error": revalidatedData.firstname ? "input-success" : null}`}
                    value={datafromlocal?.firstname} placeholder='ანზორ' name="firstname"
                    {...register("firstname", { required: true, pattern:/^[ა-ჰ]{3,}$/, onChange:(e)=> handleChange(e)})}/>
                    {errors.firstname ? (<img src={erroricon} className='firstnameerroricon' alt={''}/>) : revalidatedData.firstname ? <img src={successicon} className='firstnamesuccessicon' alt={''}/> : null}
                    <small className='smallname'>მინიმუმ 2 ასო, ქართული ასოები</small>
                    </div>

                    <div className='lastnamediv'>
                    <label className='labelfornameandlastname'>გვარი</label>
                    <input className={`inputfornameandlastname ${errors.lastname ? "input-error": revalidatedData.lastname ? "input-success" : null}`} value={datafromlocal?.lastname} placeholder='მუმლაძე' name="lastname" 
                     {...register("lastname", { required: true,pattern:/^[ა-ჰ]{3,}$/,onChange: (e) => handleChange(e)})}></input>
                     {errors.lastname ? <img src={erroricon} className='firstnameerroricon' alt={''} /> : revalidatedData.lastname ? <img src={successicon} className='firstnamesuccessicon' alt={''} /> : null}
                    <small className='smallname'>მინიმუმ 2 ასო, ქართული ასოები</small>
                    </div>

                    <label className='photolabel'>პირადი ფოტოს ატვირთვა</label>
                    <label className="custom-file-upload" >
                    <input type="file" name="image" {...register("image", { required: true,onChange: (e) => handleImage(e)})} />
                        ატვირთვა
                        </label>
                    <div className='aboutmediv'>
                    <label className='aboutmelabel input-success'>ჩემ შესახებ (არასავალდებულო)</label>
                    <textarea className='aboutmetextarea' placeholder='ზოგადი ინფო შენ შესახებ' name='textarea' value={datafromlocal?.textarea} onChange={handleChange}></textarea>
                    </div>

                    <div className='emaildiv'>
                    <label className='emaillabel'>ელ. ფოსტა</label>
                    <input type="email" name="email" value={datafromlocal?.email} className={`emailinput ${errors.email ? "input-error": revalidatedData.email ? "input-success" : null}`} placeholder='example@redberry.ge'
                    {...register("email", { required: true,pattern: /^[\w.-]+@redberry\.ge$/,onChange: (e) => handleChange(e)})}
                    ></input>
                    {errors.email ? <img src={erroricon} className='emailerroricon' alt={''} /> : revalidatedData.email ? <img src={successicon} className='emailsuccessicon'  alt={''}/> : null}
                    <small className='smallemail'>უნდა მთავრდებოდეს @redberry.ge-ით</small>
                    </div>

                    <div className='phonediv'>
                    <label className='phonelabel'>მობილურის ნომერი</label>
                    <input type="text" name="phone" value={datafromlocal?.phone} className={`phoneinput ${errors.phone ? "input-error": revalidatedData.phone ? "input-success" : null}`} placeholder='+995 555 555 555'
                    {...register("phone", { required: true,pattern: /^(\+\d{3})\s(\d{3})\s(\d{2})\s(\d{2})\s(\d{2})$/,onChange: (e) => handleChange(e)})}
                    ></input>
                    {errors.phone ? <img src={erroricon} className='emailerroricon' alt={''} /> : revalidatedData.phone ? <img src={successicon} className='emailsuccessicon' alt={''} /> : null}
                    <small className='smallphone'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</small>
                    </div>
            
                    <button type='submit' className='submitbutton1'><div className='submitbuttontext1'>შემდეგი</div></button>
                    
                </form>
            </div>
            <div className='rightside'>
                <Displaycv/>
            </div>
        </div>

    )
}