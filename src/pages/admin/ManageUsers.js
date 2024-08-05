
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/manageUsers.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchPendingUsers();
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

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('/api/users/pending', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.post(`/api/users/${userId}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPendingUsers();
      fetchUsers();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await axios.post(`/api/users/${userId}/reject`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPendingUsers();
    } catch (error) {
      console.error('Error rejecting user:', error);
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

  return (
    <div className="user-management-container">
      <h2>ניהול משתמשים</h2>
      
      <h3>משתמשים ממתינים לאישור</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>שם</th>
            <th>אימייל</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map(user => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleApproveUser(user._id)}>אשר</button>
                <button onClick={() => handleRejectUser(user._id)}>דחה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>משתמשים קיימים</h3>
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
          {users.map(user => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
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