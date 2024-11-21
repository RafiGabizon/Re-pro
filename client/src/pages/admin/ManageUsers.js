// Importing necessary dependencies
import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management
import axios from 'axios'; // Import axios for HTTP requests
import '../../styles/admin/manageUsers.css'; // Import CSS for styling the component

// Functional component for managing users
export default function ManageUsers() {
  const [users, setUsers] = useState([]); // State to store user data
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch the list of users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/list', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include token for authentication
      });
      setUsers(response.data); // Set fetched users to state
    } catch (error) {
      console.error('Error fetching users:', error); // Log any error that occurs
    }
  };

  // Delete a user by ID
  const handleDeleteUser = async (userId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) { // Confirm deletion
      try {
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include token for authentication
        });
        fetchUsers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting user:', error); // Log any error that occurs
      }
    }
  };

  // Change the role of a user
  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.patch(`/api/users/role/${userId}/${newRole}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include token for authentication
      });
      fetchUsers(); // Refresh the list after role change
    } catch (error) {
      console.error('Error changing user role:', error); // Log any error that occurs
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || // Match username
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || // Match email
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) // Match phone
  );

  return (
    <div className="user-management-container">
      <h2>ניהול משתמשים</h2> {/* Component title */}
      
      {/* Search input */}
      <input
        type="text"
        placeholder="חיפוש משתמשים..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="search-input"
      />

      {/* User table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>תפקיד</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td> {/* Username */}
              <td>{user.email}</td> {/* Email */}
              <td>{user.phone}</td> {/* Phone */}
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleChangeRole(user._id, e.target.value)} // Change role
                >
                  <option value="user">משתמש</option> {/* User role */}
                  <option value="admin">מנהל</option> {/* Admin role */}
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>מחק</button> {/* Delete user */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
