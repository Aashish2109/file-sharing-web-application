import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {userContext} from "../App"
export default function Logout() {

 const {state,dispatch}=useContext(userContext);
  const navigate = useNavigate();
  const [logoutStart, setlogoutStart] = useState(false);

  const userLogout = async () => {
    try {
      const res = await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (res.status === 200) {
        if (!logoutStart) {
          setlogoutStart(true);
          dispatch({type:"USER",payload:false})
          alert('You have been logged out');
          navigate('/login');
        }
      } else {
        
        throw new Error('Logout Failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userLogout();
  }, []); 

  return <>
    <div>
        
    </div>
  </>;
}