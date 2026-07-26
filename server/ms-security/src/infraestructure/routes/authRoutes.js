import { Router } from 'express';
import { login, register } from '../adapter-input/authController.js';
import { authMiddleware } from '../../../infraestructure/middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', authMiddleware, register);

export default router;
