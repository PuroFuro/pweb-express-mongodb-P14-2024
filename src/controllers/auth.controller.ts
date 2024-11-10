import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const AuthController = {
    async register(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const { username, email, password } = req.body;

            const existingUser = await authService.findUserByUsernameOrEmail(username, email);
            if (existingUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "Username or email already registered",
                    data: {}
                });
            }
            
            await authService.registerUser (username, email, password);
            res.json({
                status: "success",
                message: "Registration successful",
                data: {}
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Registration failed",
                data: {}
            });
        }
    },

    async login(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const { username, password } = req.body;
            const user = await authService.findUserByUsername(username);
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid username or password",
                    data: {}
                });
            }

            const isMatch = await authService.validatePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid username or password",
                    data: {}
                });
            }

            const token = authService.generateToken(user._id.toString());
            res.json({
                status: "success",
                message: "Login successful Anjay",
                data: {
                    user: {
                        username: user.username,
                        email: user.email
                    },
                    token
                }
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Login failed",
                data: {}
            });
        }
    },
};
