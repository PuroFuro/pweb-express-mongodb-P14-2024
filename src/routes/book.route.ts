import { Router } from 'express';
import { getAllBooks, getBookById, addNewBook, modifyBookData, removeBook } from '../controllers/book.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAllBooks);
router.get('/:id', authenticateToken, getBookById);
router.post('/', authenticateToken, addNewBook);
router.patch('/:id', authenticateToken, modifyBookData);
router.delete('/:id', authenticateToken, removeBook);

export default router;