import { Router } from 'express';
import { borrowBook, returnBook } from '../controllers/mechanism.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/borrow/:id', authenticateToken, borrowBook);
router.post('/return/:id', authenticateToken, returnBook);

export default router;