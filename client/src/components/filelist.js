import React, { useEffect, useState } from 'react';

function FileList() {
  const [files, setFiles] = useState([]);
  const [usedStorage, setUsedStorage] = useState(0);
  const [remainingStorage, setRemainingStorage] = useState(0);

  useEffect(() => {
    fetch('/api/viewfiles')
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files);
        setUsedStorage(data.usedStorage);
        setRemainingStorage(data.remainingStorage);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>File List</h2>
      <p>Used Storage: {usedStorage / (1024 * 1024)} MB</p>
      <p>Remaining Storage: {remainingStorage / (1024 * 1024)} MB</p>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <strong>{file.fileName}</strong> ({file.fileSize / (1024 * 1024)} MB)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
