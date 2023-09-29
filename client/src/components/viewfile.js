import React, { useState, useEffect } from 'react';

export default function Viewfile({ handleFileDownload }) 
{
  const [filesList, setFilesList] = useState([]);

  useEffect(() => 
  {
    // Function to fetch the list of uploaded files from the backend
    const fetchFiles = async () => 
    {
      try 
      {
        const response = await fetch('/viewfiles');
        const data = await response.json();
        setFilesList(data.files);
      } catch (error) 
      {
        console.error('Error fetching files:', error);
      }
    };

    // Call the fetchFiles function to get the files list when the component mounts
    fetchFiles();
  }, []);
return (
  <>
    <div>View Files</div>
    <ul>
      {filesList && filesList.map((file) => (
        <li key={file.fileName}>
          <p>User Name: {file.userName}</p>
          <p>User Email: {file.userEmail}</p>
          <p>File Name: {file.fileName}</p>
          <p>File Path: {file.filePath}</p>
          <p>Original Name: {file.originalName}</p>
          {file.filePath ? (
            <>
              {file.filePath.match(/\.(jpg|jpeg|png)$/) ? (
                <img src={`http://localhost:3000/${file.filePath}`} alt="Uploaded file" />
              ) : (
                <p>This file type is not supported. </p>
              )}
              <button onClick={() => handleFileDownload(file.filePath, file.originalName)}>Download {file.originalName}</button>
            </>
          ) : (
            <p>No file path available for download.</p>
          )}
          <hr />
        </li>
      ))}
    </ul>
  </>
);
}
