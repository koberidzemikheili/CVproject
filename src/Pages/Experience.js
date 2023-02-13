import '../CSS/Experience.css'
import React, { useContext, useEffect,useState } from "react";
import { UserContext } from '../UserContext';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import erroricon from '../images/erroricon.png';
import successicon from '../images/successicon.png';
import Displaycv from '../Displaycv';
import ResetButton from '../ResetButton';
import {AuthContext} from '../AuthContext';
export default function Experience () {

    const [Details, setDetails] = useContext(UserContext);
    const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
    const { second, third } = useContext(AuthContext);
    const [thirdpageauth, setThirdpageauth] = third;
    const [secondpageauth, setSecondpageauth] = second;
    const [formFields, setFormFields] = useState(
        datafromlocal && datafromlocal.experiences
          ? datafromlocal.experiences
          : [{position: '', employer: '',start_date: '',due_date:'',description:''}]
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
      //handlechange sets input data into Details change of which triggers useeffect to store in localstorage
      const handleChange = () => {
        setDetails({...JSON.parse(localStorage.getItem("Details")), "experiences": formFields});
      }
      //this ueseffect checks if page has auth token set to true and saves Details into localstorage when change is made to it
      useEffect(() => {
        if(!secondpageauth){
          navigate(-1);
        }
        if (typeof Details !== "string") {
          localStorage.setItem("Details", JSON.stringify(Details));
          ;
        }
      }, [Details]);

      //takes out data from localstorage so we can display them in input values and they are not lost after refresh
      useEffect(() => {
        setDatafromlocal(JSON.parse(localStorage.getItem("Details")));
    }, [Details]);

   
    //creates new form
      const addFields = () => {
        let object = {
          position: '',
          employer: '',
          start_date: '',
          due_date:'',
          description: '',
        }
    
        setFormFields([...formFields, object])
      }
    //removes fields its used to remove empty fields on submit click its called later in submit
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
        setDetails({
          ...datafromlocal,
          "experiences": data
        });
      }

      //changes route on submit sets auth token true for next page and saves it to localstorage
      const routeChange = () =>{ 
        let path = `/education`; 
        navigate(path);
        setThirdpageauth(true);
      localStorage.setItem("thirdpageauth", JSON.stringify(true));
        
      }
      const routeBack = () => {
        let path = '/personalinfo';
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
        if(errors && errors.experiences && errors.experiences[index] && errors.experiences[index].position && errors.experiences[index].position.type
          && errors.experiences[index].employer && errors.experiences[index].employer.type  
          && errors.experiences[index].position.type==='required' && errors.experiences[index].employer.type==='required'
          && errors.experiences[index].start_date && errors.experiences[index].start_date.type
          && errors.experiences[index].due_date && errors.experiences[index].due_date.type  
          && errors.experiences[index].start_date.type==='required' && errors.experiences[index].due_date.type==='required'
          && errors.experiences[index].description && errors.experiences[index].description.type && errors.experiences[index].description.type==='required'){
          removeFields(index) 
        }
      }
      
      

      return (
        <div className="main">
            <div className='leftside'>
                <div className='headline'>გამოცდილება</div>
                <div className='pagenumber'>2/3</div>
                <hr className='firsthr'/>
                <ResetButton />
                <form onSubmit={handleSubmit(onSubmit)}>
            <div  className='heightsetterforform'>
           
            {formFields.map((form, index) => {
              return (
                <div key={form.id} className='maindivforexperienceinputs'>
                  <div className='positioninputdiv'>
                    <label className='positionlabel'>თანამდებობა</label>
                  <input
                    type='text'
                    placeholder='თანამდებობა'
                    value={formFields[index] && formFields[index].position ? formFields[index].position : ""}
                    className={`positioninput ${errors.experiences && errors.experiences[index] 
                    && errors.experiences[index].position ? "input-error" : revalidatedData.experiences && revalidatedData.experiences[index]
                     && revalidatedData.experiences[index].position ? "input-success" : null}`}
                    {...register(`experiences[${index}].position`, { required: true, pattern:/^.{3,}$/, onChange:(event)=> handleFormChange(event, index,'position')})}/>
                    <small className='positionsmall'>მინიმუმ 2 სიმბოლო</small>
                    {errors.experiences && errors.experiences[index] && errors.experiences[index].position ? <img src={erroricon} className='positionerroricon' alt={''}/> : revalidatedData.experiences && revalidatedData.experiences[index] && revalidatedData.experiences[index].position ? <img src={successicon} className='positionsuccessicon' alt={''}/> : null}
              {/* this triggers the function that checks if additional form is empty */}
                    {index!==0 &&checkforempty(index)}
                   </div>

                   <div className='positioninputdiv'>
                    <label className='positionlabel'>დამსაქმებელი</label>
                  <input
                    
                    type='text'
                    placeholder='დამსაქმებელი'
                    value={formFields[index] && formFields[index].employer ? formFields[index].employer : ""}
                    className={`positioninput ${errors.experiences && errors.experiences[index] 
                      && errors.experiences[index].employer ? "input-error" : revalidatedData.experiences && revalidatedData.experiences[index]
                       && revalidatedData.experiences[index].employer ? "input-success" : null}`}
                       {...register(`experiences[${index}].employer`, { required: true, pattern:/^.{3,}$/, onChange:(event)=> handleFormChange(event, index,'employer')})}/>
                       <small className='positionsmall'>მინიმუმ 2 სიმბოლო</small>
                    {errors.experiences && errors.experiences[index] && errors.experiences[index].employer ? <img src={erroricon} className='positionerroricon' alt={''}/> : revalidatedData.experiences && revalidatedData.experiences[index] && revalidatedData.experiences[index].employer ? <img src={successicon} className='positionsuccessicon' alt={''}/> : null}
                  
                  </div>

                  <div className='datesinrow'>
                  <div className='datesdiv'>
                  <label className='dateslabel'>დაწყების რიცხვი</label>
                  <input type="date" name="start_date"
                  placeholder='mm/dd/yy'
                  value={formFields[index] && formFields[index].start_date ? formFields[index].start_date : ""}
                  className={`datesstyle ${errors.experiences && errors.experiences[index] 
                    && errors.experiences[index].start_date ? "input-error" : revalidatedData.experiences && revalidatedData.experiences[index]
                     && revalidatedData.experiences[index].start_date ? "input-success" : null}`}
                  {...register(`experiences[${index}].start_date`, { required: true, onChange:(event)=> handleFormChange(event, index,'start_date')})}/>
                  </div>

                  <div className='datesdiv'>
                  <label className='dateslabel'>დამთავრების რიცხვი</label>
                  <input type="date" name="due_date"
                  placeholder='mm/dd/yy'
                  value={formFields[index] && formFields[index].due_date ? formFields[index].due_date : ""}
                  className={`datesstyle ${errors.experiences && errors.experiences[index] 
                    && errors.experiences[index].due_date ? "input-error" : revalidatedData.experiences && revalidatedData.experiences[index]
                     && revalidatedData.experiences[index].due_date ? "input-success" : null}`}
                  {...register(`experiences[${index}].due_date`, { required: true, onChange:(event)=> handleFormChange(event, index,'due_date')})}/>
                  </div>
                  </div>

                    <div className='descriptiondiv'>
                      <label className='labeldescription'>აღწერა</label>
                    <textarea
                    placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'
                    value={formFields[index] && formFields[index].description ? formFields[index].description : ""}
                    className={`descriptionstyle ${errors.experiences && errors.experiences[index] 
                      && errors.experiences[index].description ? "input-error" : revalidatedData.experiences && revalidatedData.experiences[index]
                       && revalidatedData.experiences[index].description ? "input-success" : null}`}
                    {...register(`experiences[${index}].description`, { required: true, onChange:(event)=> handleFormChange(event, index,'description')})}/>
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