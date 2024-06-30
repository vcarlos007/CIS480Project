// UsersTablePage.js
import React, { useState } from 'react';
import './UsersTablePage.css';

const UsersTablePage = ({ users, onLogout, setCurrentPage, onDeleteUser, onEditUser }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditUsername(user.username);
    setEditPassword(user.password);
  };

  const handleSaveEdit = () => {
    onEditUser(editingUser.username, editUsername, editPassword);
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="users-table-container">
      <h2>Users Table</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                {editingUser === user ? (
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser === user ? (
                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                {editingUser === user ? (
                  <>
                    <button onClick={handleSaveEdit} className="save-button">Save</button>
                    <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(user)} className="edit-button">Edit</button>
                    <button onClick={() => onDeleteUser(user.username)} className="delete-button">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={() => setCurrentPage('user-list')}>Back to User List</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UsersTablePage;
