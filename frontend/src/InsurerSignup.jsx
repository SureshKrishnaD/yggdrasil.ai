import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaGlobe, FaMapMarkedAlt } from 'react-icons/fa';
import './Home.css';

const InsurerSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    companyName: '',
    companyLocation: '',
    state: '',
    country: ''
  });

  const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];
  const states = {
    'United States': ['California', 'Texas', 'New York', 'Florida', 'Illinois'],
    'India': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Kerala'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia']
  };
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || 
        !formData.companyName || !formData.companyLocation || !formData.state || !formData.country) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Insurer signup data:', formData);
      
      // Redirect to login or dashboard after successful signup
      navigate('/login');
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Common styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at top, #2a5a6f, #000000)',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    margin: 0
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    padding: '0 1.5rem'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2.5rem'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#7dd3fc',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #1e90ff, #00bfff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  const subtitleStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    margin: 0
  };

  const formStyle = {
    background: 'rgba(42, 90, 111, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '2.5rem 2rem',
    borderRadius: '15px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '1.5rem',
    width: '100%'
  };

  const labelStyle = {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: '500'
  };

  const iconStyle = {
    position: 'absolute',
    left: '1rem',
    top: '2.6rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem 0.8rem 2.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none',
      borderColor: '#1e90ff',
      boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)'
    }
  };

  const errorStyle = {
    color: '#ff6b6b',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: '0.8rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    textAlign: 'center'
  };

  const backButtonStyle = {
    position: 'fixed',
    top: '1.5rem',
    left: '1.5rem',
    background: 'rgba(30, 144, 255, 0.2)',
    border: '1px solid rgba(30, 144, 255, 0.3)',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: 'rgba(30, 144, 255, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={() => navigate(-1)}
        style={backButtonStyle}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(30, 144, 255, 0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(30, 144, 255, 0.2)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
      >
        ← Back
      </button>

      <div style={formContainerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Create Insurer Account</h1>
          <p style={subtitleStyle}>Fill in your details to create an account</p>
        </div>

        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <FaUser style={iconStyle} />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              style={inputStyle}
              required
            />
          </div>

          <div style={inputContainerStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <FaEnvelope style={iconStyle} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              style={inputStyle}
              required
            />
          </div>

          <div style={inputContainerStyle}>
            <label htmlFor="companyName" style={labelStyle}>Company Name</label>
            <FaBuilding style={iconStyle} />
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
              style={inputStyle}
              required
            />
          </div>

          <div style={inputContainerStyle}>
            <label htmlFor="companyLocation" style={labelStyle}>Company Location</label>
            <FaMapMarkerAlt style={iconStyle} />
            <input
              type="text"
              id="companyLocation"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleChange}
              placeholder="Enter company address"
              style={inputStyle}
              required
            />
          </div>

          <div style={inputContainerStyle}>
            <label htmlFor="country" style={labelStyle}>Country</label>
            <FaGlobe style={iconStyle} />
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={{
                ...inputStyle,
                paddingLeft: '2.5rem',
                color: formData.country ? 'white' : 'rgba(255, 255, 255, 0.5)'
              }}
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div style={inputContainerStyle}>
            <label htmlFor="state" style={labelStyle}>State/Province</label>
            <FaMapMarkedAlt style={iconStyle} />
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={{
                ...inputStyle,
                paddingLeft: '2.5rem',
                color: formData.state ? 'white' : 'rgba(255, 255, 255, 0.5)'
              }}
              required
              disabled={!formData.country}
            >
              <option value="">Select State/Province</option>
              {formData.country && states[formData.country]?.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div style={inputContainerStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <FaLock style={iconStyle} />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#64b5f6',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              opacity: isLoading ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !isLoading && (e.target.style.transform = 'translateY(0)')}
          >
            {isLoading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    'to': { transform: 'rotate(360deg)' }
                  }
                }}></span>
                Creating Account...
              </>
            ) : 'Sign Up'}
          </button>

          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            fontSize: '0.95rem',
            margin: '1.5rem 0 0 0'
          }}>
            Already have an account?{' '}
            <a 
              href="/login" 
              style={{
                color: '#64b5f6',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default InsurerSignup;
