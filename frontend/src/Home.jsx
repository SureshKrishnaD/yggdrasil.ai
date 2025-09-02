import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = useNavigate();

  const handleGetStarted = (serviceType) => {
    navigate(`/login?service=${serviceType}`);
  };

  return (
    <div className="home-container">
      {/* Fixed Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="#home" onClick={(e) => {e.preventDefault(); scrollToSection('home');}}>
            Home
          </a>
          <a href="#about" onClick={(e) => {e.preventDefault(); scrollToSection('about');}}>
            About Us
          </a>
          <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}}>
            Contact Us
          </a>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="section">
        <div className="content-container" style={{ textAlign: 'center' }}>
          <h1 className="section-title" style={{ 
            fontSize: '5.5rem',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            EmoAI
          </h1>
          <h2 style={{ 
            fontSize: '3.5rem',
            fontWeight: '400',
            margin: '0',
            lineHeight: '1.4',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.5px'
          }}>
            "Empower
            <br />
            your Mental
            <br />
            Health Journey"
          </h2>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section">
        <div className="content-container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <p>
              EmoAI is a personalized AI companion that supports your daily tasks, 
              provides emotional care, and engages in meaningful conversations. With empathy 
              and intelligence at its core, it adapts to your needs and connects through chat,
               voice so you can interact in the way that feels most natural.
            </p>
            
            {/* Service Cards */}
            <div className="service-cards">
              <div className="service-card">
                <h3>Patient Service</h3>
                <p>Comprehensive AI-driven healthcare support designed to assist patients with personalized care and guidance throughout their medical journey.</p>
                <div className="card-button-container">
                  <button className="card-get-started-btn" onClick={handleGetStarted}>
                    Get Started
                    <span className="arrow-icon">→</span>
                  </button>
                </div>
              </div>
              
              <div className="service-card">
                <h3>Insurer Service</h3>
                <p>Advanced AI solutions for insurance companies to streamline operations, reduce costs, and enhance customer satisfaction with intelligent automation.</p>
                <div className="card-button-container">
                  <button className="card-get-started-btn" onClick={handleGetStarted}>
                    Get Started
                    <span className="arrow-icon">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="section">
        <div className="content-container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h3>Email</h3>
                <p>support@emoai.com</p>
              </div>
              <div className="contact-item">
                <h3>Phone</h3>
                <p>+123 456 7890</p>
              </div>
              <div className="contact-item">
                <h3>Address</h3>
                <p>123 AI Street, Tech City, TC 12345</p>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>EmoAI</h3>
            <p>Your AI companion for a better tomorrow</p>
          </div>
          
          <div className="social-media">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EmoAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;