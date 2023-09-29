import React, {useState} from 'react'

export default function Fileupload() 
{
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      // Capture the selected file from the input element
      const file = e.target.files[0];
      setSelectedFile(file);
    };
  
    const uploadFile = async () => {
      try {
        if (!selectedFile) {
          return alert('Please select a file to upload.');
        }
  
        // Create a FormData object and append the selected file to it
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        const response = await fetch('/uploadfile', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          alert('File uploaded successfully.');
        } else {
          alert('Failed to upload file.');
        }
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('An error occurred while uploading the file.');
      }
    };

        return (
            <>
                <div>
                    Please Upload Your File
                </div>
                <input type='file' placeholder='upload'
                    onChange={handleFileChange}
                />
                <input type='button' value='submit' name='Click Here' onClick={uploadFile} />
            </>
        )
    }
