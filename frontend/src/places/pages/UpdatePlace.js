import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import { useForm } from '../../hook/Form-hook';
import Card from '../../shared/components/Uelement/Card';

const DUMMY_PLACES =[
    {
        id:'pl',
        title:'Emipre State building',
        description:'One of the famouns building in the world',
        image:'https://cdn.pixabay.com/photo/2022/12/06/05/57/branch-7638340_960_720.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location:{
            lat:40.7478496,
            lng:-73.9894482
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Emipre State building',
        description:'One of the famouns building in the world',
        image:'https://cdn.pixabay.com/photo/2022/12/06/05/57/branch-7638340_960_720.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location:{
            lat:40.7478496,
            lng:-73.9894482
        },
        creator:'u2'
    },
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading]  = useState(true);
    const placeId = useParams().placeId;
        
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
        const identifiedPlace = DUMMY_PLACES.find(p=>p.id ===placeId);    
        useEffect(()=>{
            if (identifiedPlace){

            
            setFormData(
                {
                    title:{
                        value: identifiedPlace.title,
                        isValid : true
                    },
                    description : {
                        value:identifiedPlace.description,
                        isValid: true
                    }
                },
                true);
            }
                setIsLoading(false);
    
        }, [setFormData, identifiedPlace])
        
        
        const placeUpdateSubmitHandler = event =>{
            event.preventDefault()
            console.log(formState.inputs)
        };
  if(!identifiedPlace){
    return (
    <div className='center'> 
    <Card>
    <h2> Could not find place </h2>
    </Card>
    </div>
  );
}
if (isLoading){
    return (
        <div className='center'>
            <h2> Loading .....</h2>
        </div>
    )
}
    return (
   <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
    <Input  
    id="title" 
    element="input" 
    type="text"
    label="Title"
    validators ={[VALIDATOR_REQUIRE()]}
    errorText= "Please enter a valid title"
    onInput ={inputHandler}
    value={formState.inputs.title.value}
    valid ={formState.inputs.title.isValid}
    />

<Input  
    id="description" 
    element="textarea" 
    label="Description"
    validators ={[VALIDATOR_MINLENGTH(5)]}
    errorText= "Please enter a valid description (min 5 character)."
    onInput ={inputHandler}
    value={formState.inputs.description.value}
    valid ={formState.inputs.description.isValid}
    />
    <Button type="submit" disabled={!formState.isValid}> UPDATE PLACE</Button> 
   </form>
      
    
  )
    }

export default UpdatePlace
