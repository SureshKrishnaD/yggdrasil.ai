import React, { useState } from "react";
import "./Upload.css"; // make sure to update your CSS

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileURL(URL.createObjectURL(uploadedFile));
    }
  };

  const handleBack = () => {
    window.history.back(); // go back to previous page
  };

  return (
    <div className="signup-container">
      {/* Navbar */}
      <div className="navbar">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <div className="nav-links">
          <a href="#">Upload</a>
          <a href="#">Results</a>
          <a href="#">Prediction</a>
          <a href="#">Appointment</a>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <h2 id="main-title">Upload Clinical Document</h2>
        <p id="main-slogan">Attach your file for preview and analysis</p>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileChange}
          className="file-input"
        />

        {file && (
          <div className="preview-box">
            <h4>{file.name}</h4>

            {/* Preview for PDFs & Images */}
            {file.type === "application/pdf" ? (
              <embed
                src={fileURL}
                type="application/pdf"
                className="preview-pdf"
              />
            ) : file.type.startsWith("image/") ? (
              <img src={fileURL} alt="Preview" className="preview-img" />
            ) : (
              <p className="preview-unavailable">
                Preview not available for this file type
              </p>
            )}

            {/* Result Button */}
            <button className="standard-button">Get Result</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
