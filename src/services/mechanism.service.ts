import Book from '../models/book.model';

export const borrowBook = async (id: string) => {
    const book = await Book.findById(id);
    if (!book || book.qty <= 0) {
        throw new Error('Book cannot be borrowed');
    }
    book.qty -= 1;
    return await book.save();
};

export const returnBook = async (id: string) => {
    const book = await Book.findById(id);
    if (!book) {
        throw new Error('Book not found');
    }
    book.qty += 1;
    return await book.save();
};