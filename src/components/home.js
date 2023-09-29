import React, { useEffect, useState } from 'react'
import Fileupload from './fileupload';
import './Home.css';
export default function Home() {
  const [userName, setuserName] = useState('');
  const [show,setShow]=useState(false);
  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
      const data = await res.json();
      console.log(data);
      setuserName(data.name);
      setShow(true);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    userHomePage();
  }, []);
  return (

    <>
      <div className='main-heading'>
        <p>Welcome</p>
        <h1>{userName}</h1>
        <h2>{show?'Happy, to  see you back':'To The File Sharing Application'}</h2>
        <h2>{<Fileupload/>}</h2>
      </div>
    </>

  )
}
