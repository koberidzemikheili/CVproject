import '../CSS/Experience.css'
import React, { useContext, useEffect,useState } from "react";
import { UserContext } from '../UserContext';
import { FetchedDegreeContext } from '../FetchedDegreeContext';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import erroricon from '../images/erroricon.png';
import successicon from '../images/successicon.png';
import Displaycv from '../Displaycv';
export default function Education () {
    
    const [Details, setDetails] = useContext(UserContext);
    const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
    const [fetcheddegree,setFetcheddegree] = useContext(FetchedDegreeContext);
    const [formFields, setFormFields] = useState(
        datafromlocal && datafromlocal.educations
          ? datafromlocal.educations
          : [{institute: '', degree: '',due_date:'',description:''}]
      );
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
      //handleformchange takes event and index from input that is mapped and saves data in setFormFields. in the end calls handlechange
      const handleFormChange = (event, index,name) => {
        let data = [...formFields];
        data[index][name] = event.target.value;
        setFormFields(data);
        handleChange();
      }
    
      const handleChange = () => {
        setDetails({...JSON.parse(localStorage.getItem("Details")), "educations": formFields});
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

   
    
      const addFields = () => {
        let object = {
          institute: '',
          degree: '',
          due_date:'',
          description: '',
        }
    
        setFormFields([...formFields, object])
      }
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }
      const routeChange = () =>{ 
        let path = `/education`; 
        navigate(path);
        
      }
      const routeBack = () => {
        let path = '/experience';
        navigate(path);
      }
   
      const onSubmit = () => {
        routeChange();
      };
      const onBack = () => {
        routeBack();
      };
      //sorry for this spagetti but time was running out and i used first solution that came to my head to remove empty fields which have index more than 0
      const checkforempty =(index)=>{
        if(errors && errors.educations && errors.educations[index] && errors.educations[index].institute && errors.educations[index].institute.type
          && errors.educations[index].degree && errors.educations[index].degree.type  
          && errors.educations[index].institute.type==='required' && errors.educations[index].degree.type==='pattern'
          && errors.educations[index].due_date && errors.educations[index].due_date.type   && errors.educations[index].due_date.type==='required'
          && errors.educations[index].description && errors.educations[index].description.type && errors.educations[index].description.type==='required'){
          removeFields(index) 
        }
      }
      async function fetchData() {
        const data = await fetch(`https://resume.redberryinternship.ge/api/degrees`);
        const data2 = await data.json();
        setFetcheddegree(data2);
    }
    useEffect(() => {
        fetchData();
        
      }, []);
     
    
        
      return (
        <div className="main">
            <div className='leftside'>
                <div className='headline'>განათლება</div>
                <div className='pagenumber'>3/3</div>
                <hr className='firsthr'/>
                <form onSubmit={handleSubmit(onSubmit)}>
            <div  className='heightsetterforform'>
           
            {formFields.map((form, index) => {
              return (
                <div key={form.id} className='maindivforexperienceinputs'>
                  <div className='positioninputdiv'>
                    <label className='positionlabel'>სასწავლებელი</label>
                  <input
                    type='text'
                    placeholder='სასწავლებელი'
                    value={formFields[index] && formFields[index].institute ? formFields[index].institute : ""}
                    className={`positioninput ${errors.educations && errors.educations[index] 
                    && errors.educations[index].institute ? "input-error" : revalidatedData.educations && revalidatedData.educations[index]
                     && revalidatedData.educations[index].institute ? "input-success" : null}`}
                    {...register(`educations[${index}].institute`, { required: true, pattern:/^.{3,}$/, onChange:(event)=> handleFormChange(event, index,'institute')})}/>
                    {errors.educations && errors.educations[index] && errors.educations[index].institute ? <img src={erroricon} className='positionerroricon' alt={''}/> : revalidatedData.educations && revalidatedData.educations[index] && revalidatedData.educations[index].position ? <img src={successicon} className='institutesuccessicon' alt={''}/> : null}
                    
                    {index!==0 &&checkforempty(index) }

                  <small className='positionsmall'>მინიმუმ 2 სიმბოლო</small>
                   </div>

                   <div className='positioninputdiv'>
  <label className='positionlabel'>დამსაქმებელი</label>
  {fetcheddegree && fetcheddegree.length > 0 && (
    <select
      placeholder='rame'
      className={`positioninput ${errors.educations && errors.educations[index] 
        && errors.educations[index].degree ? "input-error" : revalidatedData.educations && revalidatedData.educations[index]
        && revalidatedData.educations[index].degree ? "input-success" : null}`}
      {...register(`educations[${index}].degree`, { required: true,pattern: /^(?!none$).{1,}$/, onChange:(event)=> handleFormChange(event, index,'degree')})}
      value={formFields[index] && formFields[index].degree ? formFields[index].degree : "none"}
    >
      <option value="none" selected disabled hidden>Select an Option</option>
      {fetcheddegree.map((degree, key) => (
        <option key={key} value={degree.id}>
          {degree.title}
        </option>
      ))}
    </select>
  )}
                    
</div> 


                  <div className='datesdiv'>
                  <label className='dateslabel'>დამთავრების რიცხვი</label>
                  <input type="date" name="due_date"
                  placeholder='mm/dd/yy'
                  value={formFields[index] && formFields[index].due_date ? formFields[index].due_date : ""}
                  className={`datesstyle ${errors.educations && errors.educations[index] 
                    && errors.educations[index].due_date ? "input-error" : revalidatedData.educations && revalidatedData.educations[index]
                     && revalidatedData.educations[index].due_date ? "input-success" : null}`}
                  {...register(`educations[${index}].due_date`, { required: true, onChange:(event)=> handleFormChange(event, index,'due_date')})}/>
                  </div>
                 

                    <div className='descriptiondiv'>
                      <label className='labeldescription'>აღწერა</label>
                    <textarea
                    placeholder='განათლების აღწერა'
                    value={formFields[index] && formFields[index].description ? formFields[index].description : ""}
                    className={`descriptionstyle ${errors.educations && errors.educations[index] 
                      && errors.educations[index].description ? "input-error" : revalidatedData.educations && revalidatedData.educations[index]
                       && revalidatedData.educations[index].description ? "input-success" : null}`}
                    {...register(`educations[${index}].description`, { required: true, onChange:(event)=> handleFormChange(event, index,'description')})}/>
                  </div>
                  {formFields.length > 1 && <hr className='lasthr'/>}
                </div>
              )})
            }
            <button  className='addfieldsbutton' type='button' onClick={addFields}><div className='addfieldsbuttontext'>მეტი გამოცდილების დამატება</div></button>
            <div className='submitandbackbuttons'>
          <button type='submit' className='submitbutton'><div className='submitbuttontext'>შემდეგი</div></button>
          <button type='button' className='backbutton' onClick={onBack}><div className='submitbuttontext'>უკან</div></button>
          </div>
            </div>
          </form>
        </div>
        <div className='rightside'>
                <Displaycv/>
            </div>
        </div>
      );
}