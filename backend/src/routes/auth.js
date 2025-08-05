import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/auth.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/register', registerUser);
router.post('/login',    loginUser);
router.get('/me',        requireAuth, getMe);

export default router;
