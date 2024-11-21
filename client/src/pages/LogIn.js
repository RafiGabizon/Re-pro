// React Component: LogIn
// This component allows users to log in to the Re-Pro system, with support for error handling, success messages, and role-based navigation.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import authService from '../services/authService';

export default function LogIn() {
  const navigate = useNavigate(); // React Router hook for navigation
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    try {
      const response = await authService.login({ email, password }); // Call login service
      console.log('Login successful:', response);

      // Verify token is stored in localStorage
      const storedToken = localStorage.getItem('token');
      console.log('Stored token:', storedToken);
      if (!storedToken) {
        console.error('Token was not saved to localStorage');
        setError('אירעה שגיאה בשמירת נתוני ההתחברות. אנא נסה שנית.');
        return;
      }

      // Navigate based on user role
      if (response.role === 'admin') {
        setSuccess('שלום מנהל\nמיד תועבר לעמוד הניהול.');
        setTimeout(() => {
          navigate('/admin');
          window.scrollTo(0, 0); // Scroll to top of the page
        }, 2000);
      } else {
        setSuccess('התחברת בהצלחה למערכת!\nמיד תועבר לדף הבית.');
        setTimeout(() => {
          navigate('/');
          window.scrollTo(0, 0); // Scroll to top of the page
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('שם המשתמש או הסיסמה שגויים. אנא נסה שנית.'); // Show error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>התחברות ל-Re-Pro</h2>

        {/* Display error or success messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="email">כתובת אימייל</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Mark as required
            />
          </div>

          {/* Password input field */}
          <div className="form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Mark as required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button_p">התחבר</button>
        </form>

        {/* Additional options */}
        <div className="additional-options">
          <a href="#forgot-password">שכחת סיסמה?</a>
          <span className="separator">|</span>
          <a href="/register">הרשמה לחשבון חדש</a>
        </div>
      </div>
    </div>
  );
}
