import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [alert, setAlert] = useState('');

  const handleLogin = () => {
    // Simple email validation (you might want to use a more robust solution)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert('Invalid email format');
      return;
    }

    // Password length validation
    if (password.length <= 5) {
      setAlert('Password should be more than 5 characters');
      return;
    }

    // Simulate login success
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setAlert('Logged in successfully');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    setAlert('');
  };

  return (
    <div id="register" className="container mt-5">
      <h1>Login Page</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {alert && <div className="alert alert-danger">{alert}</div>}
      {loggedIn ? (
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default LoginPage;
