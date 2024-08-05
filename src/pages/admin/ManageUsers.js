import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/manageUsers.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      try {
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.patch(`/api/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      await axios.patch(`/api/users/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <h2>ניהול משתמשים</h2>
      
      <input
        type="text"
        placeholder="חיפוש משתמשים..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>שם</th>
            <th>אימייל</th>
            <th>תפקיד</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>
                <input
                  value={`${user.firstName} ${user.lastName}`}
                  onChange={(e) => {
                    const [firstName, lastName] = e.target.value.split(' ');
                    handleUpdateUser(user._id, { firstName, lastName });
                  }}
                />
              </td>
              <td>
                <input
                  value={user.email}
                  onChange={(e) => handleUpdateUser(user._id, { email: e.target.value })}
                />
              </td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleChangeRole(user._id, e.target.value)}
                >
                  <option value="user">משתמש</option>
                  <option value="admin">מנהל</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}