import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaMapMarkedAlt, 
  FaCity,
  FaUserCheck 
} from 'react-icons/fa';
import './Home.css';

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    city: '',
    state: '',
    country: '',
    patientStatus: ''
  });

  const patientStatusOptions = [
    { value: 'diagnosed', label: 'Diagnosed' },
    { value: 'undiagnosed', label: 'Undiagnosed' }
  ];
  
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
    if (!formData.email || !formData.password || !formData.city || !formData.state || !formData.country || !formData.patientStatus) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Here you would typically make an API call to register the user
      console.log('Patient signup data:', formData);
      
      // Redirect to login or dashboard after successful signup
      navigate('/login');
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
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
    marginBottom: '0.5rem',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: 'none',
    position: 'relative',
    zIndex: 1,
    '&:focus': {
      outline: 'none',
      borderColor: '#1e90ff',
      boxShadow: '0 0 0 3px rgba(30, 144, 255, 0.2)'
    }
  };
  
  const labelStyle = {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    textAlign: 'left',
    width: '100%'
  };

  const iconStyle = {
    position: 'absolute',
    left: '1rem',
    top: 'calc(50% + 0.5rem)', // Adjusted for label
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.6)',
    zIndex: 2,
    pointerEvents: 'none'
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '1.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at top, #2a5a6f, #000000)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      margin: 0
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        padding: '0 1.5rem'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
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
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
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

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #1e90ff, #00bfff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Create Patient Account
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            margin: 0
          }}>
            Fill in your details to create an account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: 'rgba(42, 90, 111, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '2.5rem 2rem',
          borderRadius: '15px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {error && (
            <div style={{
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              padding: '0.8rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

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
            <label htmlFor="city" style={labelStyle}>City</label>
            <FaCity style={iconStyle} />
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              style={inputStyle}
              required
            />
          </div>
          
          <div style={inputContainerStyle}>
            <label htmlFor="patientStatus" style={labelStyle}>Patient Status</label>
            <FaUserCheck style={iconStyle} />
            <select
              id="patientStatus"
              name="patientStatus"
              value={formData.patientStatus}
              onChange={handleChange}
              style={{
                ...inputStyle,
                paddingLeft: '2.5rem',
                color: formData.patientStatus ? 'white' : 'rgba(255, 255, 255, 0.5)',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M1 1L5 5L9 1\' stroke=\'%23FFFFFF\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/></svg>\')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '10px 6px',
                paddingRight: '2.5rem',
                cursor: 'pointer'
              }}
              required
            >
              <option value="">Select Patient Status</option>
              {patientStatusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1e90ff, #0d6efd)',
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
            ) : 'Create Account'}
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

      {/* Background Decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(30, 144, 255, 0.1) 0%, transparent 40%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 80% 70%, rgba(0, 191, 255, 0.1) 0%, transparent 40%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
    </div>
  );
};

export default PatientSignup;
