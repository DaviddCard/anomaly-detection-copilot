import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';

const router = Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
        [email, hashedPassword]
    );
    res.json({ message: 'user created' });
}); 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    const user = result.rows[0];
    if (!user) {
        return res.status(401).json({ message: 'invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        return res.status(401).json({ message: 'invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id },
        process.env.JWT_SECRET!);
        res.json({ token });
    });

export default router;