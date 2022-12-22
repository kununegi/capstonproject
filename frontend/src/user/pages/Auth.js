import React, {useState, useContext} from 'react';
import Card from '../../shared/components/Uelement/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../hook/Form-hook';
import { AuthContext } from '../../shared/context/Authcontext';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators';
import './Auth.css'
const Auth = () => {
    const auth = useContext (AuthContext)
    const [isLogin, setIsLogin] = useState(true);

    const[formState, inputHandler, setFormData] = useForm ({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
        },
        false
         );

        const authSubmitHandler =event=>{
            event.preventDefault();
            console.log(formState.inputs)
            auth.login();            
        }

        const switchModeHandler = event=>{
            if(!isLogin){
             setFormData(
                {
                    ...formState.inputs,
                    name:undefined
             },
             formState.inputs.email.isValid && formState.inputs.password.isValid
             ) ;
            } else{
                setFormData({
                    ...formState.inputs,
                    name:'',
                    isValid:false
                }, 
                false
                );
            }
            setIsLogin(prevMode=>!prevMode);
            
        };

  return (
   
    <Card className="authentication">
        <h2> Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            {isLogin && <Input
            element="input" 
            id="name" 
            type="text"
            label="Your Name" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a Name"
            onInput ={inputHandler}
            />
            }
            <Input 
            element="input" 
            id="email" 
            type="email"
            label="E-Mail" 
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid Email address"
            onInput ={inputHandler}
            />

<Input 
            element="input" 
            id="password" 
            type="password"
            label="Password" 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid password, at least 5 character"
            onInput ={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>{!isLogin ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}> SWITCH TO {!isLogin ? 'SIGNUP' : 'LOGIN'} </Button>
        

    </Card>
    
  )
}

export default Auth
