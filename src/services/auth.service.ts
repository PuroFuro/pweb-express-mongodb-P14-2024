import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser  = async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, email, password: hashedPassword });
    return await newUser .save();
};

export const findUserByUsername = async (username: string) => {
    return await User.findOne({ username });
};

export const validatePassword = async (inputPassword: string, storedPassword: string) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

export const generateToken = (userId: string) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1h' }
    );
};