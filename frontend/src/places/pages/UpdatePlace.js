import React,{useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import { useForm } from '../../hook/Form-hook';
import LoadingSpinner from '../../shared/components/Uelement/LoadingSpinner';
import Card from '../../shared/components/Uelement/Card';
import { useHttpClient } from '../../hook/Http-Hook';
import ErrorModal from '../../shared/components/Uelement/ErrorModal';
import { AuthContext } from '../../shared/context/Authcontext';
import './NewPlace.css'  

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest,clearError} =  useHttpClient();
    const [loadedPlace, setLoadedPlaces] = useState ();
    const placeId = useParams().placeId;
    const history = useHistory ();
    
        
        const [formState, inputHandler, setFormData] = useForm({
            title:{
                value: '',
                isValid : false
            },
            description : {
                value:'',
                isValid: false
            }
        },
        false
        )

        useEffect (()=> {
            const fetchPlace = async ()=>{
                try {
                    const responseData = await  sendRequest (`http://localhost:4000/api/places/${placeId}`
                    );
                    setLoadedPlaces(responseData.place);
                    setFormData(
                        {
                            title:{
                                value: responseData.place.title,
                                isValid : true
                            },
                            description : {
                                value:responseData.place.description,
                                isValid: true
                            }
                        },
                        true);
                } catch (err)  {}
              
            }
            fetchPlace();
        },[sendRequest,placeId, setFormData])
        
                
        const placeUpdateSubmitHandler = async event =>{
            event.preventDefault();
            try {
                await sendRequest(`http://localhost:4000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title:formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type':'application/json'
                });
                history.push('/' + auth.userId+ '/places')              

            } catch (err) {}
            
          
        };

        if (isLoading){
            return (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )
        }

  if(!loadedPlace && !error){
    return (
    <div className='center'> 
    <Card>
    <h2> Could not find place </h2>
    </Card>
    </div>
  );
}

    return (
       <>
       <ErrorModal error = {error} onClear = {clearError} />
   {!isLoading && loadedPlace && ( <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
    <Input  
    id="title" 
    element="input" 
    type="text"
    label="Title"
    validators ={[VALIDATOR_REQUIRE()]}
    errorText= "Please enter a valid title"
    onInput ={inputHandler}
    value={loadedPlace.title}
    valid ={true}
    />

<Input  
    id="description" 
    element="textarea" 
    label="Description"
    validators ={[VALIDATOR_MINLENGTH(5)]}
    errorText= "Please enter a valid description (min 5 character)."
    onInput ={inputHandler}
    value={loadedPlace.description}
    valid ={true}
    />
    <Button type="submit" disabled={!formState.isValid}> UPDATE PLACE</Button> 
   </form> )}
      
   </>
  )
    }

export default UpdatePlace
