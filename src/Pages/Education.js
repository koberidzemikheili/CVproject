import '../CSS/Experience.css'
import React, { useContext, useEffect,useState } from "react";
import { UserContext } from '../UserContext';
import { FetchedDegreeContext } from '../FetchedDegreeContext';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import erroricon from '../images/erroricon.png';
import successicon from '../images/successicon.png';
import Displaycv from '../Displaycv';
import axios from 'axios';
import ResetButton from '../ResetButton';
import { FinalDataContext } from '../FinalDataContext';
import {AuthContext} from '../AuthContext';
export default function Education () {
    
    const [Details, setDetails] = useContext(UserContext);
    const [datafromlocal, setDatafromlocal] = useState(JSON.parse(localStorage.getItem("Details")));
    const [fetcheddegree,setFetcheddegree] = useContext(FetchedDegreeContext);
    const [FinalData, setFinalData] = useContext(FinalDataContext);
    const { third,fourth } = useContext(AuthContext);
    const [thirdpageauth, setThirdpageauth] = third;
    const [fourthpageauth, setFourthpageauth] = fourth;
    const [formFields, setFormFields] = useState(
        datafromlocal && datafromlocal.educations
          ? datafromlocal.educations
          : [{institute: '', degree_id: '',due_date:'',description:''}]
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
        setDetails({...JSON.parse(localStorage.getItem("Details")), "educations": formFields});
      }
      //this ueseffect checks if page has auth token set to true and saves Details into localstorage when change is made to it
      useEffect(() => {
        if(!thirdpageauth){
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
          institute: '',
          degree_id: '',
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
      }
      //changes route on submit sets auth token true for next page and saves it to localstorage
      const routeChange = () =>{ 
        let path = '/resume'; 
        navigate(path);
        setFourthpageauth(true);
        localStorage.setItem("fourthpageauth", JSON.stringify(true));
        
      }
      const routeBack = () => {
        let path = '/experience';
        navigate(path);
      }
   
      //turns dataurl format to blob
      function dataURLToBlob() {
        const parts = Details.image.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
      
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
      
        return new Blob([uInt8Array], { type: contentType });
      }

      //replaces dataurl image in Details with blob image
      const handleUpdateImage = (newimg) => {
        setDetails({
          ...Details,
          "image": newimg
        });
      };
      
      

      //sends post request to server
      async function createBlogPost(data) {
        const response = await axios.post('https://resume.redberryinternship.ge/api/cvs', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.status === 201) {
          setFinalData(response.data);
        } else {
          console.log(response);
        }
      }
      
      //when image in details gets replaced with blob instance calls the function which sends post to server
      useEffect(() => {
        if (Details.image instanceof Blob) {
          createBlogPost(Details);
          
        }
      }, [Details]);

      //when finaldata state is changed from undefined to our data that we recieved from server we clear old data and upload new to localstorage and navigate to resume page
      
      useEffect(() => {
        if (typeof FinalData !== "undefined") {
          localStorage.clear();
          localStorage.setItem("FinalData", JSON.stringify(FinalData));
          routeChange();
        }

      }, [FinalData]);
      
      
      //triggers image update 
      const onSubmit =() => {
        handleUpdateImage(dataURLToBlob());
      };

      //previous page button's function
      const onBack = () => {
        routeBack();
      };

       
      //sorry for this spagetti but time was running out and i used first solution that came to my head to remove empty fields which have index more than 0
      const checkforempty =(index)=>{
        if(errors && errors.educations && errors.educations[index] && errors.educations[index].institute && errors.educations[index].institute.type
          && errors.educations[index].degree_id && errors.educations[index].degree_id.type  
          && errors.educations[index].institute.type==='required' && errors.educations[index].degree_id.type==='pattern'
          && errors.educations[index].due_date && errors.educations[index].due_date.type   && errors.educations[index].due_date.type==='required'
          && errors.educations[index].description && errors.educations[index].description.type && errors.educations[index].description.type==='required'){
          removeFields(index) 
        }
      }
      //fetches degrees and sets into state 
      async function fetchData() {
        const data = await fetch(`https://resume.redberryinternship.ge/api/degrees`);
        const data2 = await data.json();
        setFetcheddegree(data2);
    }
    //useeffect for fetchfunction above its rendered once.
    useEffect(() => {
        fetchData();
        
      }, []);
     
    
        
      return (
        <div className="main">
            <div className='leftside'>
                <div className='headline'>განათლება</div>
                <div className='pagenumber'>3/3</div>
                <hr className='firsthr'/>
                <ResetButton />
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
                    <small className='positionsmall'>მინიმუმ 2 სიმბოლო</small>
                    {errors.educations && errors.educations[index] && errors.educations[index].institute ? <img src={erroricon} className='positionerroricon' alt={''}/> : revalidatedData.educations && revalidatedData.educations[index] && revalidatedData.educations[index].institute ? <img src={successicon} className='positionsuccessicon' alt={''}/> : null}
                    
                {/* this triggers the function that checks if additional form is empty */} 
                    {index!==0 &&checkforempty(index) }
                   </div>

          <div className='selectanddatediv'>
        <div className='selectdiv'>
          <label className='positionlabel'>ხარისხი</label>
          {fetcheddegree && fetcheddegree.length > 0 && (
            <select
            className={`selectstyle ${errors.educations && errors.educations[index] 
            && errors.educations[index].degree_id ? "input-error" : revalidatedData.educations && revalidatedData.educations[index]
            && revalidatedData.educations[index].degree_id ? "input-success" : null}`}
            {...register(`educations[${index}].degree_id`, { required: true,pattern: /^(?!none$).{1,}$/, onChange:(event)=> handleFormChange(event, index,'degree_id')})}
            value={formFields[index] && formFields[index].degree_id ? formFields[index].degree_id : "none"}>
            <option value="none" selected disabled hidden>Select an Option</option>
              {fetcheddegree.map((degree, key) => (
            <option key={key} value={degree.id}>
              {degree.title}
            </option>
                ))}
                  </select>
                         )}              
                  </div> 
                  <div className='edudate'>
                  <label className='dateslabel'>დამთავრების რიცხვი</label>
                  <input type="date" name="due_date"
                  placeholder='mm/dd/yy'
                  value={formFields[index] && formFields[index].due_date ? formFields[index].due_date : ""}
                  className={`datesstyle ${errors.educations && errors.educations[index] 
                    && errors.educations[index].due_date ? "input-error" : revalidatedData.educations && revalidatedData.educations[index]
                     && revalidatedData.educations[index].due_date ? "input-success" : null}`}
                  {...register(`educations[${index}].due_date`, { required: true, onChange:(event)=> handleFormChange(event, index,'due_date')})}/>
                  </div>
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
            <div className='submitandbackbuttons2'>
          <button type='submit' className='submitbutton'><div className='submitbuttontext'>დასრულება</div></button>
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