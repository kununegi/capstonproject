import React,{useEffect, useState} from 'react'
import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/Uelement/ErrorModal';
import LoadingSpinner from '../../shared/components/Uelement/LoadingSpinner';
import { useHttpClient } from '../../hook/Http-Hook';

const User = () => {
  
  const {isLoading, error, sendRequest, clearError} = useHttpClient ();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(()=> {
    const fetchUsers = async ()=>{
      
      try{
        const responseData = await sendRequest('http://localhost:4000/api/users');
        
        setLoadedUser(responseData.users);
        
      } catch(err){ }  
      
    };
    fetchUsers();
    
  }, [sendRequest]);

      
  return (
    <>
    <ErrorModal error={error} onClear = {clearError} />
    {isLoading && (<div className='center'>
      <LoadingSpinner />
      </div>)}
    {!isLoading && loadedUser && <UsersList items = {loadedUser} />}
    </>   
    
  )
}

export default User
