import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import authService from '../services/authService';

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
    const response = await authService.login({ email, password });
    console.log('Login successful:', response);
    
    // בדיקה אם הטוקן נשמר ב-localStorage
    const storedToken = localStorage.getItem('token');
    console.log('Stored token:', storedToken);
    
    if (!storedToken) {
      console.error('Token was not saved to localStorage');
      setError('אירעה שגיאה בשמירת נתוני ההתחברות. אנא נסה שנית.');
      return;
    }
    
    if (response.role === 'admin') {
      setSuccess('שלום מנהל\nמיד תועבר לעמוד הניהול.');
      setTimeout(() => {
        navigate('/admin');
        window.scrollTo(0, 0);
      }, 2000);
    } else {
      setSuccess('התחברת בהצלחה למערכת!\nמיד תועבר לדף הבית.');
      setTimeout(() => {
        navigate('/');
        window.scrollTo(0, 0);
      }, 2000);
    }

  } catch (error) {
    console.error('Login error:', error);
    setError('שם המשתמש או הסיסמה שגויים. אנא נסה שנית.');
  }
};

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>התחברות ל-Re-Pro</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">כתובת אימייל</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">התחבר</button>
        </form>
        <div className="additional-options">
          <a href="#forgot-password">שכחת סיסמה?</a>
          <span className="separator">|</span>
          <a href="/register">הרשמה לחשבון חדש</a>
        </div>
      </div>
    </div>
  );
}