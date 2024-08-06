import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile.css';
import userService from '../../services/userService';
import authService from '../../services/authService';

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('לא נמצא טוקן התחברות. אנא התחבר מחדש.');
          setLoading(false);
          return;
        }

        const userData = await userService.getCurrentUser();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('אירעה שגיאה בטעינת פרטי המשתמש');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      // Trigger a custom event to update NavbarTop
      window.dispatchEvent(new Event('storage'));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setError('אירעה שגיאה בעת ההתנתקות. אנא נסה שנית.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>האזור האישי</h2>
        {loading ? (
          <div>טוען...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : user ? (
          <div className="user-details">
            <div className="detail-group">
              <label>שם מלא:</label>
              <p>{user.fullName}</p>
            </div>
            <div className="detail-group">
              <label>כתובת אימייל:</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-group">
              <label>תפקיד:</label>
              <p>{user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</p>
            </div>
            <div className="detail-group">
              <label>תאריך הצטרפות:</label>
              <p>{new Date(user.joinDate).toLocaleDateString('he-IL')}</p>
            </div>
          </div>
        ) : (
          <div>לא נמצאו פרטי משתמש</div>
        )}
        <button className="logout-button" onClick={handleLogout}>התנתקות</button>
      </div>
    </div>
  );
}