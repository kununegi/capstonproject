import React from 'react'
import UsersList from '../components/UsersList'

const User = () => {
    const USERS=[{
        id:'u1', 
        name:'Kundan', 
        image:'https://cdn.pixabay.com/photo/2021/12/29/19/08/christmas-6902574_640.jpg',
        places:3
    }]
        
  return (
    <>
    <UsersList items = {USERS} />
    </>   
    
  )
}

export default User
