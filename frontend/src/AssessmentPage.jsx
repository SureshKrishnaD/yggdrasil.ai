import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AssessmentPage.css";

const AssessmentPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    // Add your backend logic here
  };

  return (
    <div className="assessment-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      {/* Form Container */}
      <div className="form-wrapper">
        <h2 className="form-title">Mental Health Assessment</h2>
        <form className="assessment-form" onSubmit={handleSubmit}>
          <label>Age</label>
          <input type="number" placeholder="Enter your age" required />

          <label>Gender</label>
          <select required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Mood Score (1-10)</label>
          <input type="number" min="1" max="10" placeholder="Enter mood score" required />

          <label>Sleep Quality (1-10)</label>
          <input type="number" min="1" max="10" placeholder="Enter sleep quality" required />

          <label>Physical Activity (hrs/week)</label>
          <input type="number" placeholder="Enter activity level" required />

          <label>Stress Level (1-10)</label>
          <input type="number" min="1" max="10" placeholder="Enter stress level" required />

          <label>Emotional State</label>
          <textarea placeholder="Describe your emotional state" required></textarea>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentPage;