import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }), 
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login success:', data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '10px' }}>
        Don not have an account? 
        <Link href="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
