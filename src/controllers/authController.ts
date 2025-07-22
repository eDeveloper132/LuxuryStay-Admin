import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { generateToken } from '../utils/jwt.js';
import IUser from '../interfaces/IUser.js';

const core = process.env.CORE_API_URL;
const login_code = process.env.SECURE_CODE;
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log('🔐 Registering user:', { name, email });

    const hashed = await bcrypt.hash(password, 10);
    console.log('🧂 Hashed password:', hashed);

    const { data: user } = await axios.post<IUser>(
      `${core}/usermanagement/`,
      { name, email, password: hashed, role: 'admin' },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('✅ User registered successfully:', user);
    return res.status(201)
    .json({ message: 'Authentication successful' });
  } catch (err: any) {
    console.error('❌ Register error:', err.response?.data || err.message);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, secure } = req.body;
  console.log('🔑 Login attempt for email:', email);
  if (secure !== login_code) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const { data: user } = await axios.get<IUser>(
      `${core}/usermanagement/email/${email}`
    );

    console.log('👤 User fetched from API:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 Password match:', isMatch);

    if (user && isMatch) {
      console.log('✅ Login success for:', email);
    const id = user._id;
    const namee = user.name;
    const emaile = user.email;
    const role = user.role;

    res.cookie(
      'user',
      { id, namee, emaile, role },  // <-- note the _id
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
      }
    )
      const token = generateToken(user);
      console.log('🔑 Generated token:', token);
      return res.status(200).json({ token, user });
    }

    console.warn('⚠️ Invalid credentials for:', email);
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (err: any) {
    console.error('❌ Login error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Login failed' });
  }
};
