// src/components/ForgotPassword.tsx
import React, { useState } from 'react';
import './ForgotPassword.css';

// Use an environment variable, fallback to localhost if not defined
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// At the top of your ForgotPassword.tsx (or in App.tsx)
console.log('API_URL:', API_URL);

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Step 1: Check if username exists and admin code is correct
    try {
      const response = await fetch(`${API_URL}/forgot-password/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, adminCode })
      });
      const data: ForgotPasswordResponse = await response.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setShowNewPasswordField(true);
        setSuccessMsg('Admin code verified! Please set a new password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Step 2: If admin code is correct, allow user to set a new password
    try {
      const response = await fetch(`${API_URL}/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, adminCode, newPassword })
      });
      const data: ForgotPasswordResponse = await response.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setSuccessMsg('Password updated successfully!');
        // Optionally clear fields or redirect to login
        setUsername('');
        setAdminCode('');
        setNewPassword('');
        setShowNewPasswordField(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {!showNewPasswordField && (
        <form onSubmit={handleCheck} className="forgot-password-form">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Admin Code</label>
          <input
            type="text"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            required
          />

          <button type="submit">Check</button>
        </form>
      )}

      {showNewPasswordField && (
        <form onSubmit={handleResetPassword} className="forgot-password-form">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
      {successMsg && <p className="success-message">{successMsg}</p>}
    </div>
  );
};

export default ForgotPassword;
