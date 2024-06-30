import React, { useState } from 'react';
import './LoginPage.css';

const adminCredentials = {
  username: 'admin',
  password: 'adminpassword',
};

const LoginPage = ({ onLogin, setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setCurrentPage('register')}>Register</button>
    </div>
  );
};

export default LoginPage;