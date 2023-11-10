import React, { useState } from 'react';
import './LoginForm.css';


function LoginForm() {
  // States to store user input, error messages, and API response
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Input validation functions
  const isUsernameValid = (value) => {
    return value.length > 0; 
  };

  const isPasswordValid = (value) => {
    return value.length >= 7; 
  };

  const handleLogin = async () => {
   
    setUsernameError('');
    setPasswordError('');
    setMessage('');

    if (!isUsernameValid(username)) {
      setUsernameError('Please enter a valid username');
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError('Password should be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('API call error:', error);
      setMessage('API call failed');
    }
  };

  return (
    <div className="form-container">
      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      {usernameError && <div className="error">{usernameError}</div>}

      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      {passwordError && <div className="error">{passwordError}</div>}

      <button onClick={handleLogin} className="button">
        Submit
      </button>
      <div className="message">{message}</div>
    </div>
  );
}

export default LoginForm;
