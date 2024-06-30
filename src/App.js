// App.js
import React, { useState } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import UserListPage from './UserListPage';
import UsersTablePage from './UsersTablePage';
import RegistrationPage from './RegistrationPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [users, setUsers] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('user-list');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleRegister = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleChangePassword = (username, currentPassword, newPassword) => {
    const updatedUsers = users.map(user => {
      if (user.username === username && user.password === currentPassword) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (username) => {
    setUsers(users.filter(user => user.username !== username));
  };

  const handleEditUser = (username, newUsername, newPassword) => {
    setUsers(users.map(user => 
      user.username === username ? { ...user, username: newUsername, password: newPassword } : user
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegistrationPage onRegister={handleRegister} setCurrentPage={setCurrentPage} />;
      case 'user-list':
        return (
          <UserListPage
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            setCurrentPage={setCurrentPage}
            onAddUser={handleAddUser}
            onChangePassword={handleChangePassword}
          />
        );
      case 'users-table':
        return (
          <UsersTablePage 
            users={users} 
            onLogout={handleLogout} 
            setCurrentPage={setCurrentPage} 
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
          />
        );
      default:
        return null;
    }
  };

  return <div className="app-container">{renderPage()}</div>;
}

export default App;