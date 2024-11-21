// Importing necessary dependencies
import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management
import { useNavigate } from 'react-router-dom'; // Import for navigation
import '../../styles/profile.css'; // Import CSS for styling the component
import userService from '../../services/userService'; // Import user service for fetching user data
import authService from '../../services/authService'; // Import auth service for handling logout

// Functional component for user profile
export default function UserProfile() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [user, setUser] = useState(null); // State for storing user data
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [error, setError] = useState(''); // State to store error messages

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          setError('לא נמצא טוקן התחברות. אנא התחבר מחדש.'); // Set error if token is missing
          setLoading(false);
          return;
        }

        const userData = await userService.getCurrentUser(); // Fetch user data using userService
        setUser(userData); // Set the fetched user data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching user data:', error); // Log any error that occurs
        setError('אירעה שגיאה בטעינת פרטי המשתמש'); // Set an error message
        setLoading(false); // Set loading to false
      }
    };

    fetchUserData(); // Call the function
  }, [navigate]); // Dependency array to trigger fetch when navigate changes

  // Handle user logout
  const handleLogout = async () => {
    try {
      await authService.logout(); // Call logout function from authService
      window.dispatchEvent(new Event('storage')); // Trigger custom event to update other components like Navbar
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.error('Logout error:', error); // Log any error that occurs
      setError('אירעה שגיאה בעת ההתנתקות. אנא נסה שנית.'); // Set an error message
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>האזור האישי</h2> {/* Profile section title */}
        {loading ? (
          <div>טוען...</div> // Show loading state
        ) : error ? (
          <div className="error-message">{error}</div> // Show error message if any
        ) : user ? (
          <div className="user-details">
            <div className="detail-group">
              <label>שם מלא:</label>
              <p>{user.fullName}</p> {/* Display user's full name */}
            </div>
            <div className="detail-group">
              <label>כתובת אימייל:</label>
              <p>{user.email}</p> {/* Display user's email */}
            </div>
            <div className="detail-group">
              <label>תפקיד:</label>
              <p>{user.role === 'admin' ? 'מנהל' : 'משתמש רגיל'}</p> {/* Display user's role */}
            </div>
            <div className="detail-group">
              <label>תאריך הצטרפות:</label>
              <p>{new Date(user.joinDate).toLocaleDateString('he-IL')}</p> {/* Format and display join date */}
            </div>
          </div>
        ) : (
          <div>לא נמצאו פרטי משתמש</div> // Show message if no user data found
        )}
        <button className="logout-button" onClick={handleLogout}>התנתקות</button> {/* Logout button */}
      </div>
    </div>
  );
}
