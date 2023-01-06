import React, {useState, useCallback, Suspense} from 'react';
import { BrowserRouter as Routes, Route, Redirect, Switch } from 'react-router-dom'

// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/Uelement/LoadingSpinner';
// import User from './user/pages/User';
// import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/Authcontext';
// import Home from './shared/components/Home';
const User = React.lazy(()=>import('./user/pages/User'));
const NewPlace = React.lazy(()=>import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(()=>import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(()=>import('./places/pages/UserPlaces'));
const Auth = React.lazy(()=>import('./user/pages/Auth'));


function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[userId, setUserId] = useState(false);
  const login = useCallback ((uid)=>{
    setIsLoggedIn(true);
    setUserId(uid);
  },[]);

  const logout = useCallback (()=>{
    setIsLoggedIn(false);
    setUserId(null);

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
      {/* <Route path="/:placeId/places" exact> */}
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
      {/* <Route path="/:userId/places" exact> */}
      <Route path="/places/:userId" exact>
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
    value={{
      isLoggedIn:isLoggedIn ,
      userId:userId, 
      login : login, 
      logout: logout}}>
    <Routes >
      <MainNavigation />
      
      <main> 
        <Suspense fallback ={<div className="center">
          <LoadingSpinner/>
          </div>}>   
        {routes} 
        </Suspense >
           
      </main>
    </Routes>
    </AuthContext.Provider>
    </>
  );
}

export default App;


