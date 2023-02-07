import '../CSS/Experience.css'
import React, { useContext, useEffect,useState } from "react";
import { UserContext } from '../UserContext';
import Displaycv from '../Displaycv';
import { set } from 'react-hook-form';
export default function Experience () {

    const [Details, setDetails] = useContext(UserContext);
    const [Trigger, setTrigger] = useContext(UserContext);
    const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
    //Experiences array from local storage i am using this state for displaying values and cvdisplay
    const [experiencesfromlocal,setExperiencesfromlocal] = useState();
    const [formFields, setFormFields] = useState(
        datafromlocal && datafromlocal.experiences
          ? datafromlocal.experiences
          : [{ name: '', lastname: '' }]
      );
    
      //handleformchange takes event and index from input that is mapped and saves data in setFormFields. in the end calls handlechange
      const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
        handleChange();
      }
    
      const handleChange = () => {
        setDetails({...JSON.parse(localStorage.getItem("Details")), "experiences": formFields});
      }
      useEffect(() => {
        if (typeof Details !== "string") {
          localStorage.setItem("Details", JSON.stringify(Details));
          ;
        }
      }, [Details]);

      useEffect(() => {
        setDatafromlocal(JSON.parse(localStorage.getItem("Details")));
    }, [Details]);

   
    useEffect(() => {
        if (datafromlocal && datafromlocal.experiences) {
          datafromlocal.experiences.map((item, index) => {
            setExperiencesfromlocal(item);
          });
        }
      }, [datafromlocal]);
      
    
      const addFields = () => {
        let object = {
          name: '',
          lastname: ''
        }
    
        setFormFields([...formFields, object])
      }
    
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }
     
      
      
    
      return (
        <div className="main">
            <div className='leftside'>
                <div className='headline'>პირადი ინფო</div>
                <div className='pagenumber'>1/3</div>
                <hr className='firsthr'/>
          <form>
            {formFields.map((form, index) => {
              return (
                <div key={index}>
                  <input
                    name='name'
                    placeholder='Name'
                    value={formFields[index].name}
                    onChange={event => handleFormChange(event, index)}
                    
                  />
                  <input
                    name='lastname'
                    placeholder='lastname'
                    onChange={event => handleFormChange(event, index)}
                    value={formFields[index].lastname}
                  />
                  <button onClick={() => removeFields(index)}>Remove</button>
                </div>
              )
            })}
          </form>
          <button onClick={addFields}>Add More..</button>
          <br />
            <div>{experiencesfromlocal?.name}</div>
            <div>{experiencesfromlocal?.lastname}</div>
          <button >Submit</button>
        </div>
        <div className='rightside'>
                <Displaycv/>
            </div>
        </div>
      );
}