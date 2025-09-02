import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Result.css";

const Result = () => {
  
  const [mlResult, setMlResult] = useState("Loading results...");

 
  useEffect(() => {
    setTimeout(() => {
      setMlResult("prediction from the model");
    }, 1500);
  }, []);

  return (
    <div className="result-container">
      {/* Navbar */}
      <nav className="result-navbar">
        <button>Upload</button>
        <button>Prediction</button>
        <button>Result</button>
        <button>Appointment Booking</button>
      </nav>

      {/* Back button */}
      <button className="back-button">
        <FaArrowLeft /> Back
      </button>

      {/* Card */}
      <div className="result-card">
        <h2 className="result-title">Result</h2>

        {/* Read-only textarea */}
        <textarea
          value={mlResult}
          readOnly
          className="result-textarea"
        ></textarea>

        <div className="result-buttons">
          <button className="download-btn">Download</button>
          <button className="next-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Result;