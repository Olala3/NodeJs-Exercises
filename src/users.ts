import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
    const result = await db.one(query, [username, hashedPassword]);
    const userId = result.id;

    res.status(201).json({ msg: 'Signup successful. Now you can log in.' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET as string);

    res.status(200).json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
