// src/components/Login.tsx
import React, { useState } from 'react';
import './Login.css';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Example fetch call to your backend (adjust URL/logic as needed)
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      // Example token handling
      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Navigate to the Patient Type Selection page
      navigate('/patient-type');
      // Clear form or redirect user, etc.
      setUsername('');
      setPassword('');
      alert('Login successful!');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="tablet-container">
      <div className="tablet-frame">
        <div className="logo-circle">LOGO</div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
<div className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

          <button type="submit">LOGIN</button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
