import React, {useContext}  from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../components/Upload';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import { VALIDATOR_MINLENGTH } from '../../shared/Util/Validators';
import { useForm } from '../../hook/Form-hook';
import { useHttpClient } from '../../hook/Http-Hook';
import { AuthContext } from '../../shared/context/Authcontext';
import ErrorModal from '../../shared/components/Uelement/ErrorModal';
import LoadingSpinner from '../../shared/components/Uelement/LoadingSpinner';
import './NewPlace.css'
const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading,error,  sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
    title:{
      value:'',
      isValid:false
    },
    description:{
      value:'',
      isValid:false
    },
    address:{
      value:'',
      isValid:false
    },
    image:{
      value:null,
      isValid:false

    }
  },    
  false
  );

  const history = useHistory();

  const placeSubmitHandler = async event =>{
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value);
      formData.append('description',formState.inputs.description.value);
      formData.append('address',formState.inputs.address.value);
      formData.append('creator',auth.userId);
      formData.append('image',formState.inputs.image.value);
      
      await sendRequest(
        'http://localhost:4000/api/places', 
        'POST', formData
          
        );
    history.push('/')
    } catch (err){}
  }
 
  return (
    <React.Fragment>  
   <ErrorModal error ={error} onClear = {clearError} />
    <form className='place-form' onSubmit={placeSubmitHandler}>
     { isLoading && < LoadingSpinner asOverlay />}
      <Input 
      id="title"
      element="input" 
      type="text" 
      label="Title" 
      validators ={[VALIDATOR_REQUIRE()]} 
      errorText ="Please enter a valid title"
      onInput={inputHandler}
      />     
     <Input 
     id ="description"
     element="textarea"        
      label="Description" 
      validators ={[VALIDATOR_MINLENGTH(5)]} 
      errorText ="Please enter a valid description (at least 5 characters). "
      onInput={inputHandler}
      />

<Input 
     id ="address"
     element="input"        
      label="Address" 
      validators ={[VALIDATOR_REQUIRE()]} 
      errorText ="Please enter a valid Address. "
      onInput={inputHandler}
      />
      <ImageUpload 
      id="image"
      onInput={inputHandler}
      errorText="Please provide an image"
      />

       <Button type="submit" disabled={!formState.isValid} >ADD PLACE</Button>  
    </form>
    </React.Fragment>
    
  )
}

export default NewPlace


