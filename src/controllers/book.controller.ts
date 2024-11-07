import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

// Define response interface for better type safety
interface ApiResponse {
    status: 'success' | 'failed' | 'error';
    message: string;
    data: any;
}

// Helper function to create consistent responses
const createResponse = (status: ApiResponse['status'], message: string, data: any = {}): ApiResponse => ({
    status,
    message,
    data
});

export const getAllBooks = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
        const books = await bookService.getAllBooks();
        res.json(createResponse('success', 'Books retrieved successfully', books));
    } catch (error) {
        console.error('Error in getAllBooks:', error);
        res.status(500).json(
            createResponse('error', 'Failed to retrieve books')
        );
    }
};

export const getBookById = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    const { id } = req.params;
    
    try {
        const book = await bookService.getBookById(id);
        
        if (!book) {
            return res.status(404).json(
                createResponse('failed', 'Book not found')
            );
        }

        res.json(createResponse('success', 'Book retrieved successfully', book));
    } catch (error) {
        console.error(`Error in getBookById for id ${id}:`, error);
        res.status(500).json(
            createResponse('error', 'Failed to retrieve book')
        );
    }
};

export const addNewBook = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
        const newBook = await bookService.addNewBook(req.body);
        res.status(201).json(
            createResponse('success', 'Book added successfully', newBook)
        );
    } catch (error) {
        console.error('Error in addNewBook:', error);
        // Check if error is validation error
        if (error instanceof Error && error.name === 'ValidationError') {
            return res.status(400).json(
                createResponse('failed', 'Invalid book data')
            );
        }
        res.status(500).json(
            createResponse('error', 'Failed to add book')
        );
    }
};

export const modifyBookData = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    const { id } = req.params;
    
    try {
        const updatedBook = await bookService.modifyBookData(id, req.body);
        
        if (!updatedBook) {
            return res.status(404).json(
                createResponse('failed', 'Book not found')
            );
        }

        res.json(createResponse('success', 'Book updated successfully', updatedBook));
    } catch (error) {
        console.error(`Error in modifyBookData for id ${id}:`, error);
        // Check if error is validation error
        if (error instanceof Error && error.name === 'ValidationError') {
            return res.status(400).json(
                createResponse('failed', 'Invalid update data')
            );
        }
        res.status(500).json(
            createResponse('error', 'Failed to update book')
        );
    }
};

export const removeBook = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    const { id } = req.params;
    
    try {
        const deletedBook = await bookService.removeBook(id);
        
        if (!deletedBook) {
            return res.status(404).json(
                createResponse('failed', 'Book not found')
            );
        }

        res.json(createResponse('success', 'Book removed successfully'));
    } catch (error) {
        console.error(`Error in removeBook for id ${id}:`, error);
        res.status(500).json(
            createResponse('error', 'Failed to remove book')
        );
    }
};