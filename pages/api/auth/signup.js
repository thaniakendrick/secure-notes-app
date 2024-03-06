import bcrypt from 'bcryptjs';
import { insertUser } from '../../../lib/db'; 

export default async function signup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // Input validation for username and password
    if (!username || typeof username !== 'string' || username.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    // Adding a regex pattern, e.g., alphanumeric characters only
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).json({ message: 'Username must be alphanumeric' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Stronger password criteria
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number' });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Insert user into the database
        await insertUser({ username, password: hashedPassword });
        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        if (error.code === '23505') { // Assuming PostgreSQL and a unique violation on username
            return res.status(409).json({ message: 'Username already exists' });
        }
        console.error(error);
        return res.status(500).json({ message: 'Could not create the user' });
    }
}
