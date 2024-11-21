// Importing necessary dependencies
import React, { useEffect, useState } from 'react'; // Import React and hooks for state and lifecycle management
import axios from 'axios'; // Import Axios for making HTTP requests

// Functional component for the Admin Home page
export default function AdminHome() {
  const [userData, setUserData] = useState(null); // State to store user data fetched from the server

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/userInfo', {
          withCredentials: true // Include credentials such as cookies with the request
        });
        setUserData(response.data); // Update state with the fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error); // Log any errors to the console
      }
    };

    fetchUserData(); // Invoke the data fetching function
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <h1>Admin Home</h1> {/* Main header for the admin home page */}
      {userData && ( // Render user information only if it is available
        <div>
          <p>Welcome, {userData.name}</p> {/* Display the user's name */}
          <p>Role: {userData.role}</p> {/* Display the user's role */}
        </div>
      )}
    </div>
  );
}
