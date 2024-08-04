import React, { useState } from 'react';
import '../styles/login.css';
import { Link } from 'react-router-dom';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // כאן להוסיף את הלוגיקה של ההתחברות


    console.log('התחברות עם:', email, password);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>התחברות ל-Re-Pro</h2>
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
          <Link to="/Register">הרשמה לחשבון חדש</Link>
        </div>
      </div>
    </div>
  );
}