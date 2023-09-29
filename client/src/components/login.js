import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import email1 from '../images/envelope.png';
import password1 from '../images/key.png'
import login from '../images/login.jpg';
import {userContext} from "../App"
import './Signup.css'
function Login() {
  const {state,dispatch}=useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    if (response.status === 400) {
      alert("Invalid Credentials");
    }else if(response.status === 404)
    {
     alert("Failed to sign in"); 
    }else {
      const data = await response.json(); // Await the response to get the actual data
      if (response.status===422 || !data) {
        alert("Invalid Credentials");
      } else {
        dispatch({type:"USER",payload:true})
        alert("Login Successful");
        navigate("/home");
      }
    }
  }
  return (
    <>
      <section className='signup'>
        <div className='container'>
          <div className='signup-form'>
            <h2 className='form'>Sign In</h2>
            <form method='POST' className='register-form' id='register-form'>

              <div><label htmlFor='email'>
                <img src={email1} alt='userimage' className='form-images'></img>
              </label>
                <input type='email' placeholder='enter your email' value={email}
                  onChange={(e) => setEmail(e.target.value)} id='email' name='email' autoComplete='off' className='form-input'></input></div>

              <div><label htmlFor='password'>
                <img src={password1} alt='userimage' className='form-images'></img>
              </label>
                <input type='password' placeholder='enter your password' value={password}
                  onChange={(e) => setPassword(e.target.value)} id='password' name='password' autoComplete='off' className='form-input'></input></div>
              <div>
                <input type='submit' value='Log In' id='registerbutton' onClick={LoginUser} name='cpassword' autoComplete='off' className='already' ></input>
              </div>

            </form>
          </div>
          <div className='signimage'>
            <figure>
              <img src={login} alt='signup' className='signinimage'></img>
            </figure>
            <div className='already'>
              <NavLink to='/signup' id='alreadytext' >Create an Account</NavLink>
            </div>
          </div>


        </div>


      </section>
    </>
  )
}

export default Login