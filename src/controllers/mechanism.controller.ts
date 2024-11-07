import { Request, Response } from 'express';
import * as mechanismService from '../services/mechanism.service';

export const borrowBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await mechanismService.borrowBook(id);
        res.json({
            status: "success",
            message: "Book borrowed successfully",
            data: {}
        });
    } catch (error: any) {
        res.status(400).json({
            status: "failed",
            message: error.message,
            data: {}
        });
    }
};

export const returnBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await mechanismService.returnBook(id);
        res.json({
            status: "success",
            message: "Book returned successfully",
            data: {}
        });
    } catch (error: any) {
        res.status(404).json({
            status: "failed",
            message: error.message,
            data: {}
        });
    }
};