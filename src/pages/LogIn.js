import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import authService from '../services/authService';

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login({ email, password });
      console.log('Login successful:', response);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="unique-login-container">
      <div className="unique-login-content">
        <h2>התחברות ל-Re-Pro</h2>
        <form onSubmit={handleSubmit}>
          <div className="unique-form-group">
            <label htmlFor="email">כתובת אימייל</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="unique-form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="unique-login-button">התחבר</button>
        </form>
        <div className="unique-additional-options">
          <a href="#forgot-password">שכחת סיסמה?</a>
          <span className="unique-separator">|</span>
          <a href="/register">הרשמה לחשבון חדש</a>
        </div>
      </div>
    </div>
  );
}
