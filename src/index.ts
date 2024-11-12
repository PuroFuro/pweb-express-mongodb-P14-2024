import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db-connection';
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import mechanismRoutes from './routes/mechanism.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/mechanism', mechanismRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Api is running away",
        data: { date: new Date() }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});