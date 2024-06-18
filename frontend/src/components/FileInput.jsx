import React, { useState, useRef, useEffect } from 'react';

const FileInput = ({ label, onChange, accept, className, initialFileName, ...props }) => {
  const [selectedFileName, setSelectedFileName] = useState(initialFileName || '');
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file ? file.name : ''); // Update the selected file name
    onChange(file);
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
      setSelectedFileName(''); // Clear the selected file name state
      onChange(null); // Call the onChange handler with null to indicate no file selected
    }
  };

  // Update file name when initialFileName changes
  // useEffect(() => {
  //   setSelectedFileName(initialFileName || '');
  // }, [initialFileName]);
  

  return (
    <div className={`file-input ${className}`}>
      {label && <label className="file-input__label">{label}</label>}
      <div className="file-input__container">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept={accept}
          className="file-input__input"
          {...props}
        />

        {/* <button type="button" onClick={handleClear}>
          Clear
        </button> */}
      </div>
    </div>
  );
};

export default FileInput;
