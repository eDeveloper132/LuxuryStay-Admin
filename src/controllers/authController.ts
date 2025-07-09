import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { generateToken } from '../utils/jwt.js';
import IUser from '../interfaces/IUser.js';
const core = process.env.CORE_API_URL;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const { data: user } = await axios.post<IUser>(
      `${core}/api/usermanagement/`,
      { name, email, password: hashed, role: 'admin' },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.status(201).json({ token: generateToken(user) });
  } catch (err: any) {
    console.error('Register error:', err.response?.data || err.message);
    return res.status(500).json({ message: 'Registration failed' });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data: user } = await axios.get<IUser>(
    `${core}/api/usermanagement/email/${email}`
  );

  if (user && await bcrypt.compare(password, user.password)) {
    return res.json({ token: generateToken(user) });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
