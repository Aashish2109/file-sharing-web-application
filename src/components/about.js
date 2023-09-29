import React, { useEffect, useState } from 'react';
// import Viewfile from './viewfile'; 
import './About.css';
import { useNavigate } from 'react-router-dom';
import Aashish from '../images/Aashish.jpg';

export default function About() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  // const [showViewFiles, setShowViewFiles] = useState(false);

  useEffect(() => {
    let response;
    const callAboutUs = async () => {
      try {
         response = await fetch('/about', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await response.json();
        console.log(data);
        setUserData(data);
        if (response.status !== 200) {
          const error = new Error(response.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        console.log('Response:', response); // Add this line to log the response
        navigate('/login');
      }
    };
    callAboutUs();
  }, [navigate]);

  
  // Function to handle the click of "View Files" button
//   const handleViewFilesClick = (e) => {

//     e.preventDefault();
//     setShowViewFiles(!showViewFiles);
//   };
//   const handleFileDownload = (filePath, originalName) => {
//   fetch(`/download/${filePath}`)
//   .then((response) => response.blob())
//   .then((blob) => {
//     // Create a URL for the blob and simulate a download link click
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = originalName;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   })
//   .catch((error) => {
//     console.error('Error downloading file:', error);
//   });
// };

    
  return (
    <>
      {userData && (
        <div className='aboutcontainer'>
          <div className='container-items'> {/* Apply the 'container-items' class here */}
            <form method='GET'>
              <div className='maincontainer'>
                <div className='myimg'>
                  <img src={Aashish} alt="myimage"></img>
                </div>
                <div>
                  <h2>{userData.name}</h2>
                  <h2>{userData.work}</h2>
                  {/* <button onClick={handleViewFilesClick}>Viewfile </button>
                  {showViewFiles && <Viewfile handleFileDownload={handleFileDownload} />} */}



                </div>
              </div>
              <div className='maincontainer1'>
                <div>
                  <h2>User ID:</h2>
                  <h2>Name:</h2>
                  <h2>Email:</h2>
                  <h2>Phone:</h2>
                  <h2>Profession:</h2>
                </div>
                
                <div>
                  <h2>{userData._id}</h2>
                  <h2>{userData.name}</h2>
                  <h2>{userData.email}</h2>
                  <h2>{userData.phone}</h2>
                  <h2>{userData.work}</h2>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}