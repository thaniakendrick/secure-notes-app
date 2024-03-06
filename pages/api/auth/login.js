import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../../../lib/db';
import cookie from 'cookie';

export default async function login(req, res) {
  const { username, password } = req.body;

  // Input validation for username and password
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' });
  }

  const user = await getUserByUsername(username);

  if (!user) {
    // It's a good practice to use generic error messages to prevent enumeration attacks
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    // Same generic error message for any authentication failure
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60, // 1 hour
    sameSite: 'strict',
    path: '/',
  }));

  // Avoid sending the token in the response body for enhanced security
  res.status(200).json({ message: 'Login successful' });
}
