import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../Uelement/Backdrop'
import Header from './Header'
import './mainnavigation.css'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'

const MainNavigation = props => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer =()=>{
        setDrawerOpen(true);
    };
    const closeDrawer =()=>{
        setDrawerOpen(false);
    };
  return (
    <>
    {drawerOpen && <Backdrop onClick={openDrawer}/>}
  
    <SideDrawer show ={drawerOpen} onClick={closeDrawer}>
        <nav className='main-navigation__drawer-nav'>
            <NavLinks />
        </nav>
    </SideDrawer> 
   
    <Header>
      <button className='main-navigation__menu-btn' onClick = {openDrawer}>
        <span/>
        <span/>
        <span/>
        </button>  
        <h1 className='main-navigation__title'>
            <Link to="/"> For Nature Lovers - NALO  </Link>
            </h1> 
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
    </Header>
    </>
    
  )
}

export default MainNavigation
