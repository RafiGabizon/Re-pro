import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/manageUsers.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/list', {
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
      await axios.patch(`/api/users/role/${userId}/${newRole}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.patch(`/api/users/${editingUser._id}`, editingUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
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
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                  />
                ) : (
                  user.phone
                )}
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
                {editingUser && editingUser._id === user._id ? (
                  <>
                    <button onClick={handleUpdateUser}>שמור</button>
                    <button onClick={handleCancelEdit}>בטל</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditUser(user)}>ערוך</button>
                    <button onClick={() => handleDeleteUser(user._id)}>מחק</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}