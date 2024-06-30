//UserListPage.js
// UserListPage.js
import React, { useState } from 'react';
import './UserListPage.css';

const UserListPage = ({ isLoggedIn, onLogout, setCurrentPage, onAddUser, onChangePassword }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return <div>You must be logged in to access this page.</div>;
  }

  const validatePassword = (pwd) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasNonalphas = /\W/.test(pwd);
    return (
      pwd.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasNonalphas
    );
  };

  const handleAddUser = () => {
    if (newUsername && newPassword) {
      if (!validatePassword(newPassword)) {
        setError(
          'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
        );
        return;
      }
      const newUser = { username: newUsername, password: newPassword };
      onAddUser(newUser);
      setNewUsername('');
      setNewPassword('');
      setError('');
    }
  };

  const handleChangePassword = () => {
    if (currentUsername && currentPassword && newPassword === newPasswordConfirm) {
      if (!validatePassword(newPassword)) {
        setError(
          'New password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
        );
        return;
      }
      onChangePassword(currentUsername, currentPassword, newPassword);
      setCurrentUsername('');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
      setError('');
    } else {
      setError('Please fill in all fields and make sure new passwords match');
    }
  };

  return (
    <div className="user-list-container">
      <h2>User Management</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div>
        <h3>Change Password</h3>
        <input
          type="text"
          placeholder="Username"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <button onClick={() => setCurrentPage('users-table')}>View Users Table</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserListPage;