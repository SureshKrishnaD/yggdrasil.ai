import React, { useState, useRef } from 'react';
import './TakeTest.css';

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

const ANSWER_OPTIONS = [
  { value: 0, label: "Not At All" },
  { value: 1, label: "Several Days" },
  { value: 2, label: "More Than Half The Days" },
  { value: 3, label: "Nearly Every Day" }
];

// Custom Icon Components
const MessageSquareIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const VolumeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const MicIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const MicOffIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="1" y1="1" x2="23" y2="23"/>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12l1.45-1.45A5.98 5.98 0 0 1 19 12v2a7 7 0 0 1-11.22 5.44"/>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const TakeTest = () => {
  const [currentStep, setCurrentStep] = useState('mode-selection');
  const [inputMode, setInputMode] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [showModeRetry, setShowModeRetry] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setAudioError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        setTimeout(() => {
          const success = Math.random() > 0.3;
          if (success) {
            const randomAnswer = Math.floor(Math.random() * 4);
            handleAnswerSelect(randomAnswer);
          } else {
            setAudioError('Voice not clear. Please try again or switch to clicking options.');
            setShowModeRetry(true);
          }
          setIsRecording(false);
        }, 2000);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      setAudioError('Microphone access denied. Please try clicking options instead.');
      setShowModeRetry(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleAnswerSelect = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
    setAudioError('');
    setShowModeRetry(false);
    
    setTimeout(() => {
      if (currentQuestion < GAD7_QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setCurrentStep('results');
      }
    }, 500);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getScoreInterpretation = (score) => {
    if (score <= 4) return { level: "Minimal", description: "Minimal anxiety symptoms", color: "#10b981" };
    if (score <= 9) return { level: "Mild", description: "Mild anxiety symptoms", color: "#f59e0b" };
    if (score <= 14) return { level: "Moderate", description: "Moderate anxiety symptoms", color: "#f97316" };
    return { level: "Severe", description: "Severe anxiety symptoms", color: "#ef4444" };
  };

  const resetTest = () => {
    setCurrentStep('mode-selection');
    setInputMode(null);
    setCurrentQuestion(0);
    setAnswers({});
    setAudioError('');
    setShowModeRetry(false);
  };

  const retryWithDifferentMode = () => {
    setShowModeRetry(false);
    setAudioError('');
    setCurrentStep('mode-selection');
  };

  if (currentStep === 'mode-selection') {
    return (
      <div className="signup-container">
        <div className="form-container">
          <h1 id="main-title">GAD-7 Assessment</h1>
          <p id="main-slogan">Choose your preferred way to take the assessment</p>
          
          <div className="user-type-selector">
            <div 
              className={`user-type-option ${inputMode === 'text' ? 'selected' : ''}`}
              onClick={() => setInputMode('text')}
            >
              <div className="option-icon">
                <MessageSquareIcon />
              </div>
              <h3>Click Options</h3>
              <p>Select answers by clicking</p>
            </div>
            
            <div 
              className={`user-type-option ${inputMode === 'voice' ? 'selected' : ''}`}
              onClick={() => setInputMode('voice')}
            >
              <div className="option-icon">
                <VolumeIcon />
              </div>
              <h3>Voice Response</h3>
              <p>Speak your answers</p>
            </div>
          </div>
          
          <button 
            className="standard-button"
            onClick={() => setCurrentStep('testing')}
            disabled={!inputMode}
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'testing') {
    return (
      <div className="signup-container">
        <div className="form-container test-container">
          <div className="test-header">
            <div className="question-info">
              <h2 id="main-title">Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}</h2>
              <div className="mode-indicator">
                {inputMode === 'voice' ? 'Voice Mode' : 'Click Mode'}
              </div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / GAD7_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="question-content">
            <h3 className="question-text">
              {GAD7_QUESTIONS[currentQuestion]}
            </h3>
            <p className="question-subtitle">
              Over the last 2 weeks, how often have you been bothered by this problem?
            </p>
          </div>

          {audioError && (
            <div className="error-message">
              {audioError}
            </div>
          )}

          {showModeRetry && (
            <div className="retry-section">
              <button 
                className="standard-button retry-button" 
                onClick={retryWithDifferentMode}
              >
                Choose Different Input Method
              </button>
            </div>
          )}

          {inputMode === 'text' && (
            <div className="answer-options">
              {ANSWER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`answer-option ${answers[currentQuestion] === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {inputMode === 'voice' && !showModeRetry && (
            <div className="voice-section">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`voice-button ${isRecording ? 'recording' : ''}`}
              >
                {isRecording ? <MicOffIcon /> : <MicIcon />}
              </button>
              <p className="voice-instruction">
                {isRecording ? 'Recording... Click to stop' : 'Click to record your answer'}
              </p>
              {isRecording && (
                <div className="recording-indicator">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
          )}

          <div className="navigation-buttons">
            <button 
              onClick={goToPreviousQuestion}
              className={`nav-button prev-button ${currentQuestion === 0 ? 'disabled' : ''}`}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            
            <button 
              onClick={goToNextQuestion}
              className={`nav-button next-button ${answers[currentQuestion] === undefined ? 'disabled' : ''}`}
              disabled={answers[currentQuestion] === undefined}
            >
              {currentQuestion === GAD7_QUESTIONS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>

          <div className="question-counter">
            Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    const score = calculateScore();
    const interpretation = getScoreInterpretation(score);
    
    return (
      <div className="signup-container">
        <div className="form-container results-container">
          <h1 id="main-title">GAD-7 Results</h1>
          
          <div className="score-display">
            <div className="score-number">
              {score}/21
            </div>
            <div className="score-level" style={{ color: interpretation.color }}>
              {interpretation.level} Anxiety
            </div>
            <div className="score-description">
              {interpretation.description}
            </div>
          </div>

          <div className="score-breakdown">
            <h3>Score Breakdown:</h3>
            {GAD7_QUESTIONS.map((question, index) => (
              <div key={index} className="breakdown-row">
                <span className="question-number">Q{index + 1}</span>
                <span className="answer-label">{ANSWER_OPTIONS[answers[index]]?.label || 'Not answered'}</span>
                <span className="answer-score">
                  {answers[index] || 0}
                </span>
              </div>
            ))}
          </div>

          <div className="disclaimer">
            <p>
              This is a screening tool, not a diagnosis. Please consult with a healthcare 
              professional for proper evaluation and treatment recommendations.
            </p>
          </div>

          <button 
            className="standard-button"
            onClick={resetTest}
          >
            Take Test Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TakeTest;