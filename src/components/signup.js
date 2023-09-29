import React, { useState } from 'react'
import user1 from '../images/user.png';
import phonecall from '../images/phone-call.png';
import email from '../images/envelope.png';
import work from '../images/briefcase.png';
import password from '../images/key.png'
import signup from '../images/signup.jpg'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Signup.css'


function SignUp() {
  const navigate=useNavigate();
  const [user, setUser] = useState(
    {
      name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    }
  );
  let name,value;
  const handleInputs = (e) => {
    // console.log(e);
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }
  

const PostData=async(e)=>
{
  e.preventDefault();

  const {name, email, phone, work, password, cpassword}=user;
  const response=await fetch('/register',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name, email, phone, work, password, cpassword
    })
  });
  const data=await response.json();
  if(response.status === 422 || !data)
  {
    alert("Invalid Registration / Please check your credentials");
    console.log('Invalid Registration');
  }
  else
  {
    alert("Registration Successful")
    console.log("Registration Successful")

    navigate("/login");
  }
}
  return (
    <>
      <section className='signup'>
        <div className='container'>
          <div className='signup-form'>
            <h2 className='form'>SignUp</h2>
            <form className='register-form' id='register-form' method='POST'>
              <div><label htmlFor='name'>
                <img src={user1} alt='userimage' className='form-images' ></img>
              </label>
                <input type='text' placeholder='enter your full name' id='name' name='name' autoComplete='off' value={user.name} onChange={handleInputs} className='form-input'></input></div>
              <div><label htmlFor='email'>
                <img src={email} alt='userimage' value={user.name} onChange={handleInputs} className='form-images'></img>
              </label>
                <input type='email' placeholder='enter your email' id='email' name='email' autoComplete='off' value={user.email} onChange={handleInputs} className='form-input'></input></div>
              <div><label htmlFor='phone'>
                <img src={phonecall} alt='userimage' value={user.name} onChange={handleInputs} className='form-images'></img>
              </label>
                <input type='tel'  placeholder='enter your phone ' id='phone' name='phone' autoComplete='off' value={user.phone} onChange={handleInputs} className='form-input' ></input></div>
              <div><label htmlFor='work'>
                <img src={work} alt='userimage' value={user.name} onChange={handleInputs} className='form-images'></img>
              </label>
                <input type='text' placeholder='enter your profession' id='work' name='work' autoComplete='off' value={user.work} onChange={handleInputs} className='form-input'></input></div>
              <div><label htmlFor='password'>
                <img src={password} alt='userimage' value={user.name} onChange={handleInputs} className='form-images'></img>
              </label>
                <input type='password' placeholder='enter your password' id='password' name='password' autoComplete='off' value={user.password} onChange={handleInputs} className='form-input'></input></div>
              <div><label htmlFor='cpassword'>
                <img src={password} alt='userimage' value={user.name} onChange={handleInputs} className='form-images'></img>
              </label>
                <input type='password' placeholder='re-enter your password' id='cpassword' name='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs} className='form-input'></input></div>
              <div>
                <input type='submit' value='Register' id='registerbutton' name='cpassword' autoComplete='off' onChange={handleInputs} className='already' onClick={PostData} ></input></div>

            </form>
          </div>
          <div value={user.name} onChange={handleInputs} className='signimage'>
            <figure>
              <img src={signup} alt='signup' value={user.name} onChange={handleInputs} className='signinimage'></img>
            </figure>
            <div value={user.name} onChange={handleInputs} className='already'>
              <NavLink to='/login' id='alreadytext' >Already Registered ???</NavLink>
            </div>
          </div>


        </div>


      </section>
    </>

  )
}

export default SignUp