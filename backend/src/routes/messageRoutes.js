import { Router } from 'express';
import { sendMessage, getConversation } from '../controllers/messageController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, sendMessage);
router.get('/:userId', auth, getConversation);

export default router;
