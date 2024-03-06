import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Function to validate username and password before sending to the server
  const validateInputs = () => {
    if (!username || username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError('Username must be alphanumeric.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one number.');
      return false;
    }
    return true; // Inputs are valid
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validate inputs before attempting to sign up
    if (!validateInputs()) {
      return; // Stop the form submission if validation fails
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }), 
      });

      if (!response.ok) throw new Error(await response.text());

      router.push('/login'); // Redirect to login on successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
