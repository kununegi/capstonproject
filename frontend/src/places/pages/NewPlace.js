import React  from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import { VALIDATOR_MINLENGTH } from '../../shared/Util/Validators';
import { useForm } from '../../hook/Form-hook';



const NewPlace = () => {
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
    }
  },    
  false
  );
  // inputHandler = useCallback((id, value, isValid) =>{
  // //   dispatch({
  //     type:'INPUT_CHANGE', 
  //     value:value, 
  //     isValid:isValid, 
  //     inputId:id})
  // }, []);
  const placeSubmitHandler = event =>{
    event.preventDefault();
    console.log(formState.inputs); // send this data to back end
  }
 
  return (
    <>   
   
    <form className='place-form' onSubmit={placeSubmitHandler}>
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
       <Button type="submit" disabled={!formState.isValid} >ADD PLACE</Button>  
    </form>
    </>
    
  )
}

export default NewPlace


