import React, {useState, useCallback} from 'react';
import { BrowserRouter as Routes, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import User from './user/pages/User';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/Authcontext';



function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback (()=>{
    setIsLoggedIn(true)
  },[]);

  const logout = useCallback (()=>{
    setIsLoggedIn(false)
  },[]);

  let routes;

  if (isLoggedIn){
    routes =(
      <Switch>
      <Route path="/" exact>
         <User /> 
         </Route>
      <Route path="/:userId/places" exact>
         <UserPlaces /> 
         </Route>
         <Route path="/places/new" exact> 
         <NewPlace />
          </Route>
      <Route path="/places/:placeId" exact>
         <UpdatePlace />
         </Route>
      <Redirect to="/" />
      </Switch>
    );
  }else{
    routes =(
      <Switch>
      <Route path="/" exact>
         <User /> 
         </Route>
      <Route path="/:userId/places" exact>
         <UserPlaces /> 
         </Route>
      <Route path="/auth" exact>
         <Auth />
          </Route>
      <Redirect to="/auth" />
      </Switch>
    )

  };


  return (
    <>
    <AuthContext.Provider 
    value={{isLoggedIn: isLoggedIn, login : login, logout: logout}}>
    <Routes >
      <MainNavigation />
      <main>    
        {routes} 
           
      </main>
    </Routes>
    </AuthContext.Provider>
    </>
  );
}

export default App;


