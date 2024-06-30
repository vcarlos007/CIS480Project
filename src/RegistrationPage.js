//RegistrationPage.js
// RegistrationPage.js
import React, { useState } from 'react';
import './RegistrationPage.css';

const RegistrationPage = ({ onRegister, setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleRegister = () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
      );
      return;
    }
    onRegister({ username, password });
    setCurrentPage('login');
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => setCurrentPage('login')}>Back to Login</button>
    </div>
  );
};

export default RegistrationPage;