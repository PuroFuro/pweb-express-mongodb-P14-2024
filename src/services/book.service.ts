import Book from '../models/book.model';

export const getAllBooks = async () => {
    return await Book.find();
};

export const getBookById = async (id: string) => {
    return await Book.findById(id);
};

export const addNewBook = async (bookData: any) => {
    const newBook = new Book(bookData);
    return await newBook.save();
};

export const modifyBookData = async (id: string, updateData: any) => {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
};

export const removeBook = async (id: string) => {
    return await Book.findByIdAndDelete(id);
};