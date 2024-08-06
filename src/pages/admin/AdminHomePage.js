import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function AdminHome() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/userInfo', {
          withCredentials: true
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Admin Home</h1>
      {userData && (
        <div>
          <p>Welcome, {userData.name}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
    </div>
  );
}