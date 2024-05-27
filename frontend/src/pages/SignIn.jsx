import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../api/mutations';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION);
  const [signup, { data: signupData, loading: signupLoading, error: signupError }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const result = await signup({ variables: { username, password } });
        if (result.data.createUser.user) {
          alert('Signup successful! Please log in.');
          setIsSignup(false);
        }
      } else {
        const result = await login({ variables: { username, password } });
        if (result.data.obtainToken.token) {
          localStorage.setItem('token', result.data.obtainToken.token);
          navigate('/movies');
        } else {
          alert('Login failed: Invalid credentials');
        }
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <div>
        <input
          type="checkbox"
          checked={isSignup}
          onChange={() => setIsSignup(!isSignup)}
        />
        <label>{isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}</label>
      </div>
      {(loginLoading || signupLoading) && <p>Loading...</p>}
      {(loginError || signupError) && <p>Error: {loginError?.message || signupError?.message}</p>}
    </div>
  );
};

export default SignIn;
