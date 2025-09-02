import React from "react";
import { FaArrowLeft, FaMicrophone, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Test.css";

const Test = () => {
  const navigate = useNavigate();

  return (
    <div className="test-page">
      {/* Back button (pill, top-left) */}
      <button className="back-pill" onClick={() => navigate(-1)}>
        <FaArrowLeft /> <span>Back</span>
      </button>

      {/* Heading */}
      <div className="test-header">
        <h1 className="test-title">Choose Your Test</h1>
        <p className="test-subtitle">Pick a mode to continue</p>
      </div>

      {/* Two cards */}
      <div className="test-grid">
        <div className="feature-card">
          <div className="icon-wrap mic">
            <FaMicrophone />
          </div>
          <h3 className="card-title">Voice Assistant</h3>
          <p className="card-text">
            Talk to our AI assistant and complete the assessment hands-free.
          </p>
          <button className="take-btn">Take Test</button>
        </div>

        <div className="feature-card">
          <div className="icon-wrap qa">
            <FaQuestionCircle />
          </div>
          <h3 className="card-title">Q&amp;A</h3>
          <p className="card-text">
            Answer guided questions to get a quick evaluation.
          </p>
          <button className="take-btn">Take Test</button>
        </div>
      </div>
    </div>
  );
};

export default Test;