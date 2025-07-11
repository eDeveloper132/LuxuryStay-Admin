import bcrypt from 'bcrypt';
import axios from 'axios';
import { generateToken } from '../utils/jwt.js';
const core = process.env.CORE_API_URL;
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('🔐 Registering user:', { name, email });
        const hashed = await bcrypt.hash(password, 10);
        console.log('🧂 Hashed password:', hashed);
        const { data: user } = await axios.post(`${core}/api/usermanagement/`, { name, email, password: hashed, role: 'admin' }, { headers: { 'Content-Type': 'application/json' } });
        console.log('✅ User registered successfully:', user);
        return res.status(201)
            .json({ message: 'Authentication successful' });
    }
    catch (err) {
        console.error('❌ Register error:', err.response?.data || err.message);
        return res.status(500).json({ message: 'Registration failed' });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('🔑 Login attempt for email:', email);
    try {
        const { data: user } = await axios.get(`${core}/api/usermanagement/email/${email}`);
        console.log('👤 User fetched from API:', user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('🔍 Password match:', isMatch);
        if (user && isMatch) {
            console.log('✅ Login success for:', email);
            const token = generateToken(user);
            console.log('🔑 Generated token:', token);
            return res.status(200).json({ token });
        }
        console.warn('⚠️ Invalid credentials for:', email);
        res.status(401).json({ message: 'Invalid credentials' });
    }
    catch (err) {
        console.error('❌ Login error:', err.response?.data || err.message);
        res.status(500).json({ message: 'Login failed' });
    }
};
