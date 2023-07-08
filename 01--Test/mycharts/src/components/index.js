import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/samplefiles' activeStyle>
            Sample Files 1
          </NavLink>
          <NavLink to='/uploadfiles' activeStyle>
            Upload Files 1
          </NavLink>
          <NavLink to='/quotas' activeStyle>
            Quotas 1
          </NavLink>
         
        </NavMenu>
      
        <NavBtn>
          <NavBtnLink onclick="logOut()" to='/'>Logout {profile.name} </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;




