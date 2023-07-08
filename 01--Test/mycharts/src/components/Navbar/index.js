import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { googleLogout } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import {  useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
 
const Navbar = () => {
	
	const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
		
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
   
    useEffect(
        () => {
			
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
						
                        setProfile(res.data);
						this.props.profile = res.data;
						
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
 
  return (
  
   <div align="center">
  
	
		{profile ? (
			
				
				<React.Fragment>
					<>
					<Nav>
						<Bars />
				  
						<NavMenu>
						  <NavLink to='/samplefiles' activeStyle>
							Sample Files
						  </NavLink>
						  <NavLink to='/uploadfiles' activeStyle>
							Upload Files
						  </NavLink>
						  <NavLink to='/quotas' activeStyle>
							Quotas
						  </NavLink>
						 
						</NavMenu>
						
						<NavBtn>
						  <NavBtnLink onClick={() => logOut()} >Logout {profile.name}</NavBtnLink>
						</NavBtn>
					  </Nav>
					   </>
				</React.Fragment>
	  
	  ) : (
                <button onClick={() => login()}>Sign in with Google</button>
		)}
            
    </div>
		
   
  );
};
  
export default Navbar;




