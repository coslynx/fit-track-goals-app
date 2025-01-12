import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Input from './Input';
import Button from './Button';

/**
 * AuthForm Component
 *
 * A reusable component for user login and registration forms. It renders either a login or a registration form
 * based on the `formType` prop, using styled form elements. It utilizes `useAuth` hook for authentication logic,
 * and Input and Button components for input fields and form submission.
 *
 * @param {object} props - The component's props.
 * @param {string} props.formType - The type of form ('login' or 'register'). (Required)
 * @param {object} [props.style] - Optional custom styles for the form container.
 * @param {object} [props.inputStyle] - Optional custom styles for the input fields.
 * @param {object} [props.buttonStyle] - Optional custom styles for the button.
 * @param {string} [props.className] - Optional CSS class name for the form container.
 *
 * @returns {JSX.Element} A form for either login or registration.
 *
 * @example
 * // Usage:
 * <AuthForm formType="login" />
 * <AuthForm formType="register" />
 */
const AuthForm = ({ formType, style, inputStyle, buttonStyle, className }) => {
  // Validate input props
  if (formType !== 'login' && formType !== 'register') {
      console.error('AuthForm component requires a formType prop with value "login" or "register".');
    return null;
  }
    
  const { login, register, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Default styles for the form container
  const defaultFormStyle = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
  };

    // Merge default and custom styles
    let mergedFormStyle = { ...defaultFormStyle };
    if (style && typeof style === 'object') {
        try {
            mergedFormStyle = { ...mergedFormStyle, ...style };
        } catch (error) {
            console.error("Error merging custom styles for form:", error);
        }
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Sanitize email and password before validation (extra precaution)
    let sanitizedEmail = email;
    let sanitizedPassword = password;
    let sanitizedUsername = username;


      try {
          const tempDiv = document.createElement('div');
          tempDiv.textContent = email;
          sanitizedEmail = tempDiv.innerHTML;
      } catch (error) {
        console.error("Error sanitizing email: ", error);
      }

      try {
          const tempDiv = document.createElement('div');
          tempDiv.textContent = password;
          sanitizedPassword = tempDiv.innerHTML;
      } catch (error) {
        console.error("Error sanitizing password: ", error);
      }
    
      try {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = username;
        sanitizedUsername = tempDiv.innerHTML;
      } catch (error) {
        console.error("Error sanitizing username:", error);
      }

    // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Password length validation
    if (sanitizedPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      if (formType === 'login') {
         await login(sanitizedEmail, sanitizedPassword);
      } else {
        await register(sanitizedUsername, sanitizedEmail, sanitizedPassword);
      }
    } catch (err) {
       setError(err.message || 'Authentication failed. Please try again.');
       console.error('Authentication error:', err);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setError('');
  };

    // Form label style
    const labelStyle = {
      marginBottom: '5px',
      fontWeight: 'bold',
    };

  return (
    <form onSubmit={handleSubmit} style={mergedFormStyle} className={className}>
      {formType === 'register' && (
        <>
              <label htmlFor="username" style={labelStyle}>Username</label>
              <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => handleInputChange(e, setUsername)}
                  style={inputStyle}
                  aria-label="Username Input"
              />
        </>
      )}
        <label htmlFor="email" style={labelStyle}>Email</label>
      <Input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => handleInputChange(e, setEmail)}
        style={inputStyle}
        aria-label="Email Input"
      />
      <label htmlFor="password" style={labelStyle}>Password</label>
      <Input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => handleInputChange(e, setPassword)}
        style={inputStyle}
        aria-label="Password Input"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
          type="submit"
          text={formType === 'login' ? 'Login' : 'Register'}
          style={buttonStyle}
          disabled={isLoading}
          aria-label={formType === 'login' ? 'Login Button' : 'Register Button'}
      />
    </form>
  );
};

export default AuthForm;