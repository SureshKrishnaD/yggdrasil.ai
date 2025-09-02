import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Home.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the service type from URL search params
  const searchParams = new URLSearchParams(location.search);
  const serviceType = searchParams.get('service') || 'patient';

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Here you would typically make an API call to authenticate
    console.log('Login attempt with:', { email, password, serviceType });
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just log and navigate to a dashboard
      // In a real app, you would handle authentication and redirect based on user type
      if (serviceType === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/insurer-dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
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
    }}>
      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')}
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
        ← Back to Home
      </button>

      {/* Main Content */}
      <div style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        padding: '0 1.5rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1rem',
            display: 'inline-block'
          }}>
            EmoAI
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.2rem',
            margin: 0
          }}>
            Welcome back! Please login to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(42, 90, 111, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '2.5rem 2rem',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
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
          
          <div style={{
            textAlign: 'left',
            width: '100%'
          }}>
            <label htmlFor="email" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(0, 0, 0, 0.2)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.outline = 'none';
                e.target.style.borderColor = '#1e90ff';
                e.target.style.boxShadow = '0 0 0 3px rgba(30, 144, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          
          <div style={{ 
            marginTop: '1.3rem',
            textAlign: 'left',
            width: '100%'
          }}>
            <label htmlFor="password" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(0, 0, 0, 0.2)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.outline = 'none';
                e.target.style.borderColor = '#1e90ff';
                e.target.style.boxShadow = '0 0 0 3px rgba(30, 144, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
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
              background: 'linear-gradient(135deg, #1e90ff, #0d6efd)',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              margin: '2rem 0 1.5rem 0',
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
                Logging In...
              </>
            ) : 'Login'}
          </button>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            fontSize: '0.95rem',
            margin: 0
          }}>
            Don't have an account?{' '}
            <Link 
              to="/signup"
              style={{
                color: '#64b5f6',
                fontWeight: '500',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign up
            </Link>
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

export default Login;
