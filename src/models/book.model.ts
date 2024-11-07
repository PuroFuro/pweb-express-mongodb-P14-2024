import mongoose from 'mongoose';

interface Rating {
    average: number;
    count: number;
}

interface Book {
    title: string;
    author: string;
    publishedDate: Date;
    publisher: string;
    description: string;
    coverImage: string;
    rating: Rating;
    tags: string[];
    initialQty: number;
    qty: number;
}

const bookSchema = new mongoose.Schema<Book>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    rating: {
        average: { type: Number, required: true },
        count: { type: Number, required: true },
    },
    tags: { type: [String], required: true },
    initialQty: { type: Number, required: true },
    qty: { type: Number, required: true },
}, { timestamps: true });

const Book = mongoose.model<Book>('Book', bookSchema);
export default Book;